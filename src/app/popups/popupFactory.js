(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'basePath', '$timeout', '$state', '$stateParams'];

    function popupFactory($rootScope, $http, basePath, $timeout, $state, $stateParams){

        var defaultImg = 'sbht-i-map/img_prod/features/mid_size/n00/wdune-climb/image00009.jpg';

        var popups = {
            closePopup: closePopup,
            defaultImg: defaultImg,
            findSecondary: findSecondary,
            getNearestPic: getNearestPic,
            setSecondary: setSecondary,
            setSeason: setSeason,
            setThumbs: setThumbs,
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

        /* Look for secondary images */
        function findSecondary(data){

            var suffix = data.layer + '\/mid_size' + data.imgDir,
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
            var suffix = 'img_prod\/' + $stateParams.layer + '\/mid_size' + $stateParams.imgDir;

            for( var i in secondImgFiles ) {

                activeImages.push(suffix + secondImgFiles[i]);

            }

            return activeImages;

        }

        function setThumbs(params){
            var query,
                states = $rootScope.queryStates,
                prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=",
                shared = "SELECT cartodb_id, the_geom, the_geom_webmercator, filepath,"+
                    " ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat," +
                    " ST_Distance(the_geom::geography," +
                    " CDB_LatLng(" + params.coords + ")::geography) / 1000 " +
                    " AS dist",
                end = " ORDER BY dist LIMIT 50",
                nonPoiStatus = {
                    faces: states.faces,
                    trail_condition: '',
                    trail_pix: '',
                };

            // Features
            var featQuery = shared +
                    ", 'features' AS layer" +
                    " FROM features WHERE type IN(" + states.features + ")" +
                    " AND substring(seasons," + states.season + ",1) = 'y'" +
                    " AND cartodb_id != " + params.data.cartodb_id;


            // Commercial (HOW TO AVOID OMITTING FEATURES WHEN CDBID MATCHES FEAT, & VICE VERSA??)
            // var commQuery = shared +
            //         " 'commercial' AS layer" +
            //         " FROM commercial WHERE type IN(" + states.commercial + ")" +
            //         " AND substring(seasons," + states.season + ",1) = 'y'" +
            //         " AND cartodb_id != " + params.data.cartodb_id +
            //         " UNION ALL ";

            // Trail pics
            var trailPicsQuery = ' UNION ALL ' + shared +
                    ", 'trail_pix' AS layer" +
                    " FROM trail_pix" +
                    " WHERE substring(seasons," + states.season + ",1) = 'y'";

            if (states.trail_pix){
                query = prefix + featQuery + trailPicsQuery + end;
            } else {
                query = prefix + featQuery + end;
            }

            return $http({
                method: 'GET',
                url: query,
            });
        }

        /* When trail is clicked on... */
        function getNearestPic (coords){

            var states = $rootScope.queryStates,
                prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=",
                midShared = "SELECT cartodb_id, the_geom, the_geom_webmercator, filepath,"+
                        " ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat," +
                        " ST_Distance(the_geom::geography," +
                        " CDB_LatLng(" + coords + ")::geography) / 1000 " +
                        " AS dist, '" +
                        "trail_pix" + "' AS layer" +
                        " FROM " + "trail_pix" +
                        " WHERE substring(seasons," + states.season + ",1) = 'y'" +
                        " ORDER BY dist LIMIT 1";

            var query = prefix + midShared;

            return $http({
                method: 'GET',
                url: query,
            });

        }

        function resetPopup(path, attribs){

        }

    	return popups;
    }

})();
