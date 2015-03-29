(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'basePath', '$timeout'];

    function popupFactory($rootScope, $http, basePath, $timeout){

        // var defaultImg = 'src/assets/img/raster/SBHT_6077.jpg';
        var defaultImg = 'http://friendsofsleepingbear.org/wp-content/sbht-i-map/img-prod/features/mid_size/n00/wdune-climb/img00009.jpg';

        var popups = {
            setActiveImages: setActiveImages,
            activeImg: '',
            setSeason: setSeason,
            currentSeason: $rootScope.activeSeason
        };

        function setSeason(query){
            console.log("popupFactory.setSeason() called");
            var newSeason = query;
            lsublayers.features.setSQL(newSeason);
        }


        function setActiveImages(data, layer){

            /* Defaults for all hosts */
            var hostName = window.location.hostname,
                origin = window.location.origin,
                commonPath = '/wp-content/sbht-i-map/img-prod/';

            /* Account for fosb folder */
            if (hostName == 'localhost' || hostName == 'wpmulti.dev' || hostName == 'abettermap.com'){
                origin = origin + '\/fosb';
            } else {
                origin = origin;
            }


            /*** Create Path ***/
            var suffix = layer + '\/mid_size\/' + data.mile + '\/' + data.name_id + '\/',
                phpQuery = 'get-images.php?dir=' + suffix;

            // Thumbs
            $http.get(phpQuery, {})
            .success(function(data) {

                if (typeof data === "object"){

                    var activeImages = [];

                    for( var i in data ) {
                        // Convert returned object to array
                        if (data.hasOwnProperty(i)){
                            activeImages.push(origin + commonPath + suffix + data[i]);
                        }
                    }
                    console.log(activeImages);
                    $timeout(function() { $rootScope.$broadcast('rootScope:activeImagesSet', activeImages);},100);
                } else {
                    $rootScope.$broadcast('rootScope:activeImagesSet', [defaultImg]);
                }
            });

        }

    	return popups;
    }

})();
