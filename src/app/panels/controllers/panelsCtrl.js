(function() {

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['$scope', 'mapFactory', '$rootScope'];

    function PanelsCtrl($scope, mapFactory, $rootScope){

    	var vm = this;
    	
        vm.panelSwitchStatus = '';

        vm.changePanel = function(panel){
            
            if (vm.panelSwitchStatus === panel){
                vm.panelSwitchStatus = '';
            } else {
                vm.panelSwitchStatus = panel;
            }
        }

        vm.changeTiles = function(current, newLayer){
            mapFactory.changeTiles(current, newLayer);
        }

        // $scope.$watch('vm.value', function(){
        //     console.log("oijmasdlkjfjklasdfkljasdfljksd");
        //     mapFactory.leafletDefaults.layers = [mapFactory.tilesDict[vm.value]];
        // });

    };

})();