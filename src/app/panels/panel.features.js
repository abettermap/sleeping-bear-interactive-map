(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelFeatures', panelFeatures);

    panelFeatures.$inject = ['basePath'];

    function panelFeatures(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('src/app/panels/templates/panel.features.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();