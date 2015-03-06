(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelLegend', panelLegend);

    panelLegend.$inject = ['basePath'];

    function panelLegend(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.legend.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();