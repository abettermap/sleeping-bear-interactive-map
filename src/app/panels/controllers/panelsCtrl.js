(function() {

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['$scope', 'panelsFactory', '$rootScope'];

    function PanelsCtrl($scope, panelsFactory, $rootScope){

    	var vm = this;
    	
        vm.panelSwitchStatus = '';

        vm.changePanel = function(panel){
            
            if (vm.panelSwitchStatus === panel){
                vm.panelSwitchStatus = '';
            } else {
                vm.panelSwitchStatus = panel;
            }
        }

        $scope.currentBaselayer = {
            name: 'terrain'
        }
        
        vm.changeTiles = panelsFactory.changeTiles;

    };

})();