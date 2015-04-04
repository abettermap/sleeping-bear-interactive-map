(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$timeout', '$rootScope', '$scope', '$stateParams', 'selFeatData', 'basePath', 'popupFactory', 'layersFactory', '$state', 'mapFactory'];

    function PopupCtrl($timeout, $rootScope, $scope, $stateParams, selFeatData, basePath, popupFactory, layersFactory, $state, mapFactory){

        var vm = this;

        vm.currentSeason = $rootScope.queryStates.season;

        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        vm.closePopup = function(){
            popupFactory.closePopup();
        };

        /* Active popup */
        vm.imgPopupPage = true;

        /********** DATA FOR SELECTED FEATURE **********/

        /* Only need first row */
        vm.selFeatData = selFeatData.rows[0];

        /***** Header *****/

        // Popup pages nav icon
        vm.popupNavIcon = '#icon-info';

        // Tooltip
        vm.popupNavTooltip = 'View feature info';

        vm.showPopupInfo = 'false';

        // Type icon
        vm.typeIcon = '#icon-' + vm.selFeatData.type;

        /***** Active primary *****/

        /*** Create Path ***/
        var layer = 'features';
        var primaryPath = 'img-prod\/' + layer  + '\/mid_size\/' + vm.selFeatData.mile + '\/' + vm.selFeatData.name_id + '\/image00001.jpg';

        vm.activeImages = [primaryPath];

        /* Secondary active */
        $rootScope.$on('rootScope:secondarySet', function (event, data) {
            vm.activeImages = vm.activeImages.concat(data);
        });

        var secondaryParams = {
            layer: $stateParams.layer,
            cartodb_id: vm.selFeatData.cartodb_id,
        }

        vm.midSizeImgSuffix = $stateParams.layer + '\/mid_size\/' + vm.selFeatData.mile + '\/' + vm.selFeatData.name_id + '\/';

        popupFactory.findSecondary(vm.selFeatData, $stateParams.layer)
        .then(function(secondarySearchResult) {
            var response = secondarySearchResult,
                secondaryImages = popupFactory.setSecondary(response.data, vm.midSizeImgSuffix);
            $rootScope.$broadcast('rootScope:secondarySet', secondaryImages);
        });

        /* Thumbnails */
        $rootScope.$on('rootScope:thumbsSet', function (event, response) {

            var arr = [],
                basePath = 'img-prod\/' + response.layer + '\/thumbnail\/';

            for (var n = 0; n < response.length; n++) {

                arr.push({
                    layer: response[n].layer,
                    path: 'img-prod\/' + response[n].layer + '\/thumbnail\/' + response[n].mile + '\/' + response[n].name_id + '\/image00001.jpg',
                    attribs: response[n],
                });

            }

            vm.thumbsData = arr;

        });

        // Thumbs pagination
        $scope.currentPage = 1;

        var thumbsParams = {
            coords: [$stateParams.lat, $stateParams.lon],
            layer: $stateParams.layer,
            cartodb_id: vm.selFeatData.cartodb_id,
        }

        popupFactory.setThumbs(thumbsParams).then(function(dataResponse) {
            var thumbsData = dataResponse.data.rows;
            for (var i in thumbsData){
                thumbsData[i].layer = thumbsParams.layer;
            }

            $rootScope.$broadcast('rootScope:thumbsSet', thumbsData);
        });

        /* Trigger new popup */
        vm.resetPopup = function(layer, attribs){

            // Red pin for selected
            var queryLayer = layersFactory.sublayers[layer];
            layersFactory.setSelFeatColor(queryLayer, layer, attribs.cartodb_id);

            // Pan to selection
            mapFactory.map.panTo([attribs.lat, attribs.lon]);

            // Primary/secondary
            $state.go('popup', {
                cartodb_id: attribs.cartodb_id,
                mile: attribs.mile,
                layer: layer,
                // lat: pos[0],
                // lon: pos[1],
            },{
                reload: true
            });

            popupFactory.findSecondary(vm.selFeatData, $stateParams.layer)
            .then(function(secondarySearchResult) {
                var response = secondarySearchResult,
                    secondaryImages = popupFactory.setSecondary(response.data, vm.midSizeImgSuffix);
                $rootScope.$broadcast('rootScope:secondarySet', secondaryImages);
            });


            // Thumbs
            popupFactory.setThumbs(thumbsParams).then(function(dataResponse) {
                var thumbsData = dataResponse.data.rows;
                for (var i in thumbsData){
                    thumbsData[i].layer = thumbsParams.layer;
                }

                $rootScope.$broadcast('rootScope:thumbsSet', thumbsData);
            });

        };

    }


})();
