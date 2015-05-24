(function() {

    'use strict';

    angular
        .module('mapApp')
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapFactory', 'layersFactory', 'kioskFactory'];

    function interactiveMap(mapFactory, layersFactory, kioskFactory){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){

                mapFactory.createMap();
                layersFactory.createCdbLayers(mapFactory.map);
                kioskFactory.disableLinks();

            }
        };

    }

})();