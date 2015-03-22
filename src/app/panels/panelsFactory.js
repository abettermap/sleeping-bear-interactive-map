(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['mapFactory', '$rootScope'];

    function panelsFactory(mapFactory, $rootScope){

        var featToggles = [
            {checked: true,     id: 'beach', icon: '#icon-beach', text: 'Beaches'},
            {checked: false,    id: 'bench', icon: '#icon-bench', text: 'Benches & Tables'},
            {checked: true,     id: 'bpark', icon: '#icon-bpark', text: 'Bicycle Parking'},
            {checked: false,    id: 'commserv', icon: '#icon-commserv', text: 'Community Services'},
            {checked: true,     id: 'concession', icon: '#icon-concession', text: 'Concessions'},
            {checked: false,    id: 'historic', icon: '#icon-historic', text: 'Historic Areas'},
            {checked: false,    id: 'other-feat', icon: '#icon-other', text: 'Other'},
            {checked: true,     id: 'parking', icon: '#icon-parking', text: 'Parking'},
            {checked: false,    id: 'ranger', icon: '#icon-ranger', text: 'Ranger Station'},
            {checked: false,    id: 'restroom', icon: '#icon-restroom', text: 'Restrooms'},
            {checked: false,    id: 'sign', icon: '#icon-sign', text: 'Signs & Mileposts'},
            {checked: false,    id: 'trail', icon: '#icon-trail', text: 'Hiking Trails'},
            {checked: false,    id: 'vista', icon: '#icon-vista', text: 'Scenic Vistas'},
            {checked: true,     id: 'water', icon: '#icon-water', text: 'Drinking Water'},
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
            var newSeason = season;
            $rootScope.activeSeason = newSeason;
            console.log($rootScope.activeSeason);
        }

    	var panelsFactory = {
    	    commToggles: commToggles,
            featToggles: featToggles,
            setSeason: setSeason,
    	};

		return panelsFactory;

    }


})();