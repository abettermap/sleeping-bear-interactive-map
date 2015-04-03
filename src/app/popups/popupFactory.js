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
            setThumbs: setThumbs,
            closePopup: closePopup,
        };

        function closePopup(){
            $state.go('home', {
            },{
                reload: true
            });
        }

        function setSeason(query){
            var newSeason = query;
            sublayers.features.setSQL(newSeason);
        }

        function setActiveImages(data, layer, coords){
            // debugger;
            /*** Create Path ***/
            var suffix = layer + '\/mid_size\/' + data.mile + '\/' + data.name_id + '\/',
                phpQuery = 'get-images.php?dir=' + suffix;

            $http.get(phpQuery, {})
            .success(function(secondImgFiles) {
                if (typeof secondImgFiles === "object"){

                    var activeImages = [];

                    for( var i in secondImgFiles ) {

                        // Convert returned object to array
                        if (secondImgFiles.hasOwnProperty(i) && secondImgFiles[i] !== "image00001.jpg"){
                            activeImages.push( 'img-prod\/' + suffix + secondImgFiles[i]);
                        }

                    }
                    $timeout(function() { $rootScope.$broadcast('rootScope:activeImagesSet', activeImages);},1000);
                } else {
                    $rootScope.$broadcast('rootScope:activeImagesSet', [defaultImg]);
                }

            })
            .error(function() {
                console.log("no bueno");
            });;

        }

        function setThumbs(params){
            var typeQuery,
                queryState = $rootScope.queryStates[params.layer];

            typeQuery = " type IN(" + queryState + ")";
            var query = "SELECT " +
                          "cartodb_id, the_geom, the_geom_webmercator, mile, name_id, "+
                          " ST_X(the_geom) AS lon," +
                          " ST_Y(the_geom) AS lat," +
                          " ST_Distance("+
                              "the_geom::geography, "+
                              "CDB_LatLng(" + params.coords +
                              ")::geography) "+
                              "AS dist" +
                        " FROM " + params.layer +
                        // " WHERE type IN(" + $rootScope.queryStates[params.layer] + ")" +
                        " WHERE " + typeQuery +
                        " AND substring(seasons," + $rootScope.queryStates.season + ",1) = 'y'" +
                        " AND cartodb_id != " + params.cartodb_id +
                        " ORDER BY dist " +
                        "LIMIT 50";
                        // alert(query);
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

            return $http({
                method: 'GET',
                url: prefix + query,
            });
        }

    	return popups;
    }

})();
