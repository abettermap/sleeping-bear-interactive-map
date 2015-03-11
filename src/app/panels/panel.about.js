(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelAbout', panelAbout);

    panelAbout.$inject = ['basePath'];

    function panelAbout(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.about.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();