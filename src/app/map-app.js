var mapApp = angular.module('mapApp', ['leaflet-directive']);

  mapApp.constant('MapValues', {
    id: 'map',
    table: 'sbht_rough_013115',
    apiKey: 'e11cc18c2ce30d0b5ea6e4d199c708d2d9fd1eb8',
    cartodb: {
      user_name: 'travelampel',
      type: 'cartodb',
      // interaction: true,
      sublayers: [{
        cartocss: "#sbht_rough_013115{line-color:#00aaff;line-width:4;}",
        // cartocss: getMss(),
        // interactivity: 'cartodb_id, job',
        sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht_rough_013115"
      }]
    },
    sqlQueries: {
        allTrail: "SELECT * FROM sbht_rough_013115"
    },
    leafletDefaults: {
      tileLayer: 'http://tile.stamen.com/toner-lite/{z}/{x}/{y}.jpg',
      tileLayerOptions: {
          attribution: '&copy; <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCAQFjAA&url=http%3A%2F%2Fmaps.stamen.com%2F&ei=YASqVPOSJYWhyASky4CoBg&usg=AFQjCNH45Se7Q4ss_N_OiCN4Jqc-TXCk-w&sig2=LAfiRGpwSILDBDkeD6CoVA">Stamen Maps</a> contributors'
      },
      zoomControl: true
    },
    centroid: {
        lat: 44.8957686012,
        lng: -86.00646972,
        zoom: 11
    },
    leafletLayers: {
        baselayers: {
            wms: {
                name: 'EEUU States (WMS)',
                type: 'wms',
                url: 'http://suite.opengeo.org/geoserver/usa/wms',
                layerParams: {
                    layers: 'usa:states',
                    format: 'image/png',
                    transparent: true
                }
            }
        },
        overlays: {
            cartodbInteractive: {
                key: '4b98ea41b978a133ada5828b2c51b793:1422910483792.78',
                // key: 'e11cc18c2ce30d0b5ea6e4d199c708d2d9fd1eb8',
                name: 'Sleeping Bear Heritage Trail',
                type: 'cartodbInteractive',
                user: 'travelampel',
                layer: 'sbht_rough_013115',
                options: {
                    cartocss: "#sbht_rough_013115{line-color:#00aaff;line-width:4;}",
                    // cartocss: getMss(),
                    // interactivity: 'cartodb_id, job',
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht_rough_013115"
                }
            }
        }
    },
    panels: [
      { hide: true, name: 'time', fa: 'clock-o'},
      { hide: true, name: 'employers', fa: 'users'},
      { hide: true, name: 'skills', fa: 'code'},
      { hide: true, name: 'list', fa: 'list-ul'},
      { hide: true, name: 'favorites', fa: 'star'}
    ]
  });
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