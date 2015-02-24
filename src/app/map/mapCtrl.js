(function() {

    angular
        .module('mapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'mapFactory', '$rootScope'];

    function MapCtrl($scope, mapFactory, $rootScope){

        $rootScope.className = "map-container";

        var vm = this;
        $scope.value = 'foo';
        vm.map = mapFactory.map;
        vm.cartodbDefaults = mapFactory.cartodbDefaults;
        vm.mapDefaults = mapFactory.mapDefaults;

        vm.addCdbLayer = mapFactory.addCdbLayer;
        vm.addCdbLayer();

        vm.getFeatureData = function(data, tableName){
            console.log("passed");
            if (!data){
                return "";
            } else {
                function dataArray(){
                    var hey = Object.keys(data).map(function(key){
                        var result = {
                            key: key,
                            data: data[key]
                        }
                        return result;
                    });
                    return hey;
                }
                return dataArray();
            }
        }

        //     // $scope.$on('$viewContentLoaded', function(){
        //     //   hey();
        //     // });
        //     // $scope.$watch("traildata.name", function (zoom) {
        //     //     console.log("things happenin");
        //     // });


    }

})();