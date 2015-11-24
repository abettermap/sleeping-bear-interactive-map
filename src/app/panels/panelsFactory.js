(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['$rootScope', '$http', 'layersFactory', 'cdbValues'];

    function panelsFactory($rootScope, $http, layersFactory, cdbValues){

        var selectedTypes = [],
            map = layersFactory.map;

        var factory = {
            getHelpData: getHelpData,
            getPoiPages: getPoiPages,
            getSubGroups: getSubGroups,
            map: map,
            setSeason: setSeason,
            toggleCommercial: toggleCommercial,
            toggleFeatures: toggleFeatures,
        };


        /******************************/
        /****** TOGGLE POI TYPES ******/
        /******************************/

        function toggleFeatures(types){

            var query,
                states = $rootScope.queryStates,
                sublayers = layersFactory.sublayers,
                featQuery = {
                    start: "SELECT 'features' AS layer," +
                        " features.lin_dist," +
                        " features.the_geom_webmercator," +
                        " features.seasons," +
                        " features.cartodb_id," +
                        " features.type," +
                        " features.filepath," +
                        " feature_types.name AS type_name," +
                        " feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE features.type IN(",
                    end: ") AND substring(features.seasons," + states.season + ",1) = 'y' OR features.type = 'mainpoints' ORDER BY priority DESC",
                    all: ""
                };

            /* When not called from setSeason()... */
            if ( types ){
                /* Make sure mainpoints always present */
                if (states.features.indexOf("'mainpoints'") < 0){
                    types.push("'mainpoints'");
                    $rootScope.queryStates.features = types;
                }
                states.features = types;
                featQuery.all = featQuery.start + types + featQuery.end;
            } else {
                featQuery.all = featQuery.start + states.features + featQuery.end;
            }

            sublayers.features.setSQL(featQuery.all);

        }

        /* Set up commercial substring */
        function toggleCommercial(types){

            var query,
                states = $rootScope.queryStates,
                sublayers = layersFactory.sublayers,
                string = '',
                arr = [],
                commQuery = {
                    start: "SELECT 'commercial' AS layer," +
                        " commercial.lin_dist," +
                        " commercial.the_geom_webmercator," +
                        " commercial.seasons," +
                        " commercial.cartodb_id," +
                        " commercial.categories," +
                        " commercial.type," +
                        " commercial.filepath," +
                        " commercial_types.name AS type_name," +
                        " commercial_types.priority," +
                        " commercial_types.category_int FROM commercial INNER JOIN commercial_types ON commercial.type=commercial_types.type",
                    end: " AND substring(seasons," + states.season + ",1) = 'y' ORDER BY priority DESC",
                    all: ""
                };

            if ( types ){

                /* Make sure 50 always present */
                if (states.commercial.indexOf(50) < 0){
                    types.push(50);
                    $rootScope.queryStates.commercial = types;
                }

                for (var i = 0; i < types.length; i++) {
                    if (i === 0) {
                        arr.push(" WHERE (substring(commercial.categories," + types[i] + ",1) = 'y'");
                    } else {
                        arr.push(" OR substring(commercial.categories," + types[i] + ",1) = 'y'");
                    }
                }

                states.commercial = types;

            } else {  /* When not called from setSeason()... */

                for (var n = 0; n < states.commercial.length; n++) {
                    if (n === 0) {
                        arr.push(" WHERE (substring(commercial.categories," + states.commercial[n] + ",1) = 'y'");
                    } else {
                        arr.push(" OR substring(commercial.categories," + states.commercial[n] + ",1) = 'y'");
                    }
                }

            }

            string = arr.join("") + ")";

            commQuery.all = commQuery.start + string + commQuery.end;

            sublayers.commercial.setSQL(commQuery.all);

        }

        /* Will need to be run by router to keep season toggle accurate*/
        function setSeason(season){

            var newSeason = season;
            $rootScope.activeSeason = newSeason;
            toggleFeatures();
            toggleCommercial();

        }

        /* Load help data */
        function getHelpData(){
            var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT subject, narrative, priority FROM help ORDER BY priority';
            return $http({
                method: 'GET',
                url: query
            });
        }

        // Get feature subgroups
        function getSubGroups (table){
            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT DISTINCT ON (sub_group) sub_group FROM ",
                query;

            if (table == 'feat'){
                query = prefix + "feature_types WHERE type != 'mainpoints' ORDER BY sub_group DESC";
            } else {
                query = prefix + "commercial_types";
            }

            return $http({
                method: 'GET',
                url: query,
            });
        }

        // Get POI toggles data
        function getPoiPages (table){

            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT name, sub_group, type, type_desc, priority",
                query;

            if (table === 'feat'){
                query = prefix + " FROM feature_types WHERE type != 'mainpoints'";
            } else {
                query = prefix + ", category_int FROM commercial_types";
            }

            return $http({
                method: 'GET',
                url: query + " ORDER BY priority",
            });

        }

		return factory;

    }


})();