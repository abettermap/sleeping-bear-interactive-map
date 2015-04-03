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

            var query;

            var globalSelTypes = $rootScope.queryStates[layer];

            if (types.indexOf("'mainpoints'") < 0){
                // alert("aint in derr! get er in derr!");
                types.push("'mainpoints'");
            }

            // Will always be true for features since array never empy
            if ( types.length > 0) {
                var activeSeason = $rootScope.queryStates.season;

                query = "SELECT features.the_geom_webmercator, features.cartodb_id, features.type, features.mile, features.name_id, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE features.type IN(" + types + ") AND substring(features.seasons," + activeSeason + ",1) = 'y' OR features.type = 'mainpoints' ORDER BY priority DESC";

            }
            // else {
            //     if (layer === 'features'){
            //         selectedTypes = selectedTypes.push("'mainpoints'");
            //         query = mainPtsOnlyQuery;
            //         $rootScope.queryStates[layer] = ["'mainpoints'"];
            //     } else {
            //         $rootScope.queryStates[layer] = ["''"];
            //     }
            // }


            sublayers.features.setSQL(query);

            $rootScope.queryStates[layer] = types;
        }

        /* Will need to be run by router to keep season toggle accurate*/
        function setSeason(season){
            var newSeason = season;
            toggleFeatures(selectedTypes);
        }

        /* Load help data */
        function getHelpData(){
            var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT subject, text, topic_id FROM help';
            return $http.get(query).then(function(response){
                var reply = response.data.rows;
                hey = reply;
                // return response.data;
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
    	};

		return panelsFactory;

    }


})();