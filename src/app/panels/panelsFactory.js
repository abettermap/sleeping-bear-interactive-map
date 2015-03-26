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

        function togglePoiLayer(layer){

            if (layer == 'feat') {
                sublayers.features.setSQL("SELECT * FROM features limit 10");
            };

        }

        // Commercial \\
        // function toggleCommLayer(){
        //     sublayers.features.setSQL("SELECT * FROM features limit 10");
        // }

        var featToggles = [
            {checked: false, id: 'beach', icon: '#icon-beach', text: 'Beaches'},
            {checked: false, id: 'bench', icon: '#icon-bench', text: 'Benches & Tables'},
            {checked: false, id: 'bpark', icon: '#icon-bpark', text: 'Bicycle Parking'},
            {checked: false, id: 'commserv', icon: '#icon-commserv', text: 'Community Services'},
            {checked: false, id: 'concession', icon: '#icon-concession', text: 'Concessions'},
            {checked: false, id: 'historic', icon: '#icon-historic', text: 'Historic Areas'},
            {checked: false, id: 'other-feat', icon: '#icon-other', text: 'Other'},
            {checked: false, id: 'parking', icon: '#icon-parking', text: 'Parking'},
            {checked: false, id: 'ranger', icon: '#icon-ranger', text: 'Ranger Station'},
            {checked: false, id: 'restroom', icon: '#icon-restroom', text: 'Restrooms'},
            {checked: false, id: 'sign', icon: '#icon-sign', text: 'Signs & Mileposts'},
            {checked: false, id: 'trail', icon: '#icon-trail', text: 'Hiking Trails'},
            {checked: false, id: 'vista', icon: '#icon-vista', text: 'Scenic Vistas'},
            {checked: false, id: 'water', icon: '#icon-water', text: 'Drinking Water'},
        ];

        var commToggles = [
            {checked: false, id: 'lodging', icon: '#icon-lodging', text: 'Lodging'},
            {checked: false, id: 'food', icon: '#icon-food', text: 'Food & Drink'},
            {checked: false, id: 'shopping', icon: '#icon-shopping', text: 'Shopping'},
            {checked: false, id: 'services', icon: '#icon-services', text: 'Services'},
            {checked: false, id: 'activities', icon: '#icon-activities', text: 'Activities'},
            {checked: false, id: 'other-comm', icon: '#icon-other', text: 'Other'}
        ];

        /* Will need to be run by router to keep season toggle accurate*/
        function setSeason(season){
            var seasonsQueries = {
                winter: 1,
                spring: 2,
                summer: 3,
                fall: 4,
            };
            var newSeason = seasonsQueries[season];
            var query = "SELECT features.name, features.the_geom_webmercator, features.cartodb_id, features.type, features.mile, features.name_id, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE substring(features.seasons," + newSeason + ",1) = 'y' AND features.type = 'mainpoints' ORDER BY priority";
            sublayers.features.setSQL(query);
            // $rootScope.activeSeason = season;

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

    	var panelsFactory = {
    	    commToggles: commToggles,
            featToggles: featToggles,
            getHelpData: getHelpData,
            setSeason: setSeason,
            hey: hey,
            togglePoiLayer: togglePoiLayer,
    	};

		return panelsFactory;

    }


})();