(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$sce', '$timeout', '$rootScope', '$scope', '$stateParams', 'selFeatData', 'basePath', 'popupFactory', 'layersFactory', '$state', 'mapFactory', '$location', 'paginationService'];

    function PopupCtrl($sce, $timeout, $rootScope, $scope, $stateParams, selFeatData, basePath, popupFactory, layersFactory, $state, mapFactory, $location, paginationService){

        var vm = this,
            sp = $stateParams;


        // Current seasons
        vm.currentSeason = $rootScope.queryStates.season;

        /********** DATA FOR SELECTED FEATURE **********/

        /* Only need first row */
        vm.selFeatData = selFeatData.rows[0];

        if (vm.selFeatData.narrative) {
            $rootScope.metaInfo.description = vm.selFeatData.narrative;
        } else {
            $rootScope.metaInfo.description = "An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country.";
        };

        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        /* Active popup */
        vm.imgPgVisible = true;

        // Show image page when true
        vm.showPopupInfo = 'false';

        // Does this always work?

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
                    obj[i].classNm = 'available-seasons__icon available';
                    // obj[i].classNm = 'available-seasons__icon ' + obj[i].classNm;
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
            audio = "https://w.soundcloud.com/player/?url=" + audio + "&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false";
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

        // Directions
        vm.directionsUrl = 'https://maps.google.com/maps?daddr=' + vm.selFeatData.lat + ',' + vm.selFeatData.lon;

        // Distances from Dune Climb
        vm.distFromDuneClimb = function(dist){

            var difference = 27975 - dist,
                text;

            // North/South
            if (difference >= 0) {
                text = 'south';
            } else {
                text = 'north';
            }

            // Labels
            if (Math.abs(difference) < 528){
                text = Math.abs(difference) + ' feet ' + text;
            } else {
                text = Math.abs(Math.round(difference / 5280 * 100)/100) + ' miles ' + text;
            }

            return "Approximately " + text + " of the Dune Climb";

        }

        // Description/Narrative - enable HTML
        vm.toTrusted = function(html_code) {
            return $sce.trustAsHtml(html_code);
        };


        // Tooltip
        vm.popupNavTooltip = 'View feature info';



        /******************************/
        /******** GRADE/CAUTION *******/
        /******************************/

        if (vm.selFeatData.layer === 'sbht_grade') {
            vm.overlayStatus.grade = vm.selFeatData.grade;
        }
        if (vm.selFeatData.layer === 'sbht_caution') {
            vm.overlayStatus.grade = vm.selFeatData.type;
        }


        /******************************/
        /****** PAN TO SELECTION ******/
        /******************************/

        var map = mapFactory.map,
            mapLayers = map._layers;

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
        /*** TEMP CAMERA/FACE ICON ****/
        /******************************/

        /***** Clear if already present *****/
        popupFactory.clearTempMarker(map, mapLayers);

        /***** Add if trail_pix or faces *****/
        if (vm.selFeatData.layer === 'trail_pix' || vm.selFeatData.layer === 'faces'){

            /***** Have marker ready but don't add to map *****/
            var tempMarker = L.marker([vm.selFeatData.lat, vm.selFeatData.lon],{
                temp: true,
                icon: L.divIcon({
                    className: 'temp-div-icon',
                    html: "<svg viewBox='0 0 100 100'>" +
                        "<use xlink:href='#icon-" + vm.selFeatData.type + "'></use></svg>"
                }),
                // iconAnchor: [-216, 16]
            });

            tempMarker.addTo(map);

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

           return vm.activeImages[0];

        })
        .then(function(activeImage){

            var activeImg = 'http://friendsofsleepingbear.org/sbht-i-map/' + activeImage;

            $rootScope.metaInfo.image = encodeURIComponent(activeImg);

            // Update page title
            $rootScope.metaInfo.title = vm.selFeatData.name + ' - SBHT Interactive Map';

            /********** UPDATE META **********/


            /* Upate meta URL */
            $rootScope.metaInfo.url = $location.$$absUrl;
                // popupFactory.setShareUrl(act)

            vm.socialLinkList = [
                {
                    name: 'email',
                    caption: 'via email',
                    icon: '#icon-email',
                    url: popupFactory.setShareUrl('email'),
                    click: null,
                },
                {
                    name: 'facebook',
                    caption: 'on Facebook',
                    icon: '#icon-facebook',
                    url: popupFactory.setShareUrl('facebook'),
                    click: null,
                },
                {
                    name: 'twitter',
                    caption: 'on Twitter',
                    icon: '#icon-twitter',
                    url: popupFactory.setShareUrl('twitter'),
                    click: null,
                },
                {
                    name: 'google',
                    caption: 'on Google Plus',
                    icon: '#icon-google',
                    url: popupFactory.setShareUrl('google'),
                    click: null,
                },
                {
                    name: 'pinterest',
                    caption: 'on Pinterest',
                    icon: '#icon-pinterest',
                    url: popupFactory.setShareUrl('pinterest'),
                    click: null,
                },
                {
                    name: 'link',
                    caption: 'get link',
                    icon: '#icon-link',
                    url: '',
                    click: function(){
                        vm.showLinkContainer = !vm.showLinkContainer;
                    }
                },
            ];

        });

        vm.getCurrentUrl = function(){
            return $location.$$absUrl;
        };

        /******************************/
        /****** SET THUMBNAILS *******/
        /******************************/

        vm.currentPage = 1; //current page
        vm.pageSize = 5; //pagination max size
        vm.entryLimit = 50; //max rows for data table
        vm.totalThumbs = 0;

        popupFactory.setThumbs(vm.selFeatData).then(function(dataResponse) {

            var thumbsData = dataResponse.data.rows,
                arr = [], path, layer, difference, label,
                southArr = [],
                northArr = [];

            for (var n = 0; n < thumbsData.length; n++) {

                // Thumbs paths
                path = 'img_prod\/' + thumbsData[n].layer + '\/thumbnail' + thumbsData[n].filepath;
                layer = thumbsData[n].layer;

                if ( layer === 'features' || layer === 'commercial'){
                    path = path + 'image00001.jpg';
                }

                // Thumbs distance filter values
                difference = vm.selFeatData.lin_dist - thumbsData[n].lin_dist;

                // Thumbs labels
                if (Math.abs(difference) < 528){
                    label = Math.abs(difference) + ' ft';
                } else {
                    label = Math.abs(Math.round(difference / 5280 * 100)/100) + ' mi';
                    label = label.replace(/^[0]+/g,"");
                }

                arr.push({
                    path: path,
                    diff: difference,
                    label: label,
                    attribs: thumbsData[n],
                });

                if (difference > 0){
                    southArr.push({
                        path: path,
                        diff: difference,
                        label: label,
                        attribs: thumbsData[n],
                    });
                } else {
                    northArr.push({
                        path: path,
                        diff: difference,
                        label: label,
                        attribs: thumbsData[n],
                    });
                }

            }

            vm.thumbsData = arr;

            $rootScope.thumbsArrays.north = northArr;
            $rootScope.thumbsArrays.south = southArr;

            var forPromise = northArr.concat(southArr);
            $rootScope.thumbsArrays.both = northArr.concat(southArr);

            return forPromise;

        }).then(function(result){
            if ($rootScope.thumbsArrays.current.length < 1){
                $rootScope.updateThumbs('both');
            } else {
                $rootScope.updateThumbs($rootScope.thumbsDirectionModel);
            }
        });


        $rootScope.$watch('thumbsDirectionModel', function(direction) {

            paginationService.setCurrentPage('thumbs', 1);

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
