(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelInfo', panelInfo);

    function panelInfo(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.info.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();