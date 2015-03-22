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
            // center: [44.88652,-86.00544],
            // zoom: 12,
            zoomControl: false,
            layers: tileLayers.terrain

        };

        var mapFactory = {
            createMap: createMap,
            map: map,
            leafletDefaults: leafletDefaults,
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
            // map.panTo(center);
        }

        function createMap(){


            // Height of map-wrapper = screen height
            var screenHt = $(window).height();
            // alert(screenHt);

            // Unless it's an iPhone...
            if (navigator.userAgent.match(/iPhone/i)){
                // screenHt = screenHt + 72;
                // $('#map-wrapper').css("height",screenHt);
                // if
                $('#map-wrapper').addClass('iphone');
            }

            // iPad
            if (navigator.userAgent.match(/iPad/i)){
                // screenHt = screenHt + 72;
                // $('#map-wrapper').css("height",screenHt);
                $('#map-wrapper').addClass('ipad');
            }

            mapFactory.map = L.map('map', leafletDefaults);
            mapFactory.zoomHome(mapFactory.map);
            return mapFactory.map;
        }

        return mapFactory;

    }

})();