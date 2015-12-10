(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$rootScope', 'selFeatData', 'popupFactory', 'layersFactory', '$location'];

    function PopupCtrl($rootScope, selFeatData, popupFactory, layersFactory, $location){

        var vm = this;
        $('#map').click();

        /********** DATA FOR SELECTED FEATURE **********/
        vm.selFeatData = selFeatData.rows[0];

        if (vm.selFeatData.narrative) {
            $rootScope.metaInfo.description = vm.selFeatData.narrative.replace(/<\/?[^>]+(>|$)/g, "");
        } else {
            $rootScope.metaInfo.description = "An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country.";
        }

        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        // Get seasons ready, run if it exists (POI and trail pics only)
        if (vm.selFeatData.available){
            seasonsAvailable(vm.selFeatData.available);
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
                } else {
                    obj[i].open = false;
                    obj[i].classNm = 'available-seasons__icon';
                }
            }

            vm.availableSeasons = obj;

        }

        /***** Trust video URLs *****/
        if (vm.selFeatData.video_link){
            vm.videoUrl = popupFactory.trustMedia(vm.selFeatData.video_link, true);
        }


        /***** Trust audio URLs *****/
        var audio = vm.selFeatData.audio_link;

        // Run if it exists (POI only)
        if (audio){
            audio = "https://w.soundcloud.com/player/?url=" + audio + "&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false";
            vm.audioUrl = popupFactory.trustMedia(audio);
        }

        /***** Header *****/
        // Type icon -- header
        vm.headerTypeIcon = '#icon-' + vm.selFeatData.type;

        // Type icon
        vm.typeIcon = '#icon-' + vm.selFeatData.type;

        // Directions
        vm.directionsUrl = 'https://maps.google.com/maps?daddr=' + vm.selFeatData.lat + ',' + vm.selFeatData.lon;

        // Distances from Dune Climb
        vm.distFromDuneClimb = function(dist){
            return popupFactory.distFromDuneClimb(dist);
        };

        // Description/Narrative - enable HTML
        vm.trustHtml = popupFactory.trustHtml;

        if (vm.selFeatData.layer === 'commercial'){
            popupFactory.getCommTypes(vm.selFeatData.categories).then(function(result){
                vm.commTypesArr = result.data.rows;
                for (var i = 0; i < vm.commTypesArr.length; i++) {
                    vm.commTypesArr[i].type = "#icon-" + vm.commTypesArr[i].type;
                }
            });
        }


        /******************************/
        /******** GRADE/CAUTION *******/
        /******************************/

        // Hide caution when any feature clicked
        $rootScope.$on('featureClicked',function(){
            $rootScope.cautionInfo.text = '';
        });


        // Get non-poi narratives from help table
        if (vm.selFeatData.layer === 'trail_pix' || vm.selFeatData.layer === 'faces'){

            popupFactory.getNonPoiNarrative(vm.selFeatData.layer).then(function(dataResponse) {
                vm.selFeatData.narrative = dataResponse.data.rows[0].narrative;
            });

        }

        /******************************/
        /****** PAN TO SELECTION ******/
        /******************************/

        /***** Clear existing marker, add new, zoom/pan to selection *****/
        layersFactory.addTempMarker([vm.selFeatData.lat, vm.selFeatData.lon], vm.selFeatData.type);


        /******************************/
        /****** SECONDARY IMAGES ******/
        /******************************/

        /* Look for secondary images (even w/pics & faces, to stay consistent) */
        popupFactory.findSecondary(vm.selFeatData)
        .then(function(result) {

            var imgObj = result.data,
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

            // Length will be zero for trail pics and faces
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

            var urlShareParams = {
                caption: 'Sleeping Bear Heritage Trail -- Interactive Map',
                description: $rootScope.metaInfo.description,
                img: encodeURIComponent('http://friendsofsleepingbear.org/sbht-i-map/' + activeImage),
                name: vm.selFeatData.name,
                url: $location.$$absUrl,
            };

            /********** UPDATE META **********/
            $rootScope.metaInfo.image = encodeURIComponent(activeImage);

            // Update page title
            $rootScope.metaInfo.title = vm.selFeatData.name + ' - SBHT Interactive Map';

            /* Upate meta URL */
            $rootScope.metaInfo.url = $location.$$absUrl;

            /* Share buttons */
            vm.socialLinkList = [
                {
                    name: 'email',
                    caption: 'via email',
                    icon: '#icon-email',
                    url: popupFactory.setShareUrl('email', urlShareParams),
                    target: '_blank',
                },
                {
                    name: 'facebook',
                    caption: ' on Facebook',
                    icon: '#icon-facebook',
                    target: '_blank',
                    url: '',
                    click: function(){
                        var left = (screen.width/2)-(300);
                        var top = (screen.height/2)-(300);
                        MyWindow = window.open(popupFactory.setShareUrl('facebook', urlShareParams),
                            'MyWindow',
                            'width=600,height=600,top=' + top + ',left=' + left);
                        return false;
                    }
                },
                {
                    name: 'twitter',
                    caption: ' on Twitter',
                    icon: '#icon-twitter',
                    url: '',
                    click: function(){
                        var left = (screen.width/2)-(300);
                        var top = (screen.height/2)-(150);
                        MyWindow = window.open(popupFactory.setShareUrl('twitter', urlShareParams),
                            'MyWindow',
                            'width=600,height=300,top=' + top + ',left=' + left);
                        return false;
                    },
                    target: '_blank',
                },
                {
                    name: 'google',
                    caption: 'on Google Plus',
                    icon: '#icon-google',
                    url: popupFactory.setShareUrl('google', urlShareParams),
                    target: '_blank',
                },
                {
                    name: 'pinterest',
                    caption: 'on Pinterest',
                    icon: '#icon-pinterest',
                    url: popupFactory.setShareUrl('pinterest', urlShareParams),
                    target: '_blank',
                },
                {
                    name: 'link',
                    caption: 'get link',
                    icon: '#icon-link',
                    url: '',
                    target: '_self',
                    click: function(){vm.showLinkContainer = !vm.showLinkContainer;}
                },
            ];

        });

        vm.getCurrentUrl = popupFactory.getCurrentUrl;


        /******************************/
        /****** SET THUMBNAILS *******/
        /******************************/

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
                    label = Math.floor(Math.abs(difference)) + ' ft';
                } else {
                    label = Math.abs(Math.round(difference / 5280 * 100)/100) + ' mi';
                    label = label.replace(/^[0]+/g,"");
                }

                arr.push({
                    path: path,
                    diff: Math.abs(difference),
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


            function dynamicSort(property) {
                var sortOrder = 1;
                if(property[0] === "-") {
                    sortOrder = -1;
                    property = property.substr(1);
                }
                return function (a,b) {
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            }

            arr.sort(dynamicSort("diff"));
            northArr.sort(dynamicSort("-diff"));
            southArr.sort(dynamicSort("diff"));

            $rootScope.thumbsArrays.north = northArr;
            $rootScope.thumbsArrays.south = southArr;
            $rootScope.thumbsArrays.both = arr;

        }).then(function(){

            if ($rootScope.thumbsArrays.current.length < 1){
                $rootScope.updateThumbs('both');
            } else {
                $rootScope.updateThumbs($rootScope.thumbsDirectionModel);
            }

        });

    }

})();
