(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'basePath', '$timeout', '$state', '$stateParams', 'cdbValues'];

    function popupFactory($rootScope, $http, basePath, $timeout, $state, $stateParams, cdbValues){

        var defaultImg = 'sbht-i-map/img_prod/features/mid_size/n00/wdune-climb/image00009.jpg';

        var popups = {
            clearTempMarker: clearTempMarker,
            defaultImg: defaultImg,
            findSecondary: findSecondary,
            getNearest: getNearest,
            setSecondary: setSecondary,
            setSeason: setSeason,
            setThumbs: setThumbs,
        };

        function setSeason(query){
            var newSeason = query;
            sublayers.features.setSQL(newSeason);
        }

        /* Look for secondary images */
        function findSecondary(data){

            var suffix = data.layer + '\/mid_size' + data.filepath,
                phpQuery = 'get-images.php?dir=' + suffix,
                query;

                query = phpQuery;
            // if (data.layer === 'features'){
            // } else {
            //     query = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT cartodb_id, the_geom, filepath, 'trail_pix' AS layer FROM trail_pix WHERE cartodb_id = null";
            // }

            return $http({
                method: 'GET',
                url: query,
            });

        }

        /* Set secondary images */
        function setSecondary(secondImgFiles) {

            var activeImages = [];
            var suffix = 'img_prod\/' + $stateParams.layer + '\/mid_size' + $stateParams.filepath;

            for( var i in secondImgFiles ) {

                activeImages.push(suffix + secondImgFiles[i]);

            }

            return activeImages;

        }

        function setThumbs(params){

            var query,
                coords = [params.lat, params.lon],
                states = $rootScope.queryStates,
                shared = cdbValues.sharedQueries,
                sql = shared.sql + " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist,",
                end = " ORDER BY dist LIMIT 50",
                nonPoiStatus = {
                    faces: states.faces,
                    trail_condition: '',
                    trail_pix: '',
                };

            // Features
            var featQuery = sql +
                    " 'features' AS layer" +
                    " FROM features WHERE type IN(" + states.features + ")" +
                    " AND substring(seasons," + states.season + ",1) = 'y'" +
                    " AND cartodb_id != " + params.cartodb_id;


            // Commercial (HOW TO AVOID OMITTING FEATURES WHEN CDBID MATCHES FEAT, & VICE VERSA??)
            // var commQuery = shared +
            //         " 'commercial' AS layer" +
            //         " FROM commercial WHERE type IN(" + states.commercial + ")" +
            //         " AND substring(seasons," + states.season + ",1) = 'y'" +
            //         " AND cartodb_id != " + params.data.cartodb_id +
            //         " UNION ALL ";

            // Trail pics
            var trailPicsQuery = ' UNION ALL ' + sql +
                    " 'trail_pix' AS layer" +
                    " FROM trail_pix" +
                    " WHERE substring(seasons," + states.season + ",1) = 'y'" +
                    " AND cartodb_id != " + params.cartodb_id;

            if (states.trail_pix){
                query = shared.url + featQuery + trailPicsQuery + end;
            } else {
                query = shared.url + featQuery + end;
            }

            return $http({
                method: 'GET',
                url: query,
            });
        }

        /* When trail is clicked on... */
        function getNearest (coords){

            var query,
                states = $rootScope.queryStates,
                shared = cdbValues.sharedQueries,
                sql = shared.sql + " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist,",
                seasonsString = "substring(seasons," + states.season + ",1) = 'y'",
                end = " ORDER BY dist LIMIT 1",
                nonPoiOperators = {
                    faces: '',
                    trail_condition: '',
                    trail_pix: '',
                };

            /* Ghetto, but use > or = when non-POI enabled/disabled to look for CDB = 0 */
            if (states.faces){
                nonPoiOperators.faces = '>';
            } else {
                nonPoiOperators.faces = '=';
            }

            if (states.trail_pix){
                nonPoiOperators.trail_pix = '>';
            } else {
                nonPoiOperators.trail_pix = '=';
            }

            if (states.trail_condition){
                nonPoiOperators.trail_condition = '>';
            } else {
                nonPoiOperators.trail_condition = '=';
            }

            // Features
            var featQuery = "" +
                "SELECT" +
                    " features.cartodb_id," +
                    " features.the_geom," +
                    " features.the_geom_webmercator," +
                    " FLOOR(ST_Distance(features.the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                    " ST_X(features.the_geom) AS lon," +
                    " ST_Y(features.the_geom) AS lat," +
                    " features.filepath, " +
                    " features.seasons," +
                    " features.type," +
                    " features.name," +
                    " feature_types.name AS type_name," +
                    " 'features' AS layer" +
                " FROM" +
                    " features" +
                " INNER JOIN" +
                    " feature_types" +
                " ON" +
                    " features.type=feature_types.type" +
                " WHERE " + seasonsString +
                " AND features.type IN(" + states.features + ")";

            // Trail pics
            var trailPicsQuery = "" +
                " UNION ALL" +
                " SELECT" +
                    " cartodb_id," +
                    " the_geom," +
                    " the_geom_webmercator," +
                    " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                    " ST_X(the_geom) AS lon," +
                    " ST_Y(the_geom) AS lat," +
                    " filepath, " +
                    " seasons," +
                    " 'camera' AS type," +
                    " 'Trail Snapshot' AS name," +
                    " 'Trail Snapshot' AS type_name," +
                    " 'trail_pix' AS layer" +
                " FROM" +
                    " trail_pix" +
                " WHERE " + seasonsString +
                " AND cartodb_id " + nonPoiOperators.trail_pix + "0";

            if (states.trail_pix){
                query = shared.url + featQuery + trailPicsQuery + end;
            } else {
                query = shared.url + featQuery + end;
            }

            return $http({
                method: 'GET',
                url: query,
            });

        }

        /* Clear temp marker */
        function clearTempMarker(map, mapLayers){

            /***** Remove if already present *****/
            for (var i in mapLayers){
                if (mapLayers[i].options.temp){
                    map.removeLayer(mapLayers[i]);
                }
            }

        }

    	return popups;
    }

})();
