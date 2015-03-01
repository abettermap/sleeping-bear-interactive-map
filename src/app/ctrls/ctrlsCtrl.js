(function() {

    'use strict';

    var CtrlsCtrl = function($scope, ctrlsFactory){
        var vm = this;

        vm.zoomIn = function(){
            ctrlsFactory.zoomIn();
        };
        vm.zoomOut = function(){
            ctrlsFactory.zoomOut();
        };
        vm.zoomHome = function(){
            ctrlsFactory.zoomHome();
        };
        vm.locate = function(){
            ctrlsFactory.locate();
        };

        vm.fullScreen = function() {
            ctrlsFactory.fullScreen();
        };

        vm.executeFunctionByName = function(functionName, context /*, args */) {
            ctrlsFactory.executeFunctionByName(functionName, context /*, args */);
        };

        // $rootScope.$watch('data', function() {
        //     vm.data = $rootScope.data;
        // });

    };

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['$scope', 'ctrlsFactory'];

})();