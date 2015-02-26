(function() {

    angular
        .module('popupsModule')
        .directive('popup', popup);

    function popup(){

        return {
            restrict: 'E',
            scope: {},
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/popups/templates/popupTemplate.html',
            controller: 'PopupCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();