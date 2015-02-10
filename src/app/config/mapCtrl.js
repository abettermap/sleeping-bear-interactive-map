angular.module('mapApp').controller('MapCtrl', MapCtrl);

// Keeps things clean, and safe from minification
MapCtrl.$inject = ['$scope', 'MapValues', 'mapFactory', 'leafletData'];

function MapCtrl($scope, MapValues, mapFactory, leafletData) {

    angular.extend($scope, {
        defaults: MapValues.leafletDefaults,
        centroid: MapValues.centroid
    });

    $scope.getSql = function(){
        mapFactory.getSql();
    }

    $scope.addTrailLayer = function () {
        mapFactory.addTrailLayer();
    }

    $scope.addTrailLayer();

    // $scope.$on('$viewContentLoaded', function(){
    //   hey();
    // });

    $scope.$watch("centroid.lng", function (zoom) {
        $scope.zoomLev = zoom;
    });

}