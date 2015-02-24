(function() {

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['$scope', 'panelsFactory', '$rootScope'];

    function PanelsCtrl($scope, panelsFactory, $rootScope){

    	var vm = this;
    	
    	vm.panels = [
    		{
                name: 'Background',
                className: 'background-panel-toggle',
                id: 'back'
            },
            {
                name: 'Seasons',
                className: 'seasons-panel-toggle',
                id: 'seasons'
            },
            {
                name: 'Points of Interest',
                className: 'poi-panel-toggle',
                id: 'poi'
            },
            {
                name: 'Legend',
                className: 'legend-panel-toggle',
                id: 'legend'
            }
    	];

        vm.switchStatus = '';

        vm.changePanel = function(panel){
            
            if (vm.switchStatus === panel){
                vm.switchStatus = '';
            } else {
                vm.switchStatus = panel;
            }
        }

        $scope.$watch('vm.switchStatus', function() {
            // vm.switchStatus = panel;
            // vm.data = $rootScope.data;
        });

        // console.log($scope.$id);

    };

})();