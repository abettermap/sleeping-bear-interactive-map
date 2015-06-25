(function() {

    'use strict';

    angular
        .module('panelsModule')
        .filter('svgIconCardHref', SvgFilter);

    SvgFilter.$inject = ['$sce'];

    function SvgFilter ($sce){
      return function(iconCardId) {
        return $sce.trustAsResourceUrl('#icon-' + iconCardId);
      };
    }

})();

