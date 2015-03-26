(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'basePath'];

    function popupFactory($rootScope, $http, basePath){

        var popups = {
            getPrimary: getPrimary,
            activeImg: "",
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


        function getPrimary(data){

            /* Defaults for all hosts */
            var root = '',
                hostName = window.location.hostname,
                origin = window.location.origin,
                wpContent = '/wp-content/sbht-i-map/img-src/';

            /* Account for fosb folder */
            if (hostName == 'localhost' || hostName == 'wpmulti.dev'){
                origin = origin + '\/fosb';
            } else {
                origin = origin;
            }


            /*** Create Path ***/
            var prefix  = '/wp-content/plugins/wp-fosb-map/get-images.php?dir=',
                layer   = 'poi\/',
                mile    = data.mile + '\/',
                type    = 'features\/',
                id      = data.name_id + '\/';

            var subpath = layer + mile + type + id,
                imgPath = origin + wpContent + layer + mile + type + id,
                phpFilePath = origin + prefix,
                fullQuery = phpFilePath + subpath;

            var defaultImg = basePath.url('src/assets/img/raster/SBHT_6077.jpg');
            var arr = [];
            $http.get(fullQuery, {})
            .success(function(data) {
                if (typeof data === "object"){
                    for( var i in data ) {
                        if (data.hasOwnProperty(i)){
                           arr.push(imgPath + data[i]);
                        }
                    }
                    popups.activeImg = arr[0];
                } else {
                    popups.activeImg = defaultImg;
                }
            });

        }

    	return popups;
    }

})();
