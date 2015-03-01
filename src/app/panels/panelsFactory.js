(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['mapService'];

    function panelsFactory(mapService){

		var panelsFactory = {};

		var map = mapService.map;
		var tileLayers = mapService.tileLayers;

		panelsFactory.changeTiles = function(current) {

		    var layerName = current.toString(),
				newLayer = '',
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