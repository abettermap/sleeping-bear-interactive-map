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
            fullScreen: fullScreen,
            locate: locate,
            zoomHome: zoomHome,
            zoomIn: zoomIn,
            zoomOut: zoomOut,
        };

        function zoomIn(){
            map.zoomIn();
        }

        function zoomOut(){
            map.zoomOut();
        }

        function zoomHome(){
            var southWest = L.latLng(44.82641, -86.07977),
                northEast = L.latLng(44.94245, -85.93695),
                bounds = L.latLngBounds(southWest, northEast);
            map.fitBounds([
                [southWest],
                [northEast]
            ]);
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