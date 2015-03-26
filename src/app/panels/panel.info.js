(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelInfo', panelInfo);

    panelInfo.$inject = ['basePath'];

    function panelInfo(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('src/app/panels/templates/panel.info.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();