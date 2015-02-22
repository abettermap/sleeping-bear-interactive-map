(function() {

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'mapFactory', '$rootScope'];

    function PopupCtrl($scope, mapFactory, $rootScope){
        var vm = this;
        vm.data = {};
        vm.coords = '';

        vm.map = mapFactory.map;


        // vm.map.on('mousemove click', function(e) {
        //     $scope.$apply(function(){
        //         vm.coords = e.latlng.toString();
        //     });
        // });


        $rootScope.$watch('data', function() {
            vm.data = $rootScope.data;
        });

    }

})();