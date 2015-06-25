(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .factory('ctrlsFactory', ctrlsFactory);

    ctrlsFactory.$inject = ['mapFactory'];

    function ctrlsFactory(mapFactory){

        var map = mapFactory.map;

        var factory = {
            getZoom: getZoom,
            locate: locate,
            map: map,
            tileLayers: mapFactory.tileLayers,
            zoomHome: zoomHome,
            zoomIn: zoomIn,
            zoomOut: zoomOut,
        };

        function getZoom(){
            return mapFactory.map.getZoom();
        }

        function zoomIn(){
            map.zoomIn();
        }

        function zoomOut(){
            map.zoomOut();
        }

        function zoomHome(){
            mapFactory.zoomHome(map);
        }

        function locate(){
            map.locate({
                setView: true,
                maxZoom: 13
            });
        }

        return factory;

    }

})();