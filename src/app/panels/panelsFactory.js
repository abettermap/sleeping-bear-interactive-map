(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['mapFactory'];

    function panelsFactory(mapFactory){

    	var panelsFactory = {
    	    // changeTiles: changeTiles
    	};

		return panelsFactory;

    }


})();