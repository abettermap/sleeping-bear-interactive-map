(function() {

    'use strict';

    angular
        .module('mapApp')
        // .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['$scope', 'panelsFactory', '$rootScope', 'mapService'];

    function PanelsCtrl($scope, panelsFactory, $rootScope, mapService){

    	var vm = this;

        vm.panelSwitchStatus = '';

        vm.panel = '';

        vm.changePanel = function(panel){
            
            if (vm.panel === panel){
                vm.panel = '';
            } else {
                vm.panel = panel;
            }
            
        };

        $scope.currentBaselayer = {
            name: 'terrain'
        };
        
        vm.changeTiles = panelsFactory.changeTiles;

    }

})();