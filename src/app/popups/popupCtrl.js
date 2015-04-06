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
                secondaryImages,
                arr = [],
                layer = $stateParams.layer,
                suffix = 'img_prod\/' + layer + '\/mid_size' + $stateParams.imgDir;

            /* POI need path + file pushed */
            if (layer === 'features' || layer === 'commercial'){
                for (var i in imgObj){
                    if (imgObj[i].hasOwnProperty(i)){
                       arr.push(imgObj[i]);
                    }
                }
            }

            return arr;
        })
        .then(function(result){

            var activeImages = [],
                secondImgFiles = result,
                suffix = 'img_prod\/' + $stateParams.layer + '\/mid_size' + $stateParams.imgDir;

            // Length will be zero for trail pics, faces, and trail condition (???)
            if (secondImgFiles.length <= 0){
                activeImages =[suffix];
            } else {
                for ( var i in secondImgFiles ) {
                    activeImages.push(suffix + secondImgFiles[i]);
                }
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
                route;

            // Pan to selection
            mapFactory.map.panTo([attribs.lat, attribs.lon]);

            /* Go to correct route */
            if (attribs.layer === 'features' || attribs.layer === 'commercial'){
                route = 'popup.poi';
            } else {
                route = 'popup.pic';
            }

            $state.go(route, {
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
