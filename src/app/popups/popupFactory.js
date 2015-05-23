(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'cdbValues', '$location', '$sce'];

    function popupFactory($rootScope, $http, cdbValues, $location, $sce){

        var defaultImg = 'sbht-i-map/img_prod/features/mid_size/n00/wdune-climb/image00009.jpg';

        var factory = {
            clearTempMarker: clearTempMarker,
            defaultImg: defaultImg,
            distFromDuneClimb: distFromDuneClimb,
            fbShareDialog: fbShareDialog,
            findSecondary: findSecondary,
            getCurrentUrl: getCurrentUrl,
            getCommTypes: getCommTypes,
            getNearest: getNearest,
            getNonPoiNarrative: getNonPoiNarrative,
            setShareUrl: setShareUrl,
            setThumbs: setThumbs,
            trustHtml: trustHtml,
            trustMedia: trustMedia,
        };

        /* Look for secondary images */
        function findSecondary(data){

            var suffix = data.layer + '\/mid_size' + data.filepath,
                phpQuery = 'get-images.php?dir=' + suffix,
                query = phpQuery;

            return $http({
                method: 'GET',
                url: query,
            });

        }

        function setThumbs(params){

            var query,
                commArr = [],
                commQuery,
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

            // Commercial
            for (var n = 0; n < states.commercial.length; n++) {

                if (n === 0) {
                    commArr.push(" WHERE (substring(commercial.categories," + states.commercial[n] + ",1) = 'y'");
                } else {
                    commArr.push(" OR substring(commercial.categories," + states.commercial[n] + ",1) = 'y'");
                }
            }

            commQuery = commArr.join("") + ")";

            commQuery = ' UNION ALL ' + sql +
                    " 'commercial' AS layer" +
                    " FROM commercial" + commQuery +
                    " AND " + sharedSeasons + skipCurrentCdbId.commercial;


            // Trail pics
            if (states.trail_pix){
                if (params.layer === 'trail_pix'){
                    queries.trail_pix = ' UNION ALL ' + sql +
                    " 'trail_pix' AS layer" +
                    " FROM trail_pix" +
                    " WHERE cartodb_id != " + params.cartodb_id +
                    " AND " + sharedSeasons;
                } else {
                    queries.trail_pix = ' UNION ALL ' + sql +
                    " 'trail_pix' AS layer" +
                    " FROM trail_pix WHERE " + sharedSeasons;
                }
            }

            // Trail condition
            if (states.trail_condition){
                if (params.layer === 'trail_condition'){
                    queries.trail_condition = ' UNION ALL ' + sql +
                    " 'trail_condition' AS layer" +
                    " FROM trail_condition" +
                    " WHERE cartodb_id != " + params.cartodb_id;
                } else {
                    queries.trail_condition = ' UNION ALL ' + sql +
                    " 'trail_condition' AS layer" +
                    " FROM trail_condition";
                }
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

            query = shared.url + featQuery + commQuery + queries.faces + queries.trail_pix + queries.trail_condition + end;

            return $http({
                method: 'GET',
                url: query,
            });

        }

        /* When trail is clicked on... */
        function getNearest (coords){

            var query = ' ',
                states = $rootScope.queryStates,
                shared = cdbValues.sharedQueries,
                sql = shared.sql + " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist,",
                seasonsString = "substring(seasons," + states.season + ",1) = 'y'",
                end = " ORDER BY dist LIMIT 1",
                nonPoiQueries = {
                    faces: "" +
                        " '' AS seasons, 'faces' AS type," +
                        " 'Faces Along the Trail' AS name," +
                        " 'Faces' AS type_name," +
                        " 'faces' AS layer FROM faces",
                    trail_pix: "" +
                        " seasons, 'camera' AS type," +
                        " 'Trail Snapshot' AS name," +
                        " 'Trail Photos' AS type_name," +
                        " 'trail_pix' AS layer" +
                        " FROM trail_pix WHERE " + seasonsString,
                    trail_condition: "" +
                        " '' AS seasons, 'trail-cond' AS type," +
                        " 'Current Ski Conditions' AS name," +
                        " 'Ski Conditions' AS type_name," +
                        " 'trail_condition' AS layer FROM trail_condition"
                },
                nonPoiShared = "" +
                    " UNION ALL" +
                    " SELECT" +
                        " cartodb_id, the_geom, the_geom_webmercator," +
                        " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                        " ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat," +
                        " lin_dist, filepath, ";

            // Loop through non-POI queries, keep query if state is on, otherwise ""
            for (var n in nonPoiQueries){

                if (states[n]){
                    nonPoiQueries[n] = nonPoiShared + nonPoiQueries[n];
                } else {
                    nonPoiQueries[n] = "";
                }

                query = query + nonPoiQueries[n];

            }

            // Features
            var featQuery = "" +
                "SELECT" +
                    " features.cartodb_id, features.the_geom, features.the_geom_webmercator," +
                    " FLOOR(ST_Distance(features.the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                    " ST_X(features.the_geom) AS lon, ST_Y(features.the_geom) AS lat," +
                    " features.lin_dist, features.filepath, features.seasons," +
                    " features.type," +
                    " features.name," +
                    " feature_types.name AS type_name," +
                    " 'features' AS layer" +
                " FROM features INNER JOIN feature_types" +
                " ON features.type=feature_types.type" +
                " WHERE " + seasonsString +
                " AND features.type IN(" + states.features + ")";

            // Commercial
            var commQuery = "" +
                " UNION ALL" +
                " SELECT" +
                    " commercial.cartodb_id, commercial.the_geom, commercial.the_geom_webmercator," +
                    " FLOOR(ST_Distance(commercial.the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                    " ST_X(commercial.the_geom) AS lon, ST_Y(commercial.the_geom) AS lat," +
                    " commercial.lin_dist, commercial.filepath, commercial.seasons," +
                    " commercial.type," +
                    " commercial.name," +
                    " commercial_types.name AS type_name," +
                    " 'commercial' AS layer" +
                " FROM commercial" +
                " INNER JOIN commercial_types ON commercial.type=commercial_types.type" +
                " WHERE " + seasonsString +
                " AND category_int IN (" + states.commercial + ")";

            query = shared.url + featQuery + commQuery + query + end;

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

        /* Trust URLs */
        function trustMedia (html_code, isVideo){
            if (isVideo) {
                html_code = html_code + '?rel=0&modestbranding=1&autohide=1';
            }
            return $sce.trustAsResourceUrl(html_code);
        }

        /* Trust HTMLs */
        function trustHtml (html_code){
            return $sce.trustAsHtml(html_code);
        }

        /* Get Commercial types */
        function getCommTypes(types){

            var commTypesArr = [];

            for (var i = 0; i < types.length; i++) {
                if (types.charAt(i) === 'y'){
                    commTypesArr.push(i + 1);
                }
            }

            var query = "" +
                "https://remcaninch.cartodb.com/api/v2/sql?q=" +
                "SELECT category_int, name, type FROM commercial_types" +
                " WHERE category_int IN (" + commTypesArr + ")";

            return $http({
                method: 'GET',
                url: query
            });

        }

        /* Distance from Dune Climb */
        function distFromDuneClimb(dist){

            var difference = 35460 - dist,
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
                text = Math.abs(Math.round(difference / 5280 * 100)/100) + ' mile(s) ' + text;
            }

            return "Approx. " + text + " of the Dune Climb ";

        }


        /* Encode URLs */
        function encodeUrls(url){
            var test = encodeURIComponent(url);
            return test;
        }

        /* FB Share Prompt */
        function fbShareDialog(params) {

            FB.ui({
                link: params.url,
                picture: decodeURIComponent(params.img),
                caption: params.caption,
                name: params.name,
                description: params.description,
                method: 'feed',
                display: 'popup'
            });

         }

        /* Get correct URL, even if via FB */
        function getCurrentUrl(){
            var test = "http://" + $location.$$host + "/sbht-i-map/#" + $location.$$url;
            return test;
        }

        /* Social links */
        function setShareUrl(medium, shareParams) {

            var shareUrl = {
                    email: "mailto:?subject=" + $rootScope.metaInfo.title +
                    "&body=Check out this location on the Sleeping Bear Heritage Trail Interactive Map: " + getCurrentUrl(),
                    google: 'https://plus.google.com/share?url=' + shareParams.url,
                    link: '#',
                    pinterest: 'http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareParams.url) +
                        '&media=' + shareParams.img +
                        '&description=' + shareParams.description,
                    twitter: "https://twitter.com/intent/tweet?text=" + shareParams.description.substr(0,92) + "..." +
                        "&url=" + encodeURIComponent(shareParams.url) + "&hashtags=SleepingBear,Michigan"
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

    	return factory;
    }

})();
