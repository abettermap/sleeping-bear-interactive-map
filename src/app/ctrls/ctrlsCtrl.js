(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['ctrlsFactory'];

    function CtrlsCtrl(ctrlsFactory){

        var vm = this;

        vm.fullScreen = ctrlsFactory.fullScreen;

        vm.locate = ctrlsFactory.locate;

        vm.zoomHome = ctrlsFactory.zoomHome;

        vm.zoomIn = ctrlsFactory.zoomIn;

        vm.zoomOut = ctrlsFactory.zoomOut;

    }

})();
