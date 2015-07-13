(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('mapFactory', mapFactory);

    mapFactory.$inject = ['$http'];

    function mapFactory($http){

        // Background layers
        var tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
        };

        var factory = {
            addGps: addGps,
            createMap: createMap,
            map: {},
            reloadMap: reloadMap,
            tileLayers: tileLayers,
            zoomHome: zoomHome,
        };

        // Leaflet defaults
        var leafletDefaults = {
            attribution: false,
            zoomControl: false,
            layers: tileLayers.terrain
        };

        // Make the map
        function createMap(){
            factory.map = L.map('map', leafletDefaults);
            factory.zoomHome(factory.map);
        }

        // Zoom to initial extent
        function zoomHome(map){
            var empireBeach = L.latLng(44.8123, -86.0681),
                portOneida = L.latLng(44.9394, -85.9374),
                center = L.latLng(44.87585, -86.00275);
            map.fitBounds([
                [empireBeach],
                [portOneida]
            ]);
        }

        function addGps(map){

            var tempMarker = L.marker([0,0],{
                iconSize: [25,25],
                icon: L.divIcon({
                    className: 'current-location-icon',
                    html: "<svg viewBox='0 0 100 100'>" +
                        "<use xlink:href='#icon-locate'></use></svg>"
                }),
            });

            var gpsCtrl =  new L.Control.Gps({
                maxZoom: 20,
                marker: tempMarker,
                style: {radius: 15, weight:4, color: 'red', fill: false, opacity:0.8}
            });
            gpsCtrl._map = map;

            var controlDiv = gpsCtrl.onAdd(map);
            $('#zoom-to-current').append(controlDiv);

        }

        // Reload map
        function reloadMap(){

            var url = location.href;

            // If popup, go to initial page
            if (url.indexOf('popup') > -1) {
                if (url.indexOf('kiosk') > -1){ // Kiosk
                    window.location = '/sbht-i-map/kiosk';
                } else {
                    window.location = '/sbht-i-map'; // Not kiosk
                }
            // Otherwise reload
            } else {
                location.reload();
            }

        }


        // Zoom to current GPS position
        function locate(){
            map.locate({
                setView: true,
                maxZoom: 13
            });
        }

        return factory;

    }

})();