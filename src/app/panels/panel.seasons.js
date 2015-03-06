(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelSeasons', panelSeasons);

    panelSeasons.$inject = ['basePath'];

    function panelSeasons(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.seasons.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();