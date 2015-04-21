(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory', '$rootScope', '$http', '$scope', '$stateParams', '$state', 'layersFactory', '$sce', 'popupFactory'];

    function PanelsCtrl(panelsFactory, $rootScope, $http, $scope, $stateParams, $state, layersFactory, $sce, popupFactory){

    	var vm = this;

        //////// PANELS \\\\\\\\

        // The active panel
        // vm.activePanel = 'features';

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
            // $state.go('home', {
            $state.go('popup', {
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

        // Update SQL when feature toggled
        vm.selectedCommTypes = [];
        vm.selectedFeatTypes = [];

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

        }

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

        }

        //////// TRAIL PANEL \\\\\\\\

        // Root scope query states
        vm.queryStates = $rootScope.queryStates;

        // Trail pics state
        vm.trailPicsState = $rootScope.queryStates.trail_pix;

        // Faces state
        vm.facesState = $rootScope.queryStates.faces;

        // Grade/caution model attempt
        vm.lineOverlayStates = [
            {name: 'Grade', layer: 'sbht_grade', on: false, icon: '#icon-grade'},
            {name: 'Caution', layer: 'sbht_caution', on: false, icon: '#icon-caution'},
        ];

        vm.toggleLineOverlay = function(overlay){

            var operator;

            if (overlay.on){
                operator = ">";
            } else {
                operator = "=";
            }

            var query,
                queries = {
                    prefix: "SELECT the_geom_webmercator, cartodb_id,",
                    sbht_grade: "" +
                        " grade, 'sbht_grade' as layer",
                    sbht_caution: "" +
                        " type_name, type, 'sbht_caution' as layer",
                    suffix: "" +
                        " FROM " + overlay.layer +
                        " WHERE cartodb_id " + operator + " 0"
                };

            query = queries.prefix + queries[overlay.layer] + queries.suffix;

            $rootScope.queryStates[overlay.layer] = !$rootScope.queryStates[overlay.layer];

            layersFactory.sublayers[overlay.layer].setSQL(query);

        };

        vm.toggleTrailPicsState = function(){

            popupFactory.clearTempMarker(panelsFactory.map, panelsFactory.map._layers);

            if ($rootScope.queryStates.trail_pix){
                $rootScope.queryStates.trail_pix = false;
            } else {
                $rootScope.queryStates.trail_pix = true;
            }

        };

        vm.toggleFacesState = function(){

            popupFactory.clearTempMarker(panelsFactory.map, panelsFactory.map._layers);

            if ($rootScope.queryStates.faces){
                $rootScope.queryStates.faces = false;
            } else {
                $rootScope.queryStates.faces = true;
            }

        };


        //////// INFO PANEL \\\\\\\\
        vm.activeInfoPgHeader = 'Help & Info';
        vm.isInfoHomePage = true;
        vm.activeInfoPgIcon = '#icon-info';

        // Enable HTML
        vm.toTrusted = function(html_code) {
            return $sce.trustAsHtml(html_code);
        }


        vm.toggleFeaturesLayer = function(layer){
            panelsFactory.toggleFeaturesLayer(layer);
        };

        vm.setActiveInfoPg = function(page){

            if (page === 'Home'){
                vm.isInfoHomePage = true;
                vm.activeInfoPgHeader = 'Help & Info'
            } else {
                vm.isInfoHomePage = false;
                vm.activeInfoPgHeader = page;
            }

            vm.activeInfoPg = page;

        };

        panelsFactory.getHelpData().then(function(dataResponse) {

            vm.helpData = dataResponse.data.rows;

        });




    }

})();