(function() {

	'use strict';

    angular
        .module('mapApp')
        // .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    // do this so you don't lose it during ugg...
    panelsFactory.$inject = ['mapService', '$rootScope'];

    function panelsFactory(mapService, $rootScope){

		var panelsFactory = {};

		var map = mapService.map;
		var tileLayers = mapService.tileLayers;

		panelsFactory.changeTiles = function(current) {
		    var layerName = current.toString();
			var newLayer = '',
				currentLayer = '';
			for (var key in tileLayers) {
				if (key === layerName){
					newLayer = key;
				} else {
					currentLayer = key;
				}
			}
    		map.removeLayer(tileLayers[currentLayer]);					
    		map.addLayer(tileLayers[newLayer]);
		    tileLayers[newLayer].bringToBack();
		};

		return panelsFactory;

    }


})();