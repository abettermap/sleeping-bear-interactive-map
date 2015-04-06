(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$log', '$timeout', '$rootScope', '$scope', '$stateParams', 'selFeatData', 'basePath', 'popupFactory', 'layersFactory', '$state', 'mapFactory'];

    function PopupCtrl($log, $timeout, $rootScope, $scope, $stateParams, selFeatData, basePath, popupFactory, layersFactory, $state, mapFactory){

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

        popupFactory.findSecondary($stateParams)
        .then(function(result) {

            var imgObj = result.data,
                secondaryImages, path;//, arr;
                var arr = [];
                var layer = $stateParams.layer;

            for (var i in imgObj){
                if (imgObj[i].hasOwnProperty(i)){
                   arr.push(imgObj[i]);

                }

            }

            return arr;
        })
        .then(function(result){
            var activeImages = [],
                secondImgFiles = result,
                suffix = 'img_prod\/' + $stateParams.layer + '\/mid_size' + $stateParams.imgDir;

            for( var i in secondImgFiles ) {
                activeImages.push(suffix + secondImgFiles[i]);
            }
            vm.activeImages = activeImages;

        });

        /* Thumbnails */
        // Thumbs pagination
        $scope.currentPage = 1;

        var thumbsParams = {
            coords: [$stateParams.lat, $stateParams.lon],
            data: vm.selFeatData,
        }

        /* PUT IT BACK */
        popupFactory.setThumbs(thumbsParams).then(function(dataResponse) {

            // debugger;
            var thumbsData = dataResponse.data.rows;
            var arr = [], path, layer;

            for (var n = 0; n < thumbsData.length; n++) {

                path = 'img_prod\/' + thumbsData[n].layer + '\/thumbnail' + thumbsData[n].filepath;
                layer = thumbsData[n].layer;

                if ( layer === 'features' || layer === 'commercial'){
                    path = path + 'image00001.jpg';
                }

                arr.push({
                    path: path,
                    attribs: thumbsData[n],
                });

            }

            vm.thumbsData = arr;

        });

        /* Trigger new popup */
        vm.resetPopup = function(path, attribs){

            // Primary/secondary

            var layer = attribs.layer,
                pointQueryLayer,
                cdbId,
                secondaryImages;

            // Features, commercial, trail condition
            if (layer !== 'trail_pix' && layer !== 'faces') {

                cdbId = attribs.cartodb_id;

                // Red pin for selected
                pointQueryLayer = layersFactory.sublayers[layer];
                layersFactory.setSelFeatColor(pointQueryLayer, layer, cdbId);

            //     // Get primary & secondary
            //     popupFactory.findSecondary(vm.selFeatData, $stateParams.layer)
            //     .then(function(secondarySearchResult) {

            //         var response = secondarySearchResult;
            //         secondaryImages = popupFactory.setSecondary(response.data, vm.midSizePrefix);

            //         // $rootScope.$broadcast('rootScope:secondarySet', secondaryImages);

            //     });

            } // else {

            //     // create temp feature


            //     // secondaryImages = [];
            //     // secondaryImages = 'img_prod\/' + attribs.layer + '\/mid_size\/' + attribs.filepath;
            //     // $rootScope.$broadcast('rootScope:secondarySet', secondaryImages);
            // }

            // Pan to selection
            mapFactory.map.panTo([attribs.lat, attribs.lon]);

            // Thumbs
            // popupFactory.setThumbs(thumbsParams).then(function(dataResponse) {
            //     var thumbsData = dataResponse.data.rows;
            //     // $rootScope.$broadcast('rootScope:thumbsSet', thumbsData);
            // });

            $state.go('popup', {
                cartodb_id: attribs.cartodb_id,
                layer: attribs.layer,
                lat: attribs.lat,
                lon: attribs.lon,
                imgDir: attribs.filepath,
            },{
                reload: true
            });


        };

    }


})();


        // $rootScope.$on('rootScope:thumbsSet', function (event, response) {

        //     var arr = [], layer, path;

        //     for (var n = 0; n < response.length; n++) {

        //         path = 'img_prod\/' + response[n].layer + '\/thumbnail' + response[n].filepath;
        //         layer = response[n].layer;

        //         if ( layer === 'features' || layer === 'commercial'){
        //             path = path + 'image00001.jpg';
        //         }

        //         arr.push({
        //             path: path,
        //             attribs: response[n],
        //         });

        //     }

        //     vm.thumbsData = arr;

        // });

                // $rootScope.$on('rootScope:secondarySet', function (event, data) {

        //     if ($stateParams.layer === 'features'){
        //         vm.activeImages = vm.activeImages.concat(data);
        //     } else {
        //         vm.activeImages = data;
        //     }
        // });

                // if (layer === 'features'|| layer === 'commercial'){

        //     vm.activeImages = [pointPrimaryPath];

        //     popupFactory.findSecondary(vm.selFeatData, layer)
        //     .then(function(secondarySearchResult) {

        //         var response = secondarySearchResult,
        //             secondaryImages = popupFactory.setSecondary(response.data, midSizePrefix);

        //         $rootScope.$broadcast('rootScope:secondarySet', secondaryImages);
        //     });

        // }