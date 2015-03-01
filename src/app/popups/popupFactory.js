(function() {

    'use strict';

    angular
        .module('popupModule') 
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope'];

    function popupFactory($rootScope){

        popupFactory.getTableInfo = function(table) {

            var thisTable = table;

            $rootScope.$broadcast('feature updated', thisTable);
            
        };

    	return popupFactory;
    };

})();



// popupFactory.getFeatureInfo = function() {

//     var prefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM sbht';
    
//     return $http.get(prefix);

// };