(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelPoi', panelPoi);

    panelPoi.$inject = ['basePath'];

    function panelPoi(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.poi.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();