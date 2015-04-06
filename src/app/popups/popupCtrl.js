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

        /***** Have marker ready but don't add to map *****/
        var tempIcon = L.divIcon({
            className: 'temp-div-icon',
            html: "<svg viewBox='0 0 100 100'>" +
                "<use xlink:href='#icon-camera'></use></svg>"
        });

        var tempMarker = L.marker([sp.lat, sp.lon],{
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

        if (sp.layer === 'trail_pix'){
            tempMarker.addTo(mapFactory.map);
        }

        // Pan to selection
        mapFactory.map.panTo([sp.lat, sp.lon]);

        // If features, set feat red, clear comm
        if (sp.layer === 'features'){
            layersFactory.setSelFeatColor('features', sp.cartodb_id);
            /* PUT BACK WHEN COMM */
            // layersFactory.setSelFeatColor('commercial', null);
        }

        // If comm, set comm red, clear feat
        if (sp.layer === 'commercial'){
            layersFactory.setSelFeatColor('commercial', sp.cartodb_id);
            layersFactory.setSelFeatColor('features', null);
        }

        // If faces, pics, or trail_con, clear comm & feat
        if (sp.layer === 'trail_pix' || sp.layer === 'faces' || sp.layer === 'trail_condition') {
            /* PUT BACK WHEN COMM */
            // layersFactory.setSelFeatColor('commercial', null);
            layersFactory.setSelFeatColor('features', null);
        }

        /* Look for secondary images (even w/pics & faces, to stay consistent) */
        popupFactory.findSecondary(sp)
        .then(function(result) {

            var imgObj = result.data,
                secondaryImages,
                arr = [],
                layer = sp.layer,
                suffix = 'img_prod\/' + layer + '\/mid_size' + sp.imgDir;

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
                suffix = 'img_prod\/' + sp.layer + '\/mid_size' + sp.imgDir;

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
            coords: [sp.lat, sp.lon],
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

            var layer = attribs.layer,
                route;

            /* Go to correct route */
            if (attribs.layer === 'features' || attribs.layer === 'commercial'){
                route = 'popup.poi';
            } else {
                route = 'popup.pic';
            }

            /* Clear selected, if any */
            // layersFactory.setSelFeatColor(attribs.layer, )

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
