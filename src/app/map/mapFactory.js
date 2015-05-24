(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('mapFactory', mapFactory);

    mapFactory.$inject = ['$http'];

    function mapFactory($http){

        var tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
        };

        var factory = {
            createMap: createMap,
            map: {},
            tileLayers: tileLayers,
            zoomHome: zoomHome,
        };

        var leafletDefaults = {
            attribution: false,
            zoomControl: false,
            layers: tileLayers.terrain
        };

        function zoomHome(map){
            var empireBeach = L.latLng(44.8123, -86.0681),
                portOneida = L.latLng(44.9394, -85.9374),
                center = L.latLng(44.87585, -86.00275);
            map.fitBounds([
                [empireBeach],
                [portOneida]
            ]);
        }

        function createMap(){
            factory.map = L.map('map', leafletDefaults);
            factory.zoomHome(factory.map);
        }

        return factory;

    }

})();