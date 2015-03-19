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
            ranger: {
                name: 'Ranger Station',
                icon: '#icon-ranger',
            },
            restroom: {
                name: 'Restrooms',
                icon: '#icon-restroom',
            },
            water: {
                name: 'Drinking Water',
                icon: '#icon-water',
            },
            conc: {
                name: 'Concessions',
                icon: '#icon-conc',
            },
            parking: {
                name: 'Parking',
                icon: '#icon-parking',
            },
            vista: {
                name: 'Scenic Vistas',
                icon: '#icon-vista',
            },
            historic: {
                name: 'Historic Areas',
                icon: '#icon-historic',
            },
            bench: {
                name: 'Benches & Tables',
                icon: '#icon-bench',
            },
            beach: {
                name: 'Beaches',
                icon: '#icon-beach',
            },
            trails: {
                name: 'Hiking Trails',
                icon: '#icon-trails',
            },
            commserv: {
                name: 'Community Services',
                icon: '#icon-commserv',
            },
            signs: {
                name: 'Signs & Mileposts',
                icon: '#icon-signs',
            },
            bikepark: {
                name: 'Bicycle Parking',
                icon: '#icon-bikepark',
            },
            other: {
                name: 'Other',
                icon: '#icon-other',
            }
        };


    	return popupFactory;
    };

})();



// popupFactory.getFeatureInfo = function() {

//     var prefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM sbht';

//     return $http.get(prefix);

// };