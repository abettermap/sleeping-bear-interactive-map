//////*   ctrlsFactory.js   *//////
(function() {

    angular
        .module('ctrlsModule')
        .factory('ctrlsFactory', ctrlsFactory);

    // do this so you don't lose it during ugg...
    ctrlsFactory.$inject = ['mapFactory', '$rootScope', 'Fullscreen'];

    function ctrlsFactory(mapFactory, $rootScope, Fullscreen){

        var ctrlsFactory = {}
        var map = mapFactory.map;

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

        $rootScope.isFullscreen = false;

        ctrlsFactory.fullScreen = function(){
            // map.invalidateSize();
            angular.element('#map-container').toggleClass('fullscreen');
                map.invalidateSize();
            setTimeout(function(){
            }, 400);
        };

        return ctrlsFactory;

    }


})();