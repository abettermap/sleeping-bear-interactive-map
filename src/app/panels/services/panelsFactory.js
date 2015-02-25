//////*   panelsFactory.js   *//////
(function() {

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    // do this so you don't lose it during ugg...
    panelsFactory.$inject = ['mapFactory', '$rootScope'];

    function panelsFactory(mapFactory, $rootScope){

		var panelsFactory = {}

		var map = mapFactory.map;
		var tileLayers = mapFactory.tileLayers;

		panelsFactory.changeTiles = function(current) {
			 // debugger;
			// if (current){
			    var layerName = current.toString();
			    // var obj = tileLayers[key];
					var newLayer = '',
						currentLayer = '';
				for (var key in tileLayers) {
					console.log("shtuff");
					if (key === layerName){
						newLayer = key;
					} else {
						currentLayer = key;
					}
				}
		    		map.removeLayer(tileLayers[currentLayer]);					
		    		map.addLayer(tileLayers[newLayer]);
		    tileLayers[newLayer].bringToBack();
			// }
		    // map.addLayer(tileLayers[newLayer]);
		};

		return panelsFactory;

    };


})();