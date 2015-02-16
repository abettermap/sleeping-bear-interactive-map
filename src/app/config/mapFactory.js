angular.module('mapApp').factory('mapFactory', ['MapValueDefaults', function mapFactory(MapValueDefaults) {

    var mapFactory = {};

    mapFactory.map = new L.Map('map', MapValueDefaults.leaflet);

    L.tileLayer(MapValueDefaults.tileLayer.url, MapValueDefaults.tileLayer.options)
    .addTo(mapFactory.map);

    mapFactory.loadInitialMap = function(){
        cartodb.createLayer(mapFactory.map, MapValues.cartodb)
        .addTo(mapFactory.map)
        .on('done', function(layer) {
            cdb.vis.Vis.addCursorInteraction(mapFactory.map, layer);
            var sublayer = layer.getSubLayer(0);
            console.log(layer);
            sublayer.setInteractivity('name');
            layer.setInteractivity('name');
            sublayer.setInteraction(true);
            layer.setInteraction(true);
            sublayer.on('featureClick', function(e, pos, latlng, data) {
                $scope.$apply(function() {
                    $scope.pointData = data.name;
                });
            });
        }).on('error', function() {
            console.log("some error occurred");
        });
    }


    mapFactory.getSql = function(){
        var sql = new cartodb.SQL({ user: MapValues.cartodb.user_name });
        sql.execute("SELECT name FROM " + MapValues.table, { id: 3 })
          .done(function(data) {
            var myData = data.rows;
            for (var i = myData.length - 1; i >= 0; i--) {
                console.log("Trail Nombre: " + myData[i].name);
            };
          })
          .error(function(errors) {
            console.log("errors:" + errors);
          })
    }

    return mapFactory;

}]);