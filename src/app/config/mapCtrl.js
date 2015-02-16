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