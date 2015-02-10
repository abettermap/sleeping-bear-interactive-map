angular.module('mapApp').factory('mapFactory', mapFactory); //['MapValues', 'leafletData']);

function mapFactory (MapValues, leafletData) {

    var mapFactory = {};

    // Add trail layer
    mapFactory.addTrailLayer = function(){
        leafletData.getMap('mymap')
            .then(function(map) {
                cartodb.createLayer(map, MapValues.cartodb)
                .addTo(map)
                .on('error', function() {
                    console.log("error");
                })
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

}
// });