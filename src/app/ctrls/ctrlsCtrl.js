(function() {

    'use strict';

    angular
        .module('mapApp')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['$scope', 'ctrlsFactory', '$rootScope'];

    function CtrlsCtrl($scope, ctrlsFactory, $rootScope){
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

        // vm.ctrls = [
        //     {
        //         name: '+',
        //         fn: 'zoomIn',
        //         id: '#icon-zoom-in'
        //     },
        //     {
        //         name: '-',
        //         fn: 'zoomOut',
        //         id: '#icon-zoom-out'
        //     },
        //     {
        //         name: 'home',
        //         fn: 'zoomHome',
        //         id: '#icon-zoom-home'
        //     },
        //     {
        //         name: 'GPS',
        //         fn: 'locate',
        //         id: '#icon-locate'
        //     },
        //     {
        //         name: 'full',
        //         fn: 'fullScreen',
        //         id: '#icon-enable-full'
        //     }
        // ];


        // $rootScope.$watch('data', function() {
        //     vm.data = $rootScope.data;
        // });

    }

})();