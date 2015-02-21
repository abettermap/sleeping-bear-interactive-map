(function() {

    angular
        .module('ctrlsModule')
        .factory('ctrlsFactory', ctrlsFactory);

    function ctrlsFactory(mapFactory, $rootScope, Fullscreen){

        var ctrlsFactory = {}

        ctrlsFactory.zoomIn = function(){
            mapFactory.map.zoomIn();
        }

        ctrlsFactory.zoomOut = function(){
            mapFactory.map.zoomOut();
        }

        ctrlsFactory.zoomHome = function(){
            mapFactory.map.setView(mapFactory.mapDefaults.leaflet.center,12);
        }

        ctrlsFactory.locate = function(){
            mapFactory.map.locate({
                setView: true,
                maxZoom: 12
            });
        }

        ctrlsFactory.executeFunctionByName = function(functionName, context /*, args */) {
            var args = [].slice.call(arguments).splice(2);
            var namespaces = functionName.split(".");
            var func = namespaces.pop();
            for(var i = 0; i < namespaces.length; i++) {
              context = context[namespaces[i]];
            }
            return context[func].apply(this, args);
        }

        $rootScope.isFullscreen = false;

        ctrlsFactory.fullScreen = function(){
            if (Fullscreen.isEnabled()){
                // angular.element('#map-container').toggleClass('fullscreen');
                angular.element('#map-container').toggleClass('fullscreen');
                Fullscreen.cancel();
                return;
            } else {
                angular.element('#map-container').toggleClass('fullscreen');
                $rootScope.isFullscreen = !$rootScope.isFullscreen;
            }
        }

        return ctrlsFactory;

    }


})();