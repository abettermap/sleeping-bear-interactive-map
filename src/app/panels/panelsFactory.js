(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['mapFactory', '$rootScope', '$http', 'layersFactory', 'popupFactory'];

    function panelsFactory(mapFactory, $rootScope, $http, layersFactory, popupFactory){

        var hey;

        /******************************/
        /****** TOGGLE POI TYPES ******/
        /******************************/


        var sublayers = layersFactory.sublayers;

        var selectedTypes = [],
            mainPtsOnlyQuery = "SELECT features.the_geom_webmercator, features.cartodb_id, features.type, features.mile, features.name_id, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE features.type = 'mainpoints' ORDER BY priority DESC";

        function toggleFeatures(types){

            var query,
                states = $rootScope.queryStates,
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

            /* Make sure mainpoints always present */
            if ( types && states.features.indexOf("'mainpoints'") < 0){
                types.push("'mainpoints'");
            }

            /* When not called from setSeason()... */
            if ( types ){
                states.features = types;
                featQuery.all = featQuery.start + types + featQuery.end;
            } else {
                featQuery.all = featQuery.start + states.features + featQuery.end;
            }
            sublayers.features.setSQL(featQuery.all);

        }

        /* Set up commercial substring */
        function toggleCommercial(types){

            var selTypes = types,
                string = '';

            var query,
                states = $rootScope.queryStates;


            // generate categories query

            if (states.commercial_types){
                for (var i = 0; i < selTypes.length; i++) {
                    string = string + " substring(commercial.categories," + selTypes[i] + ",1) = 'y' OR";
                    // sg[i].types = [];
                }
            } else {
                string = " substring(commercial.categories,2550,1) = 'y' OR";
            }

                var commQuery = {
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
                        " commercial_types.category_int FROM commercial INNER JOIN commercial_types ON commercial.type=commercial_types.type" +
                        " WHERE" + string + " commercial.cartodb_id = 0",
                    end: " AND substring(seasons," + states.season + ",1) = 'y' ORDER BY priority DESC",
                    all: ""
                };

            /* When not called from setSeason()... */
                commQuery.all = commQuery.start + commQuery.end;
            // if ( types ){
            //     commQuery.all = commQuery.start + commQuery.end;
            // } else {
            // }

            // alert(commQuery.all);
            states.commercial = types;
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
            var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT subject, narrative, priority FROM help ORDER BY priority DESC';
            return $http({
                method: 'GET',
                url: query
            });
        }

        // Get feature subgroups
        function getSubGroups (table){
            // debugger;
            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT DISTINCT ON (sub_group) sub_group FROM ",
                query;

            if (table == 'feat'){
                query = prefix + "feature_types WHERE type != 'mainpoints'";
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


            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT name, sub_group, type, type_desc",
                query;

            if (table == 'feat'){
                query = prefix + " FROM feature_types WHERE type != 'mainpoints'";
            } else {
                query = prefix + ", category_int FROM commercial_types";
            }

            return $http({
                method: 'GET',
                url: query,
            });
        }


    	var panelsFactory = {
            getHelpData: getHelpData,
            getPoiPages: getPoiPages,
            getSubGroups: getSubGroups,
            hey: hey,
            map: mapFactory.map,
            setSeason: setSeason,
            toggleCommercial: toggleCommercial,
            toggleFeatures: toggleFeatures,
    	};

		return panelsFactory;

    }


})();