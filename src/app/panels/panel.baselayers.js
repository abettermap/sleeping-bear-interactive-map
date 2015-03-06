(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelBaselayers', panelBaselayers);

    panelBaselayers.$inject = ['basePath'];

    function panelBaselayers(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.baselayers.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();