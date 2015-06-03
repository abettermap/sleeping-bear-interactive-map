(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory', '$rootScope', '$http', '$state', 'layersFactory', '$sce', 'popupFactory'];

    function PanelsCtrl(panelsFactory, $rootScope, $http, $state, layersFactory, $sce, popupFactory){

    	var vm = this;

        //////// PANELS \\\\\\\\

        // Close it when any feature clicked
        $rootScope.$on('featureClicked',function(){
            vm.activePanel = '';
        });

        vm.changePanel = function(panel){

            if (vm.activePanel === panel){
                vm.activePanel = '';
            } else {
                vm.activePanel = panel;
            }

            // Close popup
            $state.go('popup', {
            },{
                reload: true
            });

        };

        //////// SEASONS PANEL \\\\\\\\
        vm.activeSeason = $rootScope.queryStates.season;
        vm.activeSeasonIcon = 'spring';

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

            vm.activeSeasonIcon = seasonsQueries[$rootScope.queryStates.season];

            panelsFactory.setSeason(season);

        };

        //////// POI VIEWS \\\\\\\\

        // Pages/views
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

                // Add a 'types' attribute to each record
                // and give it an empty array
                for (var z = 0; z < sg.length; z++) {
                    sg[z].types = [];
                }

                // Add 'icon' and 'id' attributes and assign subgroup
                for (var i = 0; i < sg.length; i++) {
                    for (var n = 0; n < types.length; n++) {
                        types[n].icon = "#icon-" + types[n].type;
                        types[n].id = table + "-" + types[n].type;

                        if (sg[i].sub_group === types[n].sub_group){
                            sg[i].types.push(types[n]);
                        }
                    }
                }

                if (table === 'feat'){
                    vm.featSubGroups = sg;
                } else {
                    vm.commSubGroups = sg;
                }

            });

        }

        // Change POI toggle view
        vm.activePoiPage = 'Home';
        vm.activePoiPageIcon = '#icon-map-pin';
        vm.activePoiPageTitle = 'Points of Interest';

        vm.setActivePoiPage = function(page){

            vm.activePoiPage = page;

            if (page === 'Home'){
                vm.activePoiPageTitle = 'Points of Interest';
                vm.activePoiPageIcon = '#icon-map-pin';
            } else {
                vm.activePoiPageTitle = page;
                vm.activePoiPageIcon = '#icon-back';
            }

        };

        vm.selectedCommTypes = [];
        vm.selectedFeatTypes = [];

        // Update SQL when feature toggled
        vm.toggleFeatures = function(type){

            var withQuotes = "'" + type + "'";
            var idx = vm.selectedFeatTypes.indexOf(withQuotes),
                mainPtsCheck = vm.selectedFeatTypes.indexOf("'mainpoints'");

            // is currently selected
            if (idx > -1) {
                vm.selectedFeatTypes.splice(idx, 1);
            }

            // is newly selected
            else {
                vm.selectedFeatTypes.push("'" + type + "'");
            }

            // Put mainpoints back in if features array empty
            if (mainPtsCheck <= 0) {
                vm.selectedFeatTypes.push("'mainpoints'");
            }

            panelsFactory.toggleFeatures(vm.selectedFeatTypes);

        };

        vm.toggleCommercial = function(type){

            var idx = vm.selectedCommTypes.indexOf(type);

            // is currently selected
            if (idx > -1) {
                vm.selectedCommTypes.splice(idx, 1);
            }

            // is newly selected
            else {
                vm.selectedCommTypes.push(type);
            }

            panelsFactory.toggleCommercial(vm.selectedCommTypes);

        };

        vm.selSubGroupCount = function(sublayer, i){

            var selector = '#' + sublayer + '-subgroup-' + i + ' .poi-type__checkbox:checked',
                count = $(selector);

            if (count) {
                return count.length;
            } else {
                return 0;
            }

        };

        //////// TRAIL PANEL \\\\\\\\

        // Root scope query states
        vm.queryStates = $rootScope.queryStates;

        // Trail pics state
        vm.trailPicsState = $rootScope.queryStates.trail_pix;

        // Faces state
        vm.facesState = $rootScope.queryStates.faces;

        // Grade/caution model attempt
        vm.overlayStates = [
            {name: 'Grade', layer: 'sbht_grade', on: false, icon: '#icon-grade'},
            {name: 'Caution', layer: 'sbht_caution', on: false, icon: '#icon-caution'},
        ];


        // Toggle Grade/caution
        vm.toggleOverlayState = function(overlay){
            layersFactory.toggleOverlayState(overlay);
        };

        $rootScope.$on('setDefaults', function(data){

            vm.overlayStates[0].on = false;
            vm.overlayStates[1].on = false;
            vm.trailCondState = false;

        });

        // Toggle trail pics and faces
        vm.togglePicsState = function(layer){

            popupFactory.clearTempMarker(panelsFactory.map, panelsFactory.map._layers);

            $rootScope.queryStates[layer] = !$rootScope.queryStates[layer];

        };

        // Show trail condition button if winter is selected and current month Nov - Mar
        vm.showTrailCondition = function(){

            var d = new Date(),
                month = d.getMonth();

            if (vm.queryStates.season == 1 && ((month <= 2 ) || (month >= 10 ))){
                return true;
            } else {
                return false;
            }

        };


        //////// INFO PANEL \\\\\\\\
        vm.activeInfoPgHeader = 'Help & Info';
        vm.isInfoHomePage = true;
        vm.activeInfoPgIcon = '#icon-info';

        // Enable HTML
        vm.toTrusted = function(html_code) {
            return $sce.trustAsHtml(html_code);
        };


        vm.toggleFeaturesLayer = function(layer){
            panelsFactory.toggleFeaturesLayer(layer);
        };

        vm.setActiveInfoPg = function(page){

            if (page === 'Home'){
                vm.activeInfoPgHeader = 'Help & Info';
            } else {
                vm.activeInfoPgHeader = page;
            }

            vm.isInfoHomePage = !vm.isInfoHomePage;

            vm.activeInfoPg = page;

        };

        panelsFactory.getHelpData().then(function(dataResponse) {

            vm.helpData = dataResponse.data.rows;

        });




    }

})();