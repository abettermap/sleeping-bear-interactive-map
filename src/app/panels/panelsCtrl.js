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
        vm.activePanel = '';
        // vm.activePanel = 'features';

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
        vm.activeSeason = $rootScope.activeSeason;

        vm.activeSeasonIcon = '#icon-summer';

        // Close Seasons panel when season is clicked
        vm.setSeason = function(season){
            vm.activePanel   = '';
            vm.activeSeasonIcon = '#icon-' + vm.activeSeason;

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

        // Change POI toggle view
        vm.setPoiPg = function(page){
            vm.activePoiPg = vm.poiPages[page];
        };

        // Same as factory
        vm.featToggles = panelsFactory.featToggles;
        vm.commToggles = panelsFactory.commToggles;

        vm.selectedTypes = [];

        // Set query
        vm.toggleFeatures = function(type){

            var withCommas = "'" + type + "'";
            var idx = vm.selectedTypes.indexOf(withCommas);

            // is currently selected
            if (idx > -1) {
                vm.selectedTypes.splice(idx, 1);
            }

            // is newly selected
            else {
                vm.selectedTypes.push("'" + type + "'");
            }

            panelsFactory.toggleFeatures(vm.selectedTypes);
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
        vm.activeInfoPg = {
            name: 'home'
        };

        vm.toggleFeaturesLayer = function(layer){
            panelsFactory.toggleFeaturesLayer(layer);
        };

        $scope.helpData = [];
        $scope.$watch('helpData', get_results, true);

        var get_results = function() {
          // if (name) {
            var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT subject, text, topic_id FROM help';
            $http.get(query).
              success(function(data) {
                $scope.helpData = data.rows;
                // $scope.topic = data.rows[0].subject;
              });

          // }
        }

        vm.getHelpData = function(){
            get_results();
            // Set info panel active
            vm.changePanel('info');

        }

        // $scope.getDetails = function (id) {
        //     var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT subject, text, topic_id FROM help';
        //       $http.get(query).
        //         success(function(data) {
        //             $scope.artist = data;
        //         });
        // }
    }

})();