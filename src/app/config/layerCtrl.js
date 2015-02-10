mapApp.controller('LayerCtrl',[ 'leafletData', '$scope', 'MapValues', 'MapFactory', function(leafletData, $scope, MapValues, MapFactory) {
    leafletData.getMap().then(function(map) {
        cartodb.createLayer(map, MapValues.cartodb)
          .addTo(map)
          .on('done', function(layer) {
            layer.getSubLayer(0).set(MapValues.cartodb.sublayers);
          }).on('error', function() {
            //log the error
          });
    });
}]);