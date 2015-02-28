(function() {

    'use strict';

    var playground = function(mapService, $rootScope, layersFactory){

        return {
            restrict: 'E',
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/layers/templates/layersTemplate.html',
            replace: true,
            // CAREFUL WITH MINIFICATION HERE, NOT SURE HOW THIS WORKS W/INTERNAL CTRLER!
            controller: function($scope, layersFactory){
            // controller: function($scope, layersFactory){
				            	
                // $scope.tableName = '';
                // $scope.customers = [];

                // function init() {
                //     layersFactory.getWeather()
                //         .success(function(customers) {
                //             $scope.customers = customers.rows;
                //         })
                //         .error(function(data, status, headers, config) {
                //             $log.log(data.error + ' ' + status);
                //         });
                // }
                
                // init();

                // $scope.$on('feature updated', function(event, e, pos, latlng, data, tableName, i) {
                   
                //    $scope.tableName = tableName[i].name;

                // });

            }
        };
        
    };

    playground.$inject = ['mapService', '$rootScope', 'layersFactory'];

    angular
        .module('mapApp')
        // .directive('interactiveMap', interactiveMap);
        .directive('playground', playground);

})();