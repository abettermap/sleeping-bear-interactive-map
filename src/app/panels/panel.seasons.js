(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelSeasons', panelSeasons);

    function panelSeasons(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.seasons.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();