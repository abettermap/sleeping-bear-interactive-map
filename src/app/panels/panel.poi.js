(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelFeatures', panelFeatures);

    function panelFeatures(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.poi.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();