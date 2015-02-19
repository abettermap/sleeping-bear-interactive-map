(function() {

    angular
        .module('mapModule')
        .directive('interactiveMap', interactiveMap);

    function interactiveMap(){
        return {
            restrict: 'E',
            template: '<div id="map"></div>',
            controller: 'MapCtrl',
            controllerAs: 'vm',
            replace: true
        }
    }

})();