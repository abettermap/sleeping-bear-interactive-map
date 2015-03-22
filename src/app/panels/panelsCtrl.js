(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory', '$rootScope'];

    function PanelsCtrl(panelsFactory, $rootScope){

    	var vm = this;

        vm.featToggles = panelsFactory.featToggles;
        vm.commToggles = panelsFactory.commToggles;

        //////// PANELS \\\\\\\\

        // The active panel
        // vm.activePanel = '';
        vm.activePanel = 'seasons';

        vm.changePanel = function(panel){

            if (vm.activePanel === panel){
                vm.activePanel = '';
            } else {
                vm.activePanel = panel;
            }

        };

        //////// SEASONS PANEL \\\\\\\\
        // The active season
        vm.activeSeason = $rootScope.activeSeason;

        vm.activeSeasonIcon = '#icon-summer';

        // Close Seasons panel when season is clicked
        vm.setSeason = function(season){
            vm.activePanel   = '';
            vm.activeSeasonIcon = '#icon-' + vm.activeSeason;
            panelsFactory.setSeason(season);
        };

        //////// POI VIEWS \\\\\\\\
        vm.poiTogglesViews = [
            {icon: '#icon-map-pin', id: 'nav', heading: 'Points of Interest'},
            {icon: '#icon-back', id: 'feat', heading: 'Features'},
            {icon: '#icon-back', id: 'comm', heading: 'Businesses'}
        ];
        vm.poiTogglesActiveView = vm.poiTogglesViews[0];

        // Change POI toggle view
        vm.changePoiView = function(view){
            vm.poiTogglesActiveView = view;
        };
    }

})();