(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$log', '$timeout', '$rootScope', '$scope', '$stateParams', 'selFeatData', 'basePath', 'popupFactory', 'layersFactory', '$state', 'mapFactory'];

    function PopupCtrl($log, $timeout, $rootScope, $scope, $stateParams, selFeatData, basePath, popupFactory, layersFactory, $state, mapFactory){

        var vm = this,
            sp = $stateParams; // too much to type

        vm.currentSeason = $rootScope.queryStates.season;

        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        /* Active popup */
        vm.imgPopupPage = true;

        vm.setPopupPg = function(){
            vm.currentUrl = "mailto:?subject=Check out this SBHT feature!&body=" + window.location.href;
            if (vm.imgPopupPage){
                vm.imgPopupPage = false;
                vm.popupNavIcon = '#icon-camera';
                vm.popupHeader = 'Point Info';
            } else {
                vm.imgPopupPage = true;
                vm.popupNavIcon = '#icon-info';
                if (vm.selFeatData.layer === 'trail_pix'){
                    vm.popupHeader = "Trail Snapshot";
                } else {
                    vm.popupHeader = vm.selFeatData.name;

                }
            }
        };

        // vm.popupTypes = {
        //     poi: {
        //         header: vm.selFeatData.name,
        //         icon: '#icon-' + vm.selFeatData.type,
        //     },
        //     trailPic: {
        //         header: 'Trail Snapshot',
        //         icon: '#icon-camera',
        //     }
        // };

        /********** DATA FOR SELECTED FEATURE **********/

        /* Only need first row */
        vm.selFeatData = selFeatData.rows[0];

        /***** Header *****/

        if (!vm.selFeatData.name){
            vm.popupHeader = 'Trail Snapshot';
            vm.typeIcon = '#icon-camera';
        } else {
            vm.popupHeader = vm.selFeatData.name;
            vm.typeIcon = '#icon-' + vm.selFeatData.type;
        }

        // Popup pages nav icon
        vm.popupNavIcon = '#icon-info';

        // Tooltip
        vm.popupNavTooltip = 'View feature info';

        vm.showPopupInfo = 'false';

        /***** Have marker ready but don't add to map *****/
        var tempIcon = L.divIcon({
            className: 'temp-div-icon',
            html: "<svg viewBox='0 0 100 100'>" +
                "<use xlink:href='#icon-camera'></use></svg>"
        });

        var tempMarker = L.marker([vm.selFeatData.lat, vm.selFeatData.lon],{
            temp: true,
            icon: tempIcon,
            // iconAnchor: [-216, 16]
        });
        var mapLayers = mapFactory.map._layers;

        for (var i in mapLayers){
            if (mapLayers[i].options.temp){
                mapFactory.map.removeLayer(mapLayers[i]);
            }
        }

        if (vm.selFeatData.layer === 'trail_pix'){
            tempMarker.addTo(mapFactory.map);
        }


        // Pan to selection
        var map = mapFactory.map;

        map.panTo([vm.selFeatData.lat, vm.selFeatData.lon]);

        var targetPoint, targetLatLng, centerPoint,
            viewportWidth = document.documentElement.clientWidth;

        if (viewportWidth > 740){
            var y = map.getSize().y / 2;
            var xOffset = map.getSize().x / 3 * 2;
            targetLatLng = map.containerPointToLatLng([xOffset, y]);
            map.panTo(targetLatLng);
        }


        // If features, set feat red, clear comm
        if (vm.selFeatData.layer === 'features'){
            layersFactory.setSelFeatColor('features', vm.selFeatData.cartodb_id);
            /* PUT BACK WHEN COMM */
            // layersFactory.setSelFeatColor('commercial', null);
        }

        // If comm, set comm red, clear feat
        if (vm.selFeatData.layer === 'commercial'){
            layersFactory.setSelFeatColor('commercial', vm.selFeatData.cartodb_id);
            layersFactory.setSelFeatColor('features', null);
        }

        // If faces, pics, or trail_con, clear comm & feat
        // if (vm.selFeatData === 'trail_pix' || vm.selFeatData === 'faces' || vm.selFeatData === 'trail_condition') {
        if (vm.selFeatData.layer === 'trail_pix' || vm.selFeatData.layer === 'faces' || vm.selFeatData.layer === 'trail_condition') {
            /* PUT BACK WHEN COMM */
            // layersFactory.setSelFeatColor('commercial', null);
            layersFactory.setSelFeatColor('features', null);
        }

        /* Look for secondary images (even w/pics & faces, to stay consistent) */
        popupFactory.findSecondary(vm.selFeatData)
        .then(function(result) {

            var imgObj = result.data,
                secondaryImages,
                arr = [],
                layer = vm.selFeatData.layer,
                suffix = 'img_prod\/' + layer + '\/mid_size' + vm.selFeatData.filepath;

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
                suffix = 'img_prod\/' + vm.selFeatData.layer + '\/mid_size' + vm.selFeatData.filepath;

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

        /* PUT IT BACK */
        popupFactory.setThumbs(vm.selFeatData).then(function(dataResponse) {


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

            var layer = attribs.layer,
                route;
                route = 'popup.poi';

            /* Go to correct route */
            // if (attribs.layer === 'features' || attribs.layer === 'commercial'){
            //     route = 'popup.poi';
            // } else {
            //     route = 'popup.pic';
            // }

            /* Clear selected, if any */
            // layersFactory.setSelFeatColor(attribs.layer, )

            $state.go(route, {
                cartodb_id: attribs.cartodb_id,
                layer: attribs.layer,
                lat: attribs.lat,
                lon: attribs.lon,
                filepath: attribs.filepath,
            },{
                reload: true
            });


        };

    }


})();
