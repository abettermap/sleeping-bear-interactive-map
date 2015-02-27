(function() {

    'use strict';

    angular
        .module('mapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory'];

    function MapCtrl($scope, mapService, $rootScope, layersFactory){

        // console.log($location);

        $rootScope.className = "map-container";

        function init(){
            layersFactory.addCdbLayer();
        }
        init();

    }

})();