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
        vm.imgPgVisible = true;

        vm.setPopupPg = function(){

            // Does this always work?
            vm.currentUrl = "mailto:?subject=Check out this SBHT feature!&body=" + window.location.href;

            if (vm.imgPgVisible){       // Info page
                vm.imgPgVisible = false;
                vm.popupNavIcon = '#icon-camera';
                vm.popupHeader = 'Location Info';
                vm.typeIcon = '#icon-info';
            } else {                    // Home/img page
                vm.imgPgVisible = true;
                vm.popupNavIcon = '#icon-info';
                vm.popupHeader = vm.popupImgPgData[vm.selFeatData.layer].header;
                vm.typeIcon = vm.popupImgPgData[vm.selFeatData.layer].icon;
            }

        };

        /********** DATA FOR SELECTED FEATURE **********/

        /* Only need first row */
        vm.selFeatData = selFeatData.rows[0];

        vm.popupImgPgData = {
            features: {
                header: vm.selFeatData.name,
                icon: '#icon-' + vm.selFeatData.type,
            },
            commercial: {
                header: vm.selFeatData.name,
                icon: '#icon-' + vm.selFeatData.type,
            },
            trail_pix: {
                header: 'Trail Snapshot',
                icon: '#icon-camera',
            },
            faces: {
                header: 'Faces on the Trail',
                icon: '#icon-face',
            },
            trail_condition: {
                header: 'Trail Condition',
                icon: '#icon-cond',
            },
        };

        /***** Header *****/
        vm.popupHeader = vm.popupImgPgData[vm.selFeatData.layer].header;

        // Pages nav icon
        vm.popupNavIcon = '#icon-info';

        // Type icon
        vm.typeIcon = vm.popupImgPgData[vm.selFeatData.layer].icon;

        // Tooltip
        vm.popupNavTooltip = 'View feature info';

        // Show image page when true
        vm.showPopupInfo = 'false';

        /******************************/
        /****** TEMP CAMERA ICON ******/
        /******************************/

        var map = mapFactory.map,
            mapLayers = map._layers;

        /***** Have marker ready but don't add to map *****/
        var tempMarker = L.marker([vm.selFeatData.lat, vm.selFeatData.lon],{
            temp: true,
            icon: L.divIcon({
                className: 'temp-div-icon',
                html: "<svg viewBox='0 0 100 100'>" +
                    "<use xlink:href='#icon-camera'></use></svg>"
            }),
            // iconAnchor: [-216, 16]
        });

        /***** Remove if already present *****/
        for (var i in mapLayers){
            if (mapLayers[i].options.temp){
                map.removeLayer(mapLayers[i]);
            }
        }

        /***** Add if trail_pix *****/
        if (vm.selFeatData.layer === 'trail_pix'){
            tempMarker.addTo(map);
        }
        /***** Need similar for faces *****/


        /******************************/
        /****** PAN TO SELECTION ******/
        /******************************/

        map.panTo([vm.selFeatData.lat, vm.selFeatData.lon]);

        var targetPoint, targetLatLng, centerPoint,
            viewportWidth = document.documentElement.clientWidth;

        if (viewportWidth > 740){
            var y = map.getSize().y / 2;
            var xOffset = map.getSize().x / 3 * 2;
            targetLatLng = map.containerPointToLatLng([xOffset, y]);
            map.panTo(targetLatLng);
        }


        /******************************/
        /****** MAKE SELECTED RED *****/
        /******************************/

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

        /******************************/
        /****** SECONDARY IMAGES ******/
        /******************************/

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


        /******************************/
        /****** SET THUMBNAILS *******/
        /******************************/

        popupFactory.setThumbs(vm.selFeatData).then(function(dataResponse) {

            var thumbsData = dataResponse.data.rows,
                arr = [], path, layer;

            for (var n = 0; n < thumbsData.length; n++) {

                path = 'img_prod\/' + thumbsData[n].layer + '\/thumbnail' + thumbsData[n].filepath;
                layer = thumbsData[n].layer;

                if ( layer === 'features' || layer === 'commercial'){
                    path = path + 'image00001.jpg';
                }

                if (thumbsData[n].dist < 528){
                    thumbsData[n].dist = thumbsData[n].dist + ' ft';
                } else {
                    thumbsData[n].dist = Math.round(thumbsData[n].dist / 5280 * 100)/100 + ' mi';
                    thumbsData[n].dist = thumbsData[n].dist.replace(/^[0]+/g,"");
                }

                arr.push({
                    path: path,
                    attribs: thumbsData[n],
                });

            }

            vm.thumbsData = arr;

        });


        /******************************/
        /* RESET POPUP ON THUMB CLICK */
        /******************************/

        vm.resetPopup = function(path, attribs){

            $state.go('popup.poi', {
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
