(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'basePath', '$timeout', '$state'];

    function popupFactory($rootScope, $http, basePath, $timeout, $state){

        // var defaultImg = 'src/assets/img/raster/SBHT_6077.jpg';
        var defaultImg = 'http://friendsofsleepingbear.org/wp-content/sbht-i-map/img-prod/features/mid_size/n00/wdune-climb/img00009.jpg';

        var popups = {
            setActiveImages: setActiveImages,
            setSeason: setSeason,
            closePopup: closePopup,
        };

        function closePopup(){
            $state.go('home', {
            },{
                reload: true
            });
        }

        function setSeason(query){
            console.log("popupFactory.setSeason() called");
            var newSeason = query;
            sublayers.features.setSQL(newSeason);
        }


        function setActiveImages(data, layer, coords){

            /* Defaults for all hosts */
            var hostName = window.location.hostname,
                origin = window.location.origin + '\/sbht-i-map\/',
                commonPath = 'img-prod/';

            /* Account for fosb folder */
            if (hostName == 'localhost' || hostName == 'wpmulti.dev' || hostName == 'abettermap.com'){
                origin = origin;
            } else {
                origin = origin;
            }


            /*** Create Path ***/
            var suffix = layer + '\/mid_size\/' + data.mile + '\/' + data.name_id + '\/',
                phpQuery = origin + 'get-images.php?dir=' + suffix;
                console.log(phpQuery);

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
                    $timeout(function() { $rootScope.$broadcast('rootScope:activeImagesSet', activeImages);},100);
                } else {
                    $rootScope.$broadcast('rootScope:activeImagesSet', [defaultImg]);
                }
                setThumbs(coords).then(function(dataResponse) {
                    $rootScope.$broadcast('rootScope:thumbsSet', dataResponse.data.rows);
                });

            });

        }

        function setThumbs(coords){

            var query = "SELECT "+
                          "cartodb_id, the_geom, the_geom_webmercator, mile, name_id, "+
                          "ST_Distance("+
                              "the_geom::geography, "+
                              "CDB_LatLng(" + coords +
                              ")::geography) "+
                              "AS dist "+
                        "FROM "+
                          "features " +
                        "ORDER BY dist " +
                        "LIMIT 50";
                        // "UNION ALL "+
                        // "SELECT "+
                        //   "cartodb_id, the_geom, the_geom_webmercator, "+
                        //   "ST_Distance( "+
                        //       "the_geom::geography, "+
                        //       "CDB_LatLng(44.8441,-86.0593)::geography "+
                        //       ") AS dist "+
                        // "FROM  "+
                        //   "trail_pix "+
                        // "UNION ALL "+
                        // "SELECT "+
                        //   "cartodb_id, the_geom, the_geom_webmercator, "+
                        //   "ST_Distance( "+
                        //       "the_geom::geography, "+
                        //       "CDB_LatLng(44.8441,-86.0593)::geography "+
                        //       ") AS dist "+
                        // "FROM "+
                        //   "commercial";

            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=";
                // query;

            // if (table == 'feat'){
            //     query = prefix + "feature_types WHERE type != 'mainpoints'";
            // } else {
            //     query = prefix + "commercial_types";
            // }

            return $http({
                method: 'GET',
                url: prefix + query,
            });
        }

    	return popups;
    }

})();
