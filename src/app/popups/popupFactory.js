(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope'];

    function popupFactory($rootScope){

        popupFactory.getTableInfo = function(table) {

            var thisTable = table;

            $rootScope.$broadcast('feature updated', thisTable);

        };

        popupFactory.featTypes = {
            beach: {
                name: 'Beaches',
                icon: '#icon-beach',
            },
            bench: {
                name: 'Benches & Tables',
                icon: '#icon-bench',
            },
            bpark: {
                name: 'Bicycle Parking',
                icon: '#icon-bpark',
            },
            commserv: {
                name: 'Community Services',
                icon: '#icon-commserv',
            },
            conc: {
                name: 'Concessions',
                icon: '#icon-conc',
            },
            historic: {
                name: 'Historic Areas',
                icon: '#icon-historic',
            },
            other: {
                name: 'Other',
                icon: '#icon-other',
            },
            parking: {
                name: 'Parking',
                icon: '#icon-parking',
            },
            ranger: {
                name: 'Ranger Station',
                icon: '#icon-ranger',
            },
            restroom: {
                name: 'Restrooms',
                icon: '#icon-restroom',
            },
            signs: {
                name: 'Signs & Mileposts',
                icon: '#icon-signs',
            },
            trails: {
                name: 'Hiking Trails',
                icon: '#icon-trails',
            },
            vista: {
                name: 'Scenic Vistas',
                icon: '#icon-vista',
            },
            water: {
                name: 'Drinking Water',
                icon: '#icon-water',
            },
        };


    	return popupFactory;
    };

})();



// popupFactory.getFeatureInfo = function() {

//     var prefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM sbht';

//     return $http.get(prefix);

// };