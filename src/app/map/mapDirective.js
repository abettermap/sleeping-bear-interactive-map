(function() {

    'use strict';

    angular
        .module('mapApp')
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapService', 'layersFactory'];

    function interactiveMap(mapService, layersFactory){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){
                
                function init(){
                    layersFactory.addCdbLayer(mapService.createMap());
                }
                init();
            }
        };
        
    }

})();