(function() {

    angular
        .module('ctrlsModule')
        .directive('mapControls', mapControls);

    function mapControls(){
        return {
            restrict: 'E',
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/ctrls/templates/ctrlsTemplate.html',
            controller: 'CtrlsCtrl',
            controllerAs: 'vm',
            replace: true
        }
    }

})();