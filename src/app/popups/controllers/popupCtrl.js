(function() {

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'mapFactory', '$rootScope'];

    function PopupCtrl($scope, mapFactory, $rootScope){
        var vm = this;
        vm.data = {}

        $rootScope.$watch('data', function() {
            vm.data = $rootScope.data;
        });

    }

})();