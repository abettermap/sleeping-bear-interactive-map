(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelFeatures', panelFeatures);

    panelFeatures.$inject = ['basePath'];

    function panelFeatures(basePath){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.poi.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();