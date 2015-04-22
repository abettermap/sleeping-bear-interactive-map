(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panels', panels);

    function panels(){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'src/app/panels/templates/panelsTemplate.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();