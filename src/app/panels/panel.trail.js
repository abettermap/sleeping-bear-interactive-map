(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelTrail', panelTrail);

    panelTrail.$inject = ['basePath'];

    function panelTrail(basePath){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.trail.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();