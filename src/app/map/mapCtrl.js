(function() {

    angular
        .module('mapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'mapFactory', '$rootScope'];

    function MapCtrl($scope, mapFactory, $rootScope){

        $rootScope.className = "map-container";

        var vm = this;

        vm.map = mapFactory.map;
        vm.mapDefaults = mapFactory.mapDefaults;

        cartodb.createLayer(vm.map, vm.mapDefaults.cartodb)
        .addTo(vm.map)
        .on('done', function(layer) {
            cdb.vis.Vis.addCursorInteraction(vm.map, layer);
            var sublayers = layer.options.sublayers;
            var tableNameArr = [];
            for (var i = sublayers.length - 1; i >= 0; i--) {

                var sublayer = layer.getSubLayer(i);
                sublayer.setInteraction(true);

                tableNameArr.push({
                    tablename: sublayers[i].name,
                    index: i
                });

                // sublayer.on('featureClick', mapFactory.featureClick(e, pos, latlng, data));
                sublayer.on('featureClick', function(e, pos, latlng, data) {
                    $rootScope.$apply(function() {
                        $rootScope.data = data;
                    });
                     // mapFactory.featureClick(data);
                    // mapFactory.setProperty(data.name);
                    // var newSub = layer.options.sublayers[this._position]
                    // var tableName = newSub.name;
                    // var dataArray = vm.getFeatureData(data, tableName);
                    // $scope.$apply(function() {
                    //     vm.featureData = {
                    //         name: tableName,
                    //         data: dataArray
                    //     }
                    // });
                });


            };
        }).on('error', function() {
            console.log("some error occurred");
        });

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

        //     // $scope.$watch("centroid.lng", function (zoom) {
        //     //     $scope.zoomLev = zoom;
        //     // });

    }

})();