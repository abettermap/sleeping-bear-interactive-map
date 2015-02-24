(function() {

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'mapFactory', '$rootScope'];

    function PopupCtrl($scope, mapFactory, $rootScope){
        var vm = this;
        vm.data = {};
        vm.coords = '';
        vm.tests = [
            {name: "popup1"},
            {name: "popup2"}
        ];

        vm.mapCenter = {
            center: ''
        }

        vm.getCenter = function(){
            vm.coords = vm.map.getCenter();
        }

        vm.map = mapFactory.map;

        // vm.map.on('mousemove click', function(e) {
        //     $scope.$apply(function(){
        //         vm.coords = e.latlng.toString();
        //     });
        // });
        // console.log($scope.$id);

        $rootScope.$watch('data', function() {
            vm.data = $rootScope.data;
        });

    }

})();