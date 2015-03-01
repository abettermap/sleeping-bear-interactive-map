(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory'];

    function PanelsCtrl(panelsFactory){

    	var vm = this;

        vm.changeTiles = panelsFactory.changeTiles;

        vm.changePanel = function(panel){
            
            if (vm.panel === panel){
                vm.panel = '';
            } else {
                vm.panel = panel;
            }
            
        };

        vm.panel = '';        

    }

})();