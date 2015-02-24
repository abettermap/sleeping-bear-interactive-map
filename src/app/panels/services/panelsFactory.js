//////*   panelsFactory.js   *//////
(function() {

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    // do this so you don't lose it during ugg...
    panelsFactory.$inject = ['mapFactory', '$rootScope'];

    function panelsFactory(mapFactory, $rootScope){

		var panelsFactory = {}

		return panelsFactory;

    };


})();