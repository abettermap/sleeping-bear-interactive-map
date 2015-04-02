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

        var seasonsQueries = {
            winter: 1,
            spring: 2,
            summer: 3,
            fall: 4,
        };
        var selectedTypes = [],
            mainPtsOnlyQuery = "SELECT features.the_geom_webmercator, features.cartodb_id, features.type, features.mile, features.name_id, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE features.type = 'mainpoints' ORDER BY priority DESC";

        function toggleFeatures(types){

            var query;

            if ( types.length > 0) {
                var activeSeason = seasonsQueries[$rootScope.activeSeason];

                query = "SELECT features.the_geom_webmercator, features.cartodb_id, features.type, features.mile, features.name_id, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE features.type IN(" + types + ") AND substring(features.seasons," + activeSeason + ",1) = 'y' OR features.type = 'mainpoints' ORDER BY priority DESC";
            } else {
                query = mainPtsOnlyQuery;
            }
            sublayers.features.setSQL(query);

            selectedTypes = types;

        }

        var featToggles = [
            {checked: false, value: 'beach', id: 'beach', icon: '#icon-beach', text: 'Beaches'},
            {checked: false, value: 'benches', id: 'benches', icon: '#icon-bench', text: 'Benches & Tables'},
            {checked: false, value: 'bpark', id: 'bpark', icon: '#icon-bpark', text: 'Bicycle Parking'},
            {checked: false, value: 'commserv', id: 'commserv', icon: '#icon-commserv', text: 'Community Services'},
            {checked: false, value: 'conc', id: 'conc', icon: '#icon-concession', text: 'Concessions'},
            {checked: false, value: 'historic', id: 'historic', icon: '#icon-historic', text: 'Historic Areas'},
            {checked: false, value: 'other', id: 'other-feat', icon: '#icon-other', text: 'Other'},
            {checked: false, value: 'parking', id: 'parking', icon: '#icon-parking', text: 'Parking'},
            {checked: false, value: 'ranger', id: 'ranger', icon: '#icon-ranger', text: 'Ranger Station'},
            {checked: false, value: 'restroom', id: 'restroom', icon: '#icon-restroom', text: 'Restrooms'},
            {checked: false, value: 'signs', id: 'signs', icon: '#icon-sign', text: 'Signs & Mileposts'},
            {checked: false, value: 'trails', id: 'trails', icon: '#icon-trail', text: 'Hiking Trails'},
            {checked: false, value: 'vista', id: 'vista', icon: '#icon-vista', text: 'Scenic Vistas'},
            {checked: false, value: 'water', id: 'water', icon: '#icon-water', text: 'Drinking Water'},
        ];

        var commToggles = [
            {checked: false, value: 'lodging', id: 'lodging', icon: '#icon-lodging', text: 'Lodging'},
            {checked: false, value: 'food', id: 'food', icon: '#icon-food', text: 'Food & Drink'},
            {checked: false, value: 'shopping', id: 'shopping', icon: '#icon-shopping', text: 'Shopping'},
            {checked: false, value: 'services', id: 'services', icon: '#icon-services', text: 'Services'},
            {checked: false, value: 'activities', id: 'activities', icon: '#icon-activities', text: 'Activities'},
            {checked: false, value: 'other', id: 'other-comm', icon: '#icon-other', text: 'Other'}
        ];


        /* Will need to be run by router to keep season toggle accurate*/
        function setSeason(season){
            var newSeason = seasonsQueries[season];
            $rootScope.activeSeason = season;
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
    	    commToggles: commToggles,
            featToggles: featToggles,
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