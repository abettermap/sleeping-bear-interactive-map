(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelHelp', panelHelp);

    panelHelp.$inject = ['basePath'];

    function panelHelp(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.help.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();