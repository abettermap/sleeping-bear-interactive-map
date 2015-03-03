(function() {

    'use strict';

    angular
        .module('mapApp')
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapFactory', 'layersFactory'];

    function interactiveMap(mapFactory, layersFactory){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){
                
                function init(){
                    mapFactory.createMap();
                    layersFactory.addCdbLayer(mapFactory.map);
                }
                init();
            }
        };
        
    }

})();