(function() {

    'use strict';

    angular
        // .module('layersModule')
        .module('layersModule')
        .controller('LayersCtrl', LayersCtrl);

    LayersCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory'];

    function LayersCtrl($scope, mapService, $rootScope, layersFactory){

    	$scope.sublayers = layersFactory.sublayers;

	}

})();