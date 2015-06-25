(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['ctrlsFactory', '$scope'];

    function CtrlsCtrl(ctrlsFactory, $scope){

        var vm = this,
            map = ctrlsFactory.map,
            tileLayers = ctrlsFactory.tileLayers;

        // Toggle bg tiles layer
        vm.bgId = '#icon-tree';
        vm.showAerial = false;


        // Locate
        addGps(map);

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

        // Others
        vm.zoomHome = ctrlsFactory.zoomHome;
        vm.zoomIn = ctrlsFactory.zoomIn;
        vm.zoomOut = ctrlsFactory.zoomOut;

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

        function addGps(map){

            var tempMarker = L.marker([0,0],{
                iconSize: [25,25],
                icon: L.divIcon({
                    className: 'current-location-icon',
                    html: "<svg viewBox='0 0 100 100'>" +
                        "<use xlink:href='#icon-locate'></use></svg>"
                }),
            });

            var gpsCtrl =  new L.Control.Gps({
                maxZoom: 20,
                marker: tempMarker,
                style: {radius: 15, weight:4, color: 'red', fill: false, opacity:0.8}
            });
            gpsCtrl._map = map;

            var controlDiv = gpsCtrl.onAdd(map);
            $('#test').append(controlDiv);

        }

    }

})();
