(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['mapFactory', '$scope', 'kioskFactory'];

    function CtrlsCtrl(mapFactory, $scope, kioskFactory){

        var vm = this,
            map = mapFactory.map,
            tileLayers = mapFactory.tileLayers;

        vm.map = mapFactory.map;

        // Toggle bg tiles layer
        vm.bgId = '#icon-tree';
        vm.showAerial = false;

        // Locate
        mapFactory.addGps(map);

        var gpsBtn = angular.element( document.querySelector( '.gps-button' ) );

        gpsBtn.bind('click', function() {
            $scope.$apply(function(){
                vm.gpsIsActive = !vm.gpsIsActive;
            });
        });


        /***** Back/history *****/
        vm.historyControl = new L.HistoryControl({
            useExternalControls: true,
        }).addTo(map);

        // Enabled
        map.on('historybackenabled',function(){
            $scope.safeApply(function(){
                vm.backEnabled = !vm.backEnabled;
            });
        });

        // Disabled
        map.on('historybackdisabled',function(){
            $scope.safeApply(function(){
                vm.backEnabled = !vm.backEnabled;
            });
        });

        // Get rid of the 'digest cycle' errors
        $scope.safeApply = function(fn) {
          var phase = this.$root.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };

        // Zoom to home extent
        vm.zoomHome = function(){
            mapFactory.zoomHome(map);
        };

        // Reset map defaults
        vm.reloadMap = function(){
            mapFactory.reloadMap();
        };

        // Change background layer
        vm.changeTiles = function(){

            vm.showAerial = !vm.showAerial;

            if (vm.showAerial) {
                vm.bgId = '#icon-mountain';
                map.removeLayer(tileLayers.terrain);
                map.addLayer(tileLayers.aerial);
                tileLayers.aerial.bringToBack();
            } else {
                vm.bgId = '#icon-tree';
                map.removeLayer(tileLayers.aerial);
                map.addLayer(tileLayers.terrain);
                tileLayers.terrain.bringToBack();
            }

        };


    }

})();
