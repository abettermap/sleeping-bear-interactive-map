(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PositionCtrl', PositionCtrl);

    PositionCtrl.$inject = ['currentPositionLatLng', 'mapFactory', '$state', 'popupFactory'];

    function PositionCtrl(currentPositionLatLng, mapFactory, $state, popupFactory){

        var map = mapFactory.map,
            mapLayers = map._layers;

        popupFactory.clearTempMarker(map, mapLayers);

        map.panTo(currentPositionLatLng);
        map.setZoom(14);

        var positionMarker = L.marker(currentPositionLatLng,{
            temp: true,
            icon: L.divIcon({
                className: 'current-location-icon',
                html: "<svg viewBox='0 0 100 100'>" +
                    "<use xlink:href='#icon-locate'></use></svg>"
            }),
        });

            positionMarker.addTo(map);

        }

})();