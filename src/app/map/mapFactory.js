(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('mapFactory', mapFactory);

    function mapFactory(){

        var map = {};

        var tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
        };

        var leafletDefaults = {
            attribution: false,
            zoomControl: false,
            layers: tileLayers.terrain
        };

        var mapFactory = {
            createMap: createMap,
            map: map,
            tileLayers: tileLayers,
            zoomHome: zoomHome,
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

            mapFactory.map = L.map('map', leafletDefaults);

            mapFactory.zoomHome(mapFactory.map);

        }

        return mapFactory;

    }

})();