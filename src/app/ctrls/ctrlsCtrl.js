(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['ctrlsFactory'];

    function CtrlsCtrl(ctrlsFactory){

        var vm = this;

        vm.fullScreen = function() {
            ctrlsFactory.fullScreen();
        };
        vm.locate = function(){
            ctrlsFactory.locate();
        };
        vm.zoomHome = function(){
            ctrlsFactory.zoomHome();
        };
        vm.zoomIn = function(){
            ctrlsFactory.zoomIn();
        };
        vm.zoomOut = function(){
            ctrlsFactory.zoomOut();
        };

    };

})();

    // vm.executeFunctionByName = function(functionName, context /*, args */) {
    //     ctrlsFactory.executeFunctionByName(functionName, context /*, args */);
    // };