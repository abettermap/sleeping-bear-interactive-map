(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panels', panels);

    panels.$inject = ['basePath'];

    function panels(basePath){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: basePath.url('app/panels/templates/panelsTemplate.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();