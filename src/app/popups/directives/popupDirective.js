(function() {

    angular
        .module('mapApp')
        .directive('popup', popup);

    function popup(){
        return {
            restrict: 'E',
            // scope: {
            //     // test: '='
            // },
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/popups/templates/mapPopup.html',
            controller: 'PopupCtrl',
            controllerAs: 'vm',
            replace: true
        }
    }

})();