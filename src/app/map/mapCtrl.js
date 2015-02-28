(function() {

    'use strict';

    angular
        .module('mapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory'];

    function MapCtrl($scope, mapService, $rootScope, layersFactory){

        $rootScope.className = "map-container";

        alert('mapctrl called');
        function init(){
            layersFactory.addCdbLayer();
        }
        init();

    }

})();