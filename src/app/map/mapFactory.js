(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('mapFactory', mapFactory);

    mapFactory.$inject = ['cdbValues'];

    function mapFactory(cdbValues){

        var map = {};

        var tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
            // terrain: L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q', {
            //     attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a><a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
            // })
        };

        var leafletDefaults = {
            
            attribution: false,
            center: [44.88652,-86.00544],
            zoom: 12,
            zoomControl: false,
            layers: tileLayers.terrain
            
        };

        var mapFactory = {
            createMap: createMap,
            map: map,
            leafletDefaults: leafletDefaults,
            tileLayers: tileLayers,
        };

        function createMap(){
            mapFactory.map = L.map('map', leafletDefaults);
            return mapFactory.map;
        }

        return mapFactory;

    }

})();