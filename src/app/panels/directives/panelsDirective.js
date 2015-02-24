(function() {

    angular
        .module('panelsModule')
        .directive('panels', panels);

    function panels(){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/panels/templates/panelsTemplate.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        }
    }

})();