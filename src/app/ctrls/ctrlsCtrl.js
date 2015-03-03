(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['ctrlsFactory', 'basePath'];

    function CtrlsCtrl(ctrlsFactory, basePath){

        var vm = this;

        vm.svgPath = basePath.url;

        vm.fullScreen = ctrlsFactory.fullScreen;

        vm.locate = ctrlsFactory.locate;

        vm.zoomHome = ctrlsFactory.zoomHome;

        vm.zoomIn = ctrlsFactory.zoomIn;

        vm.zoomOut = ctrlsFactory.zoomOut;

    }

})();
