(function() {

    angular
        .module('mapModule')
        .directive('interactiveMap', interactiveMap);

    function interactiveMap(){
        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            controller: 'MapCtrl',
            controllerAs: 'vm',
            replace: true
        }
    }

})();