(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory', '$rootScope', '$http', '$scope'];

    function PanelsCtrl(panelsFactory, $rootScope, $http, $scope){

    	var vm = this;

        // vm.featToggles = panelsFactory.featToggles;
        vm.featToggles = [
            {checked: false, id: 'beach', icon: '#icon-beach', text: 'Beaches'},
            {checked: false, id: 'bench', icon: '#icon-bench', text: 'Benches & Tables'},
            {checked: false, id: 'bpark', icon: '#icon-bpark', text: 'Bicycle Parking'},
            {checked: false, id: 'commserv', icon: '#icon-commserv', text: 'Community Services'},
            {checked: false, id: 'concession', icon: '#icon-concession', text: 'Concessions'},
            {checked: false, id: 'historic', icon: '#icon-historic', text: 'Historic Areas'},
            {checked: false, id: 'other-feat', icon: '#icon-other', text: 'Other'},
            {checked: false, id: 'parking', icon: '#icon-parking', text: 'Parking'},
            {checked: false, id: 'ranger', icon: '#icon-ranger', text: 'Ranger Station'},
            {checked: false, id: 'restroom', icon: '#icon-restroom', text: 'Restrooms'},
            {checked: false, id: 'sign', icon: '#icon-sign', text: 'Signs & Mileposts'},
            {checked: false, id: 'trail', icon: '#icon-trail', text: 'Hiking Trails'},
            {checked: false, id: 'vista', icon: '#icon-vista', text: 'Scenic Vistas'},
            {checked: false, id: 'water', icon: '#icon-water', text: 'Drinking Water'},
        ];

        vm.commToggles = [
            {checked: false, id: 'lodging', icon: '#icon-lodging', text: 'Lodging'},
            {checked: false, id: 'food', icon: '#icon-food', text: 'Food & Drink'},
            {checked: false, id: 'shopping', icon: '#icon-shopping', text: 'Shopping'},
            {checked: false, id: 'services', icon: '#icon-services', text: 'Services'},
            {checked: false, id: 'activities', icon: '#icon-activities', text: 'Activities'},
            {checked: false, id: 'other-comm', icon: '#icon-other', text: 'Other'}
        ];

        // vm.commToggles = panelsFactory.commToggles;

        //////// PANELS \\\\\\\\

        // The active panel
        vm.activePanel = '';
        vm.activePanel = 'info';

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
            {hover: false, icon: '#icon-map-pin', id: 'nav', heading: 'Points of Interest'},
            {hover: true, icon: '#icon-back', id: 'feat', heading: 'Features'},
            {hover: true, icon: '#icon-back', id: 'comm', heading: 'Businesses'}
        ];
        vm.poiTogglesActiveView = vm.poiTogglesViews[0];

        // Change POI toggle view
        vm.changePoiView = function(view){
            vm.poiTogglesActiveView = view;
        };

        //////// TRAILS PANEL \\\\\\\\
        vm.trailToggleStatus = {
            caution: true,
            grade: true,
            cond: true,
            pics: true,
            faces: false
        };

        //////// HELP PANEL \\\\\\\\
        vm.activeInfoPg = {
            name: 'home'
        };

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
        $scope.helpData = [];
        $scope.$watch('helpData', get_results, true);

        // $scope.getDetails = function (id) {
        //     var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT subject, text, topic_id FROM help';
        //       $http.get(query).
        //         success(function(data) {
        //             $scope.artist = data;
        //         });
        // }
    }

})();