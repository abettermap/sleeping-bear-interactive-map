(function() {

    'use strict';

    angular
        .module('mapApp')
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapFactory', 'layersFactory'];

    function interactiveMap(mapFactory, layersFactory){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){

                function init(){
                    mapFactory.createMap();
                    layersFactory.addCdbLayer(mapFactory.map);
                }

                init();

                // window.onload = function(){
                    // if (navigator.userAgent.match(/iPhone/i)){

                    //     var theDoc = document.getElementsByTagName('html')[0];
                    //     theDoc.style.height = "calc(100% + 72px)";

                    // }

                // };


            }
        };

    }

})();