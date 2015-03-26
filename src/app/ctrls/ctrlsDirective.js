(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .directive('mapControls', mapControls);

    mapControls.$inject = ['basePath'];

    function mapControls(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('src/app/ctrls/templates/ctrlsTemplate.html'),
            controller: 'CtrlsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();