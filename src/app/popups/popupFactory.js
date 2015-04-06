(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'basePath', '$timeout', '$state', '$stateParams'];

    function popupFactory($rootScope, $http, basePath, $timeout, $state, $stateParams){

        var defaultImg = 'sbht-i-map/img_prod/features/mid_size/n00/wdune-climb/image00009.jpg';

        var popups = {
            findSecondary: findSecondary,
            defaultImg: defaultImg,
            setSecondary: setSecondary,
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

        /* Look for secondary images */
        function findSecondary(data){

            var suffix = data.layer + '\/mid_size' + data.imgDir,
                phpQuery = 'get-images.php?dir=' + suffix,
                query;

            if (data.layer === 'features'){
                query = phpQuery;
            } else {
                query = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT cartodb_id, the_geom, filepath, 'trail_pix' AS layer FROM trail_pix WHERE cartodb_id = null";
            }

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
                featQueryState = $rootScope.queryStates.features,
                commQueryState = $rootScope.queryStates.commercial;

            // Features
            var featQuery = "SELECT cartodb_id, the_geom, the_geom_webmercator, filepath,"+
                    " ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat," +
                    " ST_Distance(the_geom::geography," +
                    " CDB_LatLng(" + params.coords + ")::geography) / 1000 " +
                    " AS dist," +
                    " 'features' AS layer" +
                    " FROM features WHERE type IN(" + featQueryState + ")" +
                    " AND substring(seasons," + $rootScope.queryStates.season + ",1) = 'y'" +
                    " AND cartodb_id != " + params.data.cartodb_id +
                    " UNION ALL";

            // Trail pics or faces
            var picsQuery = " SELECT cartodb_id, the_geom, the_geom_webmercator, filepath,"+
                    " ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat," +
                    " ST_Distance(the_geom::geography," +
                    " CDB_LatLng(" + params.coords + ")::geography) / 1000 " +
                    " AS dist," +
                    " 'trail_pix' AS layer" +
                    // " FROM  "+ $rootScope.queryStates.pics +
                    " FROM trail_pix" +
                    " WHERE substring(seasons," + $rootScope.queryStates.season + ",1) = 'y'" +
                    " ORDER BY dist LIMIT 50";
                    // alert(params.data.layer);

                    // alert(picsQuery);
            if (params.data.layer === 'trail_pix'){
            }
            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=";
            query = prefix + featQuery + picsQuery;

            return $http({
                method: 'GET',
                url: query,
            });
        }

    	return popups;
    }

})();
