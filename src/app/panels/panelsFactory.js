(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['mapFactory'];

    function panelsFactory(mapFactory){

		var map = mapFactory.map,
			tileLayers = mapFactory.tileLayers;

		var panelsFactory = {
			changeTiles: changeTiles
		};

		function changeTiles(current) {

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