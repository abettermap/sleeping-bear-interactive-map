var mapApp = angular.module('mapApp', ['ngRoute']);
mapApp.constant('MapValueDefaults', {
    cartodb: {
        type: 'CartoDB',
        user_name: 'remcaninch',
        sublayers: [
            {   // TRAIL FOR NOW
                sql: "SELECT * FROM sbht_temp",
                cartocss: "#sbht_temp{line-color:green;line-width:3.5;}",
                interactivity: "name",
                name: "Sleeping Bear Heritage Trail"
            },
            {   // GRADE FOR NOW
                sql: "SELECT * FROM sbht_grade_temp",
                cartocss: "#sbht_grade_temp{line-color: #000000;line-width: 3;line-opacity: 0.7;line-dasharray: 2,3;}",
                interactivity: "name, direction, grade",
                name: "Grade"
            },
            {   // CAUTION FOR NOW
                sql: "SELECT * FROM sbht_caution_temp",
                cartocss: "#sbht_caution_temp{line-color:#F11810;line-width:4;line-opacity:0.55;}",
                interactivity: "descrip, type",
                name: 'Caution'
            },
            {   // NPS POI
                sql: "SELECT * FROM nps_poi_digitize",
                cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                name: 'NPS POI'
            },
            {   // SBHT POI
                sql: "SELECT * FROM sbht_poi_digitize",
                cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                name: 'SBHT POI'
            },
            {   // COMM POI
                sql: "SELECT * FROM comm_poi_master",
                cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                interactivity: "name, type, mile, name_id, season, x, y, sw_offset, ne_offset, descrip, video, audio, phone, addr_no, addr_name, addr_type, city, zip, email, website",
                name: 'Commercial POI'
            },
            {   // TRAIL PIX
                sql: "SELECT * FROM trail_pix_digitize",
                cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                interactivity: "img_file, season",
                name: 'Trail Pics'
            }
        ]
    },
    tileLayer: {
        url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        options: {
            attribution: "\u00a9 <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors \u00a9 <a href= \"http://cartodb.com/attributions#basemaps\">CartoDB</a>"
        }
    },
    leaflet: {
        // tileLayer: 'http://tile.stamen.com/toner-lite/{z}/{x}/{y}.jpg',
        // tileLayerOptions: {
        //     attribution: '&copy; <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCAQFjAA&url=http%3A%2F%2Fmaps.stamen.com%2F&ei=YASqVPOSJYWhyASky4CoBg&usg=AFQjCNH45Se7Q4ss_N_OiCN4Jqc-TXCk-w&sig2=LAfiRGpwSILDBDkeD6CoVA">Stamen Maps</a> contributors'
        // },
        zoom: 11,
        zoomControl: true,
        center: [44.8957686012,-86.00646972]
    }
});
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
var mapPopupDirective = function () {
    return {
        // scope: {
        //     name: '@'
        // },
        templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/popups/templates/mapPopup.html'
    };
};

angular.module('mapApp').directive('mapPopup', mapPopupDirective);

angular.module('mapApp').controller('MapCtrl', MapCtrl);

// Keeps things clean, and safe from minification
MapCtrl.$inject = ['$scope', 'MapValueDefaults', 'mapFactory'];

function MapCtrl($scope, MapValues, mapFactory) {

    $scope.featureData = [];
    $scope.tableName = '';

    $scope.getFeatureData = function(data, tableName){
        if (!data){
            return "";
        } else {
            var dataArray = Object.keys(data).map(function(key){
                var result = {
                    key: key,
                    data: data[key]
                }
                return result;
                // return  '<b>' + key + ': </b>' + data[key];
            });
            $scope.tableName = tableName;
            $scope.featureData = dataArray;
            // return dataArray;
        }
        console.log($scope.featureData);
    }

    // $scope.loadInitialMap = function(){
    //     mapFactory.loadInitialMap();
    // }
    $scope.loadInitialMap = function(){
        cartodb.createLayer(mapFactory.map, MapValues.cartodb)
        .addTo(mapFactory.map)
        .on('done', function(layer) {
            cdb.vis.Vis.addCursorInteraction(mapFactory.map, layer);
            var sublayers = layer.options.sublayers;
            for (var i = sublayers.length - 1; i >= 0; i--) {
                var sublayer = layer.getSubLayer(i);
                sublayer.setInteraction(true);
                var tableNameArr = [];
                // tableNameArr.push(sublayers[i].name);
                sublayer.on('featureClick', function(e, pos, latlng, data) {
                    $scope.$apply(function() {
                        var tableName = '';
                        $scope.getFeatureData(data, tableName);
                        console.log(tableName);
                    });
                });
            };
        }).on('error', function() {
            console.log("some error occurred");
        });
    }

    $scope.loadInitialMap();



    function addCursorInteraction(layer) {
      var hovers = [];

      layer.bind('mouseover', function(e, latlon, pxPos, data, layer) {
      console.log(layer);
        hovers[layer] = 1;
        cursor.set('pointer')
        // if(_.any(hovers)) {
        //   $('#map').css('cursor', 'pointer');
        // }
      });

      layer.bind('featureOut', function(m, layer) {
        hovers[layer] = 0;
        if(!_.any(hovers)) {
          $('#map').css('cursor', 'pointer');
        }
      });
    }


    $scope.getSql = function(){
        mapFactory.getSql();
    }

    $scope.trailInfo = '';
    $scope.getTrailInfo = function(data){
        sendTrailInfo(data);
    }

    // $scope.$watch("centroid.lng", function (zoom) {
    //     $scope.zoomLev = zoom;
    // });

    // leafletData.getMap().then(function(map) {
    //     // console.log("shtuff");
    //     // cartodb.createLayer(map, vizPath)
    //     cartodb.createLayer(map, MapValues.cartodb)
    //     .addTo(map)
    //     .on('done', function(layer) {
    //         var trailSublayer = layer.getSubLayer(0);
    //         addCursorInteraction(trailSublayer);
    //         // cdb.vis.Vis.addCursorInteraction(map, trailSublayer);
    //         trailSublayer.setInteraction(true);
    //         trailSublayer.on('featureOver', function() {
    //           cursor.set('pointer')
    //         });
    //         layer.on('featureOver', function() {
    //           cursor.set('pointer')
    //         });
    //         trailSublayer.on('featureClick', function(e, pos, latlng, data) {
    //             $scope.trailInfo = data.name;
    //             // $scope.getTrailInfo(data);
    //         });
    //         // trailSublayer.on('mouseover', function() {
    //         //   cursor.set('pointer')
    //         // });
    //         var npsSublayer = layer.getSubLayer(1);
    //         // cdb.vis.Vis.addCursorInteraction(map, npsSublayer);
    //         npsSublayer.setInteraction(true);
    //         npsSublayer.on('featureClick', function(e, pos, latlng, data) {
    //             $scope.trailInfo = data.type;
    //             // $scope.getTrailInfo(data);
    //         });
    //     })
    //     .on('error', function() {
    //         console.log("error");
    //     });
    // });


    // $scope.$on('$viewContentLoaded', function(){
    //   hey();
    // });
    // $scope.$watch("traildata.name", function (zoom) {
    //     console.log("things happenin");
    // });

    // $scope.$watch("centroid.lng", function (zoom) {
    //     $scope.zoomLev = zoom;
    // });

}