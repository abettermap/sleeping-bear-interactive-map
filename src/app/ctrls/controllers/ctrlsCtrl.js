(function() {

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['$scope', 'ctrlsFactory', '$rootScope', 'Fullscreen'];

    function CtrlsCtrl($scope, ctrlsFactory, $rootScope, Fullscreen){
        var vm = this;

        vm.zoomIn = function(){
            ctrlsFactory.zoomIn();
        }
        vm.zoomOut = function(){
            ctrlsFactory.zoomOut();
        }
        vm.zoomHome = function(){
            ctrlsFactory.zoomHome();
        }
        vm.locate = function(){
            ctrlsFactory.locate();
        }

        vm.fullScreen = function() {
            ctrlsFactory.fullScreen();
        }

        vm.executeFunctionByName = function(functionName, context /*, args */) {
            ctrlsFactory.executeFunctionByName(functionName, context /*, args */);
        }

        vm.ctrls = [
            {
                name: '+',
                fn: 'zoomIn',
                className: '#icon-zoom-in'
            },
            {
                name: '-',
                fn: 'zoomOut',
                className: '#icon-zoom-out'
            },
            {
                name: 'home',
                fn: 'zoomHome',
                className: '#icon-zoom-home'
            },
            {
                name: 'GPS',
                fn: 'locate',
                className: '#icon-locate'
            },
            {
                name: 'full',
                fn: 'fullScreen',
                className: '#icon-enable-full'
            }
        ];


        $rootScope.$watch('data', function() {
            vm.data = $rootScope.data;
        });

    }

})();