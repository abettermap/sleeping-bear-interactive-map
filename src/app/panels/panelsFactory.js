(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['mapFactory'];

    function panelsFactory(mapFactory){

        var featToggles = [
            {checked: true, id: '#icon-ranger', text: 'Ranger Station'},
            {checked: true, id: '#icon-restroom', text: 'Restrooms'},
            {checked: true, id: '#icon-water', text: 'Drinking Water'},
            {checked: true, id: '#icon-concession', text: 'Concessions'},
            {checked: true, id: '#icon-parking', text: 'Parking'},
            {checked: true, id: '#icon-vista', text: 'Scenic Vistas'},
            {checked: true, id: '#icon-historic', text: 'Historic Areas'},
            {checked: true, id: '#icon-bench', text: 'Benches & Tables'},
            {checked: true, id: '#icon-beach', text: 'Beaches'},
            {checked: true, id: '#icon-trail', text: 'Hiking Trails'},
            {checked: true, id: '#icon-comm-svc', text: 'Community Services'},
            {checked: true, id: '#icon-sign', text: 'Signs & Mileposts'},
            {checked: true, id: '#icon-bike-park', text: 'Bicycle Parking'},
            {checked: true, id: '#icon-other-feat', text: 'Other'}
        ];

        var commToggles = [
            {checked: true, id: '#icon-lodging', text: 'Lodging'},
            {checked: true, id: '#icon-food', text: 'Food & Drink'},
            {checked: true, id: '#icon-shopping', text: 'Shopping'},
            {checked: true, id: '#icon-services', text: 'Services'},
            {checked: true, id: '#icon-activities', text: 'Activities'},
            {checked: true, id: '#icon-other-comm', text: 'Other'}
        ];

    	var panelsFactory = {
            featToggles: featToggles,
    	    commToggles: commToggles
    	};

		return panelsFactory;

    }


})();