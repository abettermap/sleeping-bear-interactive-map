(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['ctrlsFactory', 'basePath'];

    function CtrlsCtrl(ctrlsFactory, basePath){

        var vm = this,
            map = ctrlsFactory.map,
            tileLayers = ctrlsFactory.tileLayers;

        vm.bgId = '#icon-tree';

        vm.showAerial = false;
        vm.svgPath = basePath.url;// + 'src/';

        // vm.fullScreen = function(){
        //             window.scrollTo(0, 172);
        //             // alert("anythang?");

        // };

        vm.locate = ctrlsFactory.locate;

        vm.zoomHome = ctrlsFactory.zoomHome;

        vm.zoomIn = ctrlsFactory.zoomIn;

        vm.zoomOut = ctrlsFactory.zoomOut;

        vm.currentZoom = ctrlsFactory.getZoom();
        vm.getZoom = function(){
            vm.currentZoom = ctrlsFactory.getZoom();
        }



        // vm.changeTiles = ctrlsFactory.changeTiles;
        vm.changeTiles = function(){

            // var layerName = current.toString(),
            //     newLayer = '',
            //     currentLayer = '';

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

            // for (var key in tileLayers) {
            //     if (key === layerName){
            //         newLayer = key;
            //     } else {
            //         currentLayer = key;
            //     }
            // }

            // map.removeLayer(tileLayers[currentLayer]);
            // map.addLayer(tileLayers[newLayer]);
            // tileLayers[newLayer].bringToBack();

        }

    }

})();
