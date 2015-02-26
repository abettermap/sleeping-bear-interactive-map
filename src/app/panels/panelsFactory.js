(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    // do this so you don't lose it during ugg...
    panelsFactory.$inject = ['mapFactory', '$rootScope'];

    function panelsFactory(mapFactory, $rootScope){

		var panelsFactory = {};

		var map = mapFactory.map;
		var tileLayers = mapFactory.tileLayers;

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