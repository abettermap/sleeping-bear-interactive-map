(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory', '$rootScope', '$http', '$scope', '$stateParams', '$state', 'layersFactory'];

    function PanelsCtrl(panelsFactory, $rootScope, $http, $scope, $stateParams, $state, layersFactory){

    	var vm = this;

        //////// PANELS \\\\\\\\

        // The active panel
        vm.activePanel = 'features';
        vm.activePanel = '';


        $rootScope.$on('rootScope:activeImagesSet', function (event, data) {
            vm.activePanel = '';
        });

        vm.changePanel = function(panel){

            if (vm.activePanel === panel){
                vm.activePanel = '';
            } else {
                vm.activePanel = panel;
            }

            // Close popup
            $state.go('home', {
            },{
                reload: true
            });

        };

        //////// SEASONS PANEL \\\\\\\\
        // The active season
        vm.activeSeason = $rootScope.queryStates.season;

        vm.activeSeasonIcon = '#icon-summer';

        // Close Seasons panel when season is clicked
        vm.setSeason = function(season){
            vm.activePanel   = '';
            $rootScope.queryStates.season = season;
            var seasonsQueries = {
                1: 'winter',
                2: 'spring',
                3: 'summer',
                4: 'fall',
            };
            vm.activeSeasonIcon = '#icon-' + seasonsQueries[$rootScope.queryStates.season];
// debugger;
            panelsFactory.setSeason(season);

        };

        //////// POI VIEWS \\\\\\\\

        // Pages/views
        vm.poiPages = {
            nav: {hover: false, icon: '#icon-map-pin', id: 'nav', heading: 'Points of Interest'},
            feat: {hover: true, icon: '#icon-back', id: 'feat', heading: 'Features'},
            comm: {hover: true, icon: '#icon-back', id: 'comm', heading: 'Businesses'}
        };
        vm.activePoiPg = vm.poiPages.nav;

        vm.featSubGroups = null;
        vm.commSubGroups = null;
        vm.allFeatTypes = null;
        vm.allCommTypes = null;

        panelsFactory.getSubGroups('feat').then(function(dataResponse) {

            var subGroups = dataResponse.data.rows;

            getPoiTypes(subGroups, 'feat');

        });

        panelsFactory.getSubGroups('comm').then(function(dataResponse) {

            var subGroups = dataResponse.data.rows;

            getPoiTypes(subGroups, 'comm');

        });

        function getPoiTypes(subGroups, table){

            var sg = subGroups;

            panelsFactory.getPoiPages(table).then(function(dataResponse) {

                var types = dataResponse.data.rows;

                for (var i = 0; i < sg.length; i++) {
                    sg[i].types = [];
                }

                for (var i = 0; i < sg.length; i++) {
                    for (var n = 0; n < types.length; n++) {
                        types[n].icon = "#icon-" + types[n].type;
                        types[n].id = table + "-" + types[n].type;

                        if (sg[i].sub_group == types[n].sub_group){
                            sg[i].types.push(types[n]);
                        }
                    }
                }
                if (table == 'feat'){
                    vm.featSubGroups = sg;
                } else {
                    vm.commSubGroups = sg;
                }
            });

        }


        // Change POI toggle view
        vm.activePoiPage = 'Home';
        vm.activePoiPageIcon = '#icon-map-pin';

        vm.setActivePoiPage = function(page){
            vm.activePoiPage = page;
            if (page !== 'Home'){
                vm.activePoiPageIcon = '#icon-back';
            } else {
                vm.activePoiPageIcon = '#icon-map-pin';
            }
        };

        // Update SQL when feature toggled
        vm.selectedTypes = [];

        vm.toggleFeatures = function(type, layer){

            var withQuotes = "'" + type + "'";
            var idx = vm.selectedTypes.indexOf(withQuotes);

            // is currently selected
            if (idx > -1) {
                vm.selectedTypes.splice(idx, 1);
            }

            // is newly selected
            else {
                vm.selectedTypes.push("'" + type + "'");
            }

            // Put mainpoints back in if features array empty
            if (layer === 'features' && vm.selectedTypes.length <= 0) {
                vm.selectedTypes.push("'mainpoints'");
            }

            panelsFactory.toggleFeatures(vm.selectedTypes, layer);
        }

        //////// TRAILS PANEL \\\\\\\\
        vm.trailToggleStatus = {
            caution: false,
            grade: false,
            cond: false,
            pics: false,
            faces: false
        };


        //////// INFO PANEL \\\\\\\\
        vm.activeInfoPg = 'Home';
        vm.activeInfoPgIcon = '#icon-info';

        vm.toggleFeaturesLayer = function(layer){
            panelsFactory.toggleFeaturesLayer(layer);
        };

        vm.setActiveInfoPg = function(page){
            alert(page);
            vm.activeInfoPage = page;
            if (page !== 'Home'){
                vm.activeInfoPageIcon = '#icon-back';
            } else {
                vm.activeInfoPageIcon = '#icon-info';
            }
        };

        panelsFactory.getHelpData().then(function(dataResponse) {

            vm.helpData = dataResponse.data.rows;

        });




    }

})();