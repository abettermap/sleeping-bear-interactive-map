(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'basePath'];

    function popupFactory($rootScope, $http, basePath){

        var defaultImg = basePath.url('src/assets/img/raster/SBHT_6077.jpg');

        var popups = {
            setActiveImg: setActiveImg,
            // activeImg: defaultImg,
            activeImg: '',
            selFeatThumbs: [],
            // getSecondary: getSecondary,
            // getTableInfo: getTableInfo,
            setSeason: setSeason,
            currentSeason: $rootScope.activeSeason
        };

        function setSeason(query){
            console.log("popupFactory.setSeason() called");
            var newSeason = query;
            lsublayers.features.setSQL(newSeason);
        }


        function setActiveImg(data){

            /* Defaults for all hosts */
            var root = '',
                hostName = window.location.hostname,
                origin = window.location.origin,
                wpContent = '/wp-content/sbht-i-map/img-prod/';

            /* Account for fosb folder */
            if (hostName == 'localhost' || hostName == 'wpmulti.dev' || hostName == 'abettermap.com'){
                origin = origin + '\/fosb';
            } else {
                origin = origin;
            }


            /*** Create Path ***/
            var phpPrefix  = '/wp-content/plugins/wp-fosb-map/get-images.php?dir=',
                layer   = 'features',
                midSize = '\/mid_size\/',
                thumb = '\/thumbnail\/',
                mile    = data.mile + '\/',
                id      = data.name_id;
                // type    = 'features\/',

            // var subpath = layer + mile + type + id,
            var imgPath = origin + wpContent + 'features\/thumbnail\/' + mile + id + '\/';
            var thumbrt = origin + wpContent + 'features\/mid_size\/' + mile + id + '\/';
            // console.log(imgPath);
            var phpFilePath = origin + phpPrefix,
            // fullQuery = phpFilePath + subpath;
            activePath = origin + wpContent + layer + midSize + mile + id + '\/img00001.jpg',
            thumbsPath = 'features\/thumbnail\/' + mile + id + '\/',
            thumbsQuery = phpFilePath + thumbsPath;

            setSecondaryThumbs(thumbsQuery, imgPath, data, thumbrt);
        }

        function setSecondaryThumbs(thumbsQuery, imgPath, data, thumbrt){
            // Thumbs
            $http.get(thumbsQuery, {})
            .success(function(data) {
                if (typeof data === "object"){

                    var thumbs = [];
                    for( var i in data ) {
                        // Convert returned object to array & skip first one
                        if (data.hasOwnProperty(i)){
                            if (data[i]!=='img00001.jpg'){
                                console.log('imgPath: ' + imgPath);
                                console.log('data[i]: ' + data[i]);
                                thumbs.push({
                                    thumb: imgPath + data[i],
                                    base: thumbrt + data[i]
                                });
                            }
                        }
                    }
                        console.log(thumbs);
                    popups.secondaryThumbs = thumbs;
                    // debugger;
                    $rootScope.$broadcast('rootScope:secondaryThumbsSet', popups.secondaryThumbs);
                } else {
                    // $rootScope.$broadcast('rootScope:secondaryThumbsSet', []);
                }
            });

        }

    	return popups;
    }

})();
