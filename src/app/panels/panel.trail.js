(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelTrail', panelTrail);

    function panelTrail(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.trail.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();