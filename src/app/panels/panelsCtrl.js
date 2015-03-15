(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory'];

    function PanelsCtrl(panelsFactory){

    	var vm = this;

        vm.featToggles = panelsFactory.featToggles;
        vm.commToggles = panelsFactory.commToggles;

        //////// PANELS \\\\\\\\

        // The active panel
        vm.activePanel = 'features';
        // vm.panel = ''; PUT BACK AFTER TESTING

        vm.changePanel = function(panel){

            if (vm.activePanel === panel){
                vm.activePanel = '';
            } else {
                vm.activePanel = panel;
            }

        };

        //////// SEASONS PANEL \\\\\\\\
        // The active season
        vm.season = 'summer';

        // Close Seasons panel when season is clicked
        vm.changeSeason = function(season){
            vm.panel = '';
        };

        //////// POI VIEWS \\\\\\\\
        vm.poiTogglesViews = [
            {id: 'nav', heading: 'Points of Interest'},
            {id: 'feat', heading: 'Features'},
            {id: 'comm', heading: 'Businesses'}
        ];
        vm.poiTogglesActiveView = vm.poiTogglesViews[0];
        vm.poiTogglesHeader = 'Points of Interest';
        // vm.poiTogglesActiveView = 'nav';

        // Change POI toggle view
        vm.changePoiView = function(view){
            vm.poiTogglesActiveView = view;
        };
    }

})();