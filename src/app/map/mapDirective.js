(function() {

    'use strict';

    angular
        .module('mapApp')
        // .directive('interactiveMap', interactiveMap);
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapService', '$rootScope', 'layersFactory'];

    function interactiveMap(mapService, $rootScope, layersFactory){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){
                
                function init(map){
                    layersFactory.addCdbLayer(mapService.createMap());
                }
                init();
            }
        };
        
    }

})();