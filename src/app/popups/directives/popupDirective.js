(function() {

    angular
        .module('popupsModule')
        .directive('popup', popup);

    function popup(){
        return {
            restrict: 'E',
            // scope: {
            //     // test: '='
            // },
            // templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/popups/templates/popupTemplate.html',
            template: '<p class="test"></p>',
            controller: 'PopupCtrl',
            controllerAs: 'vm',
            replace: true
        }
    }

})();