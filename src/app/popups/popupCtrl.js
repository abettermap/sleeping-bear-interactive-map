(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$sce', '$timeout', '$rootScope', '$scope', '$stateParams', 'selFeatData', 'basePath', 'popupFactory', 'layersFactory', '$state', 'mapFactory'];

    function PopupCtrl($sce, $timeout, $rootScope, $scope, $stateParams, selFeatData, basePath, popupFactory, layersFactory, $state, mapFactory){

        var vm = this,
            sp = $stateParams;

        // Current seasons
        vm.currentSeason = $rootScope.queryStates.season;

        /********** DATA FOR SELECTED FEATURE **********/

        /* Only need first row */
        vm.selFeatData = selFeatData.rows[0];


        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        /* Active popup */
        vm.imgPgVisible = true;

        // Show image page when true
        vm.showPopupInfo = 'false';

        // Does this always work?
        vm.currentUrl = "mailto:?subject=Check out this SBHT feature!&body=" + window.location.href;

        vm.setPopupPg = function(){

            if (vm.imgPgVisible){       // Info page

                vm.imgPgVisible = false;



            } else {                    // Home/img page
                vm.imgPgVisible = true;
            }

        };


        // Get seasons ready
        var seasons = vm.selFeatData.seasons;

        // Run if it exists (POI only)
        if (seasons){
            seasonsAvailable(seasons);
        }

        function seasonsAvailable(seasons){

            var obj = {
                0: {
                    name: 'Winter',
                    open: null,
                    icon: '#icon-winter',
                    classNm: 'winter',
                },
                1: {
                    name: 'Spring',
                    open: null,
                    icon: '#icon-spring',
                    classNm: 'spring',
                },
                2: {
                    name: 'Summer',
                    open: null,
                    icon: '#icon-summer',
                    classNm: 'summer',
                },
                3: {
                    name: 'Fall',
                    open: null,
                    icon: '#icon-fall',
                    classNm: 'fall',
                },
            };

            for (var i = 0; i < 4; i++) {
                if (seasons.substring(i,i+1) === 'y'){
                    obj[i].open = true;
                    // obj[i].classNm = 'available-seasons__icon available';
                    obj[i].classNm = 'available-seasons__icon ' + obj[i].classNm;
                } else {
                    obj[i].open = false;
                    obj[i].classNm = 'available-seasons__icon';
                }
            }

            vm.availableSeasons = obj;

        }

        /***** Trust video URLs *****/
        vm.allowVideo = function (url) {
          vm.videoUrl = $sce.trustAsResourceUrl(url);
        }

        var video = vm.selFeatData.video_link;

        // Run if it exists (POI only)
        if (video){
            vm.allowVideo(video);
        }

        /***** Trust audio URLs *****/
        vm.allowAudio = function (url) {

          vm.audioUrl = $sce.trustAsResourceUrl(url);

        };

        var audio = vm.selFeatData.audio_link;

        // Run if it exists (POI only)
        if (audio){
            audio = "https://w.soundcloud.com/player/?url=" + audio + "&amp;color=4285c2&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_playcount=false&amp;show_artwork=false&amp;show_user=false&amp;show_reposts=false";
            vm.allowAudio(audio);
        }

        /***** Header *****/
        vm.popupHeader = vm.selFeatData.name;

        // Pages nav icon
        vm.popupNavIcon = '#icon-info';

        // Type icon -- header
        vm.headerTypeIcon = '#icon-' + vm.selFeatData.type;

        // Type icon
        vm.typeIcon = '#icon-' + vm.selFeatData.type;



        // Social links
        vm.currentPageUrl = encodeURIComponent(window.location.href);
        vm.currentUrlReally = window.location.href;

        vm.socialLinkList = [
            {
                name: 'email',
                caption: 'Share this exact location via email',
                icon: '#icon-email',
                url: vm.currentUrl,
                click: function(){}
            },
            {
                name: 'facebook',
                caption: 'Share this exact location on Facebook',
                icon: '#icon-facebook',
                url: 'http://www.facebook.com/sharer.php?u=' + vm.currentPageUrl,
                click: function(){}
            },
            {
                name: 'twitter',
                caption: 'Share this exact location on Twitter',
                icon: '#icon-twitter',
                url: '',
                click: function(){alert('Nope, not yet...');}
            },
            {
                name: 'google',
                caption: 'Share this exact location on Google Plus',
                icon: '#icon-google',
                url: '',
                click: function(){alert('Nope, not yet...');}
            },
            {
                name: 'email',
                caption: 'get link',
                icon: '#icon-link',
                url: '',
                click: function(){
                    alert("Will get into popup later, but here is link: " + vm.currentUrlReally);
                }
            },
        ];

        vm.directionsUrl = 'https://maps.google.com/maps?daddr=' + vm.selFeatData.lat + ',' + vm.selFeatData.lon;

        // Tooltip
        vm.popupNavTooltip = 'View feature info';



        /******************************/
        /******** GRADE/CAUTION *******/
        /******************************/

        if (vm.selFeatData.layer === 'sbht_grade') {
            vm.overlayStatus.grade = vm.selFeatData.grade;
        }
        if (vm.selFeatData.layer === 'sbht_caution') {
            alert('caution');
            vm.overlayStatus.grade = vm.selFeatData.type;
        }


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
