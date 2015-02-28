(function() {

    'use strict';

    angular
        .module('mapApp')
        // .module('panelsModule')
        .directive('panels', panels);

    // panels.$inject = ['$rootScope'];

    // function panels($rootScope){
    function panels(){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/panels/templates/panelsTemplate.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();