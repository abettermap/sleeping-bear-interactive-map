//////*   ctrlsFactory.js   *//////
(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .factory('ctrlsFactory', ctrlsFactory);

    // do this so you don't lose it during ugg...
    ctrlsFactory.$inject = ['mapFactory'];

    function ctrlsFactory(mapFactory){

        var map = mapFactory.map;

        var ctrlsFactory = {
            getZoom: getZoom,
            fullScreen: fullScreen,
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

        function fullScreen(){
            angular.element('#map-wrapper').toggleClass('fullscreen');
            map.invalidateSize();
            $('#map-wrapper')[0].scrollIntoView(true);
        }

        // function changeTiles(current) {
        // function changeTiles() {



        //     var layerName = current.toString(),
        //         newLayer = '',
        //         currentLayer = '';

        //     for (var key in tileLayers) {
        //         if (key === layerName){
        //             newLayer = key;
        //         } else {
        //             currentLayer = key;
        //         }
        //     }

        //     map.removeLayer(tileLayers[currentLayer]);
        //     map.addLayer(tileLayers[newLayer]);
        //     tileLayers[newLayer].bringToBack();

        // };

        // ctrlsFactory.executeFunctionByName = function(functionName, context /*, args */) {
        //     var args = [].slice.call(arguments).splice(2);
        //     var namespaces = functionName.split(".");
        //     var func = namespaces.pop();
        //     for(var i = 0; i < namespaces.length; i++) {
        //       context = context[namespaces[i]];
        //     }
        //     return context[func].apply(this, args);
        // };

        return ctrlsFactory;

    }


})();