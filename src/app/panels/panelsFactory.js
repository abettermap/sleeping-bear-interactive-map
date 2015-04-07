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

        function toggleFeatures(types, layer){

            var query,
                states = $rootScope.queryStates,
                featQuery = {
                    start: "SELECT 'features' AS layer, features.the_geom_webmercator, features.seasons, features.cartodb_id, features.type, features.filepath, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE features.type IN(",
                    end: ") AND substring(features.seasons," + states.season + ",1) = 'y' OR features.type = 'mainpoints' ORDER BY priority DESC",
                    all: ""
                };

            /* Make sure mainpoints always present */
            if ( types && states.features.indexOf("'mainpoints'") < 0){
                types.push("'mainpoints'");
            }

            /* When not called from setSeason()... */
            if ( types ){
                if (layer === 'features') {
                    states.features = types;
                    featQuery.all = featQuery.start + types + featQuery.end;
                } else {
                    /* similar for commercial */
                }
            } else {
                featQuery.all = featQuery.start + states.features + featQuery.end;
            }

            sublayers.features.setSQL(featQuery.all);


            // Trail pix even need to be in map?
            // sublayers.trail_pix.setSQL(query);

        }

        /* Will need to be run by router to keep season toggle accurate*/
        function setSeason(season){
            var newSeason = season;
            $rootScope.activeSeason = newSeason;
            toggleFeatures();
        }

        /* Load help data */
        function getHelpData(){
            var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT subject, text, topic_id FROM help';
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


            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT name, sub_group, type, type_desc FROM ",
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


    	var panelsFactory = {
            getHelpData: getHelpData,
            getPoiPages: getPoiPages,
            getSubGroups: getSubGroups,
            setSeason: setSeason,
            hey: hey,
            toggleFeatures: toggleFeatures,
            map: mapFactory.map
    	};

		return panelsFactory;

    }


})();