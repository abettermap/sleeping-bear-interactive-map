// configgggggeration
  var mapApp = angular.module('mapApp', ['leaflet-directive']);
  // var mapApp = angular.module('mapApp', ['ngRoute', 'leaflet-directive']);
  console.log("shtuff");
mapApp.controller('MapCtrl',[ '$scope', 'MapValues', 'MapFactory', function($scope, MapValues, MapFactory) {

    angular.extend($scope, {
      defaults: MapValues.leafletDefaults
    });

    // $scope.panels = MapFactory.panels;
    // $scope.initialLayer = MapFactory.initialLayer();

    // $scope.panelTemplatePath = function(filename){
    //   var path = '/wordpress/wp-content/plugins/wp-interactive-map/app/html/partials/panels/panel-';
    //   path = path + filename.name + '.html';
    //   return path;
    // }

    // $scope.showPanel = function(visStatus){
    //   MapFactory.showPanel(visStatus);
    // }

    // $scope.ottawa = function(){
    //   MapFactory.ottawa();
    // }

    // $scope.pauseTorque = function(){
    //   leafletData.getMap('mymap').then(function(map) {
    //     timeLayer.addTo(map);
    //     timeLayer.play();
    //   });
    // }
    //     // timeLayer.pause();

}]);
  mapApp.constant('MapValues', {
    id: 'map',
    table: 'sbht_rough_013115',
    cartodb: {
      user_name: 'travelampel',
      type: 'cartodb',
      // interaction: true,
      sublayers: [{
        cartocss: "#sbht_rough_013115{marker-fill: #109DCD; marker-width: 5; marker-line-color: white; marker-line-width: 0;}",
        // cartocss: getMss(),
        // interactivity: 'cartodb_id, job',
        sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht_rough_013115"
      }]
    },
    sqlQueries: {
        date: "SELECT the_geom_webmercator, date, yr, cartodb_id, job, CASE yr WHEN 2004 THEN 4 WHEN 2005 THEN 5 WHEN 2006 THEN 6 WHEN 2007 THEN 7 WHEN 2008 THEN 8 WHEN 2009 THEN 9 WHEN 2010 THEN 10 WHEN 2011 THEN 11 WHEN 2012 THEN 12 WHEN 2013 THEN 13 WHEN 2014 THEN 14 END as team_n FROM sbht_rough_013115",
        // date: "SELECT the_geom_webmercator, date, yr, cartodb_id, job, CASE yr WHEN 2004 THEN 4 WHEN 2005 THEN 5 WHEN 2006 THEN 6 WHEN 2007 THEN 7 WHEN 2008 THEN 8 WHEN 2009 THEN 9 WHEN 2010 THEN 10 WHEN 2011 THEN 11 WHEN 2012 THEN 12 WHEN 2013 THEN 13 WHEN 2014 THEN 14 END as team_n FROM sbht_rough_013115",
        all: "SELECT * FROM sbht_rough_013115"
    },
    leafletDefaults: {
      tileLayer: 'http://tile.stamen.com/toner-lite/{z}/{x}/{y}.jpg',
      tileLayerOptions: {
          attribution: '&copy; <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCAQFjAA&url=http%3A%2F%2Fmaps.stamen.com%2F&ei=YASqVPOSJYWhyASky4CoBg&usg=AFQjCNH45Se7Q4ss_N_OiCN4Jqc-TXCk-w&sig2=LAfiRGpwSILDBDkeD6CoVA">Stamen Maps</a> contributors'
      },
      center: {
        lat: 22,
        lng: -77,
        zoom: 3
      },
      zoomControl: true
    },
    panels: [
      { hide: true, name: 'time', fa: 'clock-o'},
      { hide: true, name: 'employers', fa: 'users'},
      { hide: true, name: 'skills', fa: 'code'},
      { hide: true, name: 'list', fa: 'list-ul'},
      { hide: true, name: 'favorites', fa: 'star'}
    ]
  });
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
mapApp.service('cartoCss', function() {

  this.defaultTorque = function(){

    var defaultArray = [
      'Map {',
      '-torque-time-attribute: "yr";',
      '-torque-aggregation-function: "count(cartodb_id)";',
      '-torque-frame-count: 512;',
      '-torque-animation-duration: 30;',
      '-torque-resolution: 1;',
      '-torque-data-aggregation:cumulative;',
      '}',
      '#resume_subproj {',
        'marker-width: 6;',
        'marker-fill: #47A3FF;',
        'marker-fill-opacity: 0.8;',
        'comp-op: "source-over";',
      '}',
      '#resume_subproj[frame-offset = 1] { marker-width: 10; marker-fill-opacity: 0.05; }',
      '#resume_subproj[frame-offset = 2] { marker-width: 15; marker-fill-opacity: 0.02; }'
    ].join('\n');
    var defaultCss = defaultArray;
    return defaultCss;
  }

  this.date = function(){

    var cssArray = [
      'Map {',
        '-torque-time-attribute: "date";',
        '-torque-aggregation-function: "round(avg(team_n))";',
        '-torque-frame-count: 1024;',
        '-torque-animation-duration: 20;',
        '-torque-resolution: 2;',
        '-torque-data-aggregation:cumulative;',
      '}',
      '#resume_subproj {',
        'marker-width: 6;',
        'marker-fill: #47A3FF;',
        'marker-fill-opacity: 0.8;',
        'comp-op: "source-over";',
      '}',
      '#resume_subproj[frame-offset = 1] { marker-width: 10; marker-fill-opacity: 0.05; }',
      '#resume_subproj[frame-offset = 2] { marker-width: 15; marker-fill-opacity: 0.02; }'
    ];

    var i = 4,
      gradient = "",
      prefix = "#resume_subproj[value=",
      middle = "] { marker-fill: hsl(310, 68%, ",
      middleHue = "] { marker-fill: hsl(",
      lightness = 75,
      hue = 25,
      suffix = "%) }",
      suffixHue = ", 68%, 55%) }";

    while (i < 15) {
      lightness = lightness - 5;
      hue = hue + 25;
      // params = prefix + i + middle + lightness + suffix;
      params = prefix + i + middleHue + hue + suffixHue;
      cssArray.push(params);
      i++;
    }

    var dateCss = cssArray.join('\n');
    return dateCss;

  }

});