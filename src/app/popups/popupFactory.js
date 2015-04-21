(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'basePath', '$timeout', '$state', '$stateParams', 'cdbValues', '$location'];

    function popupFactory($rootScope, $http, basePath, $timeout, $state, $stateParams, cdbValues, $location){

        var defaultImg = 'sbht-i-map/img_prod/features/mid_size/n00/wdune-climb/image00009.jpg';

        var popups = {
            clearTempMarker: clearTempMarker,
            defaultImg: defaultImg,
            findSecondary: findSecondary,
            getNearest: getNearest,
            getNonPoiNarrative: getNonPoiNarrative,
            setSecondary: setSecondary,
            setSeason: setSeason,
            setShareUrl: setShareUrl,
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
                sharedSeasons = "substring(seasons," + states.season + ",1) = 'y'",
                sql = shared.sql + " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist,",
                end = " ORDER BY dist LIMIT 50",
                nonPoiStatus = {
                    faces: states.faces,
                    trail_condition: '',
                    trail_pix: '',
                },
                queries = {
                    commercial: "",
                    faces: "",
                    trail_pix: "",
                    trail_condition: "",
                },
                skipCurrentCdbId = {
                    commercial: "",
                    faces: "",
                    features: "",
                    trail_pix: "",
                    trail_condition: "",
                };

            skipCurrentCdbId[params.layer] = " AND cartodb_id != " + params.cartodb_id;

            // Features
            var featQuery = sql +
                    " 'features' AS layer" +
                    " FROM features WHERE type IN(" + states.features + ")" +
                    " AND " + sharedSeasons + skipCurrentCdbId.features;
                    // " AND " + params.layer + ".cartodb_id != " + params.cartodb_id;

            // HOW TO AVOID SKIPPING CDB ID'S THAT MATCH CURRENT ONE?

            // Commercial
            // if (states.commercial.length > 1){
            //     // queries.commercial =
            //     queries.commercial = ' UNION ALL ' + sql +
            //             " 'commercial' AS layer" +
            //             " FROM commercial" +
            //             " WHERE " + sharedSeasons +
            //             " AND cartodb_id != " + params.cartodb_id;
            // }

            // Trail pics
            if (states.trail_pix){
                queries.trail_pix = ' UNION ALL ' + sql +
                    " 'trail_pix' AS layer" +
                    " FROM trail_pix" +
                    " WHERE " + sharedSeasons + skipCurrentCdbId.trail_pix;
            }

            // Faces
            if (states.faces){
                if (params.layer === 'faces'){
                    queries.faces = ' UNION ALL ' + sql +
                    " 'faces' AS layer" +
                    " FROM faces" +
                    " WHERE cartodb_id != " + params.cartodb_id;
                } else {
                    queries.faces = ' UNION ALL ' + sql +
                    " 'faces' AS layer" +
                    " FROM faces";
                }
            }

            query = shared.url + featQuery + queries.commercial + queries.faces + queries.trail_pix + queries.trail_condition + end;
            // console.log(featQuery + queries.commercial + queries.faces + queries.trail_pix + queries.trail_condition + end);

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
                    " features.lin_dist, " +
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
                    " lin_dist, " +
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

            // Faces
            var facesQuery = "" +
                " UNION ALL" +
                " SELECT" +
                    " cartodb_id," +
                    " the_geom," +
                    " the_geom_webmercator," +
                    " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                    " ST_X(the_geom) AS lon," +
                    " ST_Y(the_geom) AS lat," +
                    " lin_dist, " +
                    " filepath, " +
                    " '' AS seasons," +
                    " 'faces' AS type," +
                    " 'Faces Along the Trail' AS name," +
                    " 'Faces' AS type_name," +
                    " 'faces' AS layer" +
                " FROM" +
                    " faces" +
                " WHERE cartodb_id " + nonPoiOperators.faces + "0";

            if (states.trail_pix && !states.faces){
                query = shared.url + featQuery + trailPicsQuery + end;
            } else if (states.trail_pix && states.faces){
                query = shared.url + featQuery + trailPicsQuery + facesQuery + end;
            } else if (!states.trail_pix && states.faces){
                query = shared.url + featQuery + facesQuery + end;
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

        /* Encode URLs */
        function encodeUrls(){

        }


        /* Social links */
        function setShareUrl(medium) {

            var test = $location.$$absUrl;
            var twitterString = 'https://twitter.com/intent/tweet?url=' + test + '&text=' + $rootScope.metaInfo.description,
                metaUri = {
                    description: encodeURIComponent($rootScope.metaInfo.description.substr(0,116)),
                    img: encodeURIComponent($rootScope.metaInfo.image),
                    title: encodeURIComponent($rootScope.metaInfo.title),
                    url: encodeURIComponent($location.$$absUrl),
                }, shareUrl = {
                    email: "mailto:?subject=" + $rootScope.metaInfo.title +
                    "&body=Check out this location on the Sleeping Bear Heritage Trail Interactive Map: " + $location.$$absUrl,
                    facebook: 'http://www.facebook.com/sharer.php?u=' + $location.$$absUrl,
                    google: 'https://plus.google.com/share?url=' + $location.$$absUrl,
                    link: '#',
                    pinterest: 'http://pinterest.com/pin/create/button/?url=' + metaUri.url + '&media=' + metaUri.img + '&description=' + metaUri.url,
                    twitter: "https://twitter.com/share?url=" + metaUri.url + "&text=" + metaUri.description,
                };

            return shareUrl[medium];

        }

        /* Load help data */
        function getNonPoiNarrative(layer){
            var query = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT name_id, narrative FROM help" +
                " WHERE name_id = '" + layer + "'";

            return $http({
                method: 'GET',
                url: query
            });
        }



    	return popups;
    }

})();
