mapApp.factory('MapFactory', function (MapValues, leafletData) {

    var MapFactory = {};
    // return MapFactory

    // THE INITIAL LAYER
    MapFactory.initialLayer = function () {

        // leafletData.getMap('mymap').then(function(map) {
        //     cartodb.createLayer(map, MapValues.cartodb)
        //     .addTo(map);
        // });

    }

    MapFactory.ottawa = function () {
      leafletData.getMap().then(function(map) {
          map.fitBounds([ [44.712, -77.227], [45.774, -74.125] ]);
      });
    }

    return MapFactory;


});