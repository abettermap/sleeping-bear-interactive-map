//////*   ctrlsFactory.js   *//////
(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .factory('ctrlsFactory', ctrlsFactory);

    // do this so you don't lose it during ugg...
    ctrlsFactory.$inject = ['mapService'];

    function ctrlsFactory(mapService){
        
        var ctrlsFactory = {};
        var map = mapService.map;

        ctrlsFactory.zoomIn = function(){
            map.zoomIn();
        };

        ctrlsFactory.zoomOut = function(){
            map.zoomOut();
        };

        ctrlsFactory.zoomHome = function(){
            var southWest = L.latLng(44.82641, -86.07977),
                northEast = L.latLng(44.94245, -85.93695),
                bounds = L.latLngBounds(southWest, northEast);
            map.fitBounds([
                [southWest],
                [northEast]
            ]);
        };

        ctrlsFactory.locate = function(){
            map.locate({
                setView: true,
                maxZoom: 13
            });
        };

        ctrlsFactory.executeFunctionByName = function(functionName, context /*, args */) {
            var args = [].slice.call(arguments).splice(2);
            var namespaces = functionName.split(".");
            var func = namespaces.pop();
            for(var i = 0; i < namespaces.length; i++) {
              context = context[namespaces[i]];
            }
            return context[func].apply(this, args);
        };

        /* FULLSCREEN */
        ctrlsFactory.fullScreen = function(){
            angular.element('#map-wrapper').toggleClass('fullscreen');
            map.invalidateSize();
            $('#map-wrapper')[0].scrollIntoView(true);
        };

        return ctrlsFactory;

    }


})();