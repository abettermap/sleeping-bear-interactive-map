// mapApp.controller("popupCtrl", [ "$scope", function($scope) {

// 	$scope.getFeaturesByParent = function(parent) {
// 	  var sql = new cartodb.SQL({ user: 'travelampel' }),
// 	    queryString = "SELECT * FROM resume_map_subprojects WHERE parent = '"
// 	      + parent
// 	      + "'";
// 	  // sql.execute("SELECT * FROM resume_map_subprojects WHERE parent = 'cbg1'")
// 	  sql.execute(queryString)
// 	    .done(function(data) {
// 	      console.log(data.rows);
// 	    })
// 	    .error(function(errors) {
// 	      // errors contains a list of errors
// 	      console.log("errors:" + errors);
// 	    })

// 	  sql.getBounds(queryString).done(function(bounds) {
// 	    leafletData.getMap().then(function(map) {
// 	      map.fitBounds(bounds, {
// 	        // padding: [5, 5]
// 	        // animate: true,
// 	        pan: {
// 	          duration: 4,
// 	          animate: true
// 	        }
// 	      });
// 	    });
// 	  });

// var LayerActions = {
//   all: function(){
//     sublayers[0].setSQL("SELECT * FROM ne_10m_populated_p_2");
//     return true;
//   },
//   capitals: function(){
//     sublayers[0].setSQL("SELECT * FROM ne_10m_populated_p_2 WHERE featurecla = 'Admin-0 capital'");
//     return true;
//   },
//   megacities: function(){
//     sublayers[0].setSQL("SELECT * FROM ne_10m_populated_p_2 WHERE megacity = 1");
//     return true;
//   }
// }

// cartodb.createLayer(map, cartodbParams)
// .addTo(map)
// .on('done', function(layer) {
//   var sublayer = layer.getSubLayer(0);
//   sublayer.setInteraction(true);
//   // cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['cartodb_id']);
//   sublayer.on('featureClick', function(e, pos, latlng, data) {
//     scope.$apply("centerMap()");
//     // var sql = new cartodb.SQL({ user: 'travelampel' }),
//     //   featId = data.cartodb_id,
//     //   queryString = "SELECT * FROM subprojects WHERE cartodb_id = " + featId;

//     // sql.execute(queryString)
//     //   .done(function(data) {
//     //     console.log(data.rows);

//     //   })
//     //   .error(function(errors) {
//     //     // errors contains a list of errors
//     //     console.log("errors:" + errors);
//     //   })


// }]);
// mapApp.service('cartoCss', function() {

//   this.defaultTorque = function(){

//     var defaultArray = [
//       'Map {',
//       '-torque-time-attribute: "yr";',
//       '-torque-aggregation-function: "count(cartodb_id)";',
//       '-torque-frame-count: 512;',
//       '-torque-animation-duration: 30;',
//       '-torque-resolution: 1;',
//       '-torque-data-aggregation:cumulative;',
//       '}',
//       '#resume_subproj {',
//         'marker-width: 6;',
//         'marker-fill: #47A3FF;',
//         'marker-fill-opacity: 0.8;',
//         'comp-op: "source-over";',
//       '}',
//       '#resume_subproj[frame-offset = 1] { marker-width: 10; marker-fill-opacity: 0.05; }',
//       '#resume_subproj[frame-offset = 2] { marker-width: 15; marker-fill-opacity: 0.02; }'
//     ].join('\n');
//     var defaultCss = defaultArray;
//     return defaultCss;
//   }

//   this.date = function(){

//     var cssArray = [
//       'Map {',
//         '-torque-time-attribute: "date";',
//         '-torque-aggregation-function: "round(avg(team_n))";',
//         '-torque-frame-count: 1024;',
//         '-torque-animation-duration: 20;',
//         '-torque-resolution: 2;',
//         '-torque-data-aggregation:cumulative;',
//       '}',
//       '#resume_subproj {',
//         'marker-width: 6;',
//         'marker-fill: #47A3FF;',
//         'marker-fill-opacity: 0.8;',
//         'comp-op: "source-over";',
//       '}',
//       '#resume_subproj[frame-offset = 1] { marker-width: 10; marker-fill-opacity: 0.05; }',
//       '#resume_subproj[frame-offset = 2] { marker-width: 15; marker-fill-opacity: 0.02; }'
//     ];

//     var i = 4,
//       gradient = "",
//       prefix = "#resume_subproj[value=",
//       middle = "] { marker-fill: hsl(310, 68%, ",
//       middleHue = "] { marker-fill: hsl(",
//       lightness = 75,
//       hue = 25,
//       suffix = "%) }",
//       suffixHue = ", 68%, 55%) }";

//     while (i < 15) {
//       lightness = lightness - 5;
//       hue = hue + 25;
//       // params = prefix + i + middle + lightness + suffix;
//       params = prefix + i + middleHue + hue + suffixHue;
//       cssArray.push(params);
//       i++;
//     }

//     var dateCss = cssArray.join('\n');
//     return dateCss;

//   }

// });
// angular.module("tripRiskApp").directive("leafletMap", ["$rootScope", "$templateCache", "CartoDBService", "AppConfig", "LeafletService", "NokiaService", function(a, b, c, d, e, f) {
//         return {replace: !0,restrict: "E",transclude: !0,template: b.get("leaflet-map-template.html"),link: function(b, e) {
//                 var map = L.map(e[0]).setView(d.vicDefaultMapLocation, 12);
//                 map.addLayer(c.createTileLayer(d.baseTileUrl));
//                 var h = cartodb.createLayer(g, {user_name: "geoplex",type: "cartodb",cartodb_logo: !1,sublayers: [{sql: "SELECT COUNT(*) as accident_count, SUM(no_of_vehicles) as no_of_vehicles, SUM(bike) as bike, SUM(pedestrian) as pedestrian, SUM(no_persons_killed) as no_persons_killed, SUM(no_persons) as no_persons, MAX(cartodb_id) as cartodb_id, the_geom_webmercator FROM " + d.accidents + " WHERE 1 = 2",cartocss: d.carAccidentCSS,interactivity: "cartodb_id, accident_count, no_of_vehicles, no_persons_killed, no_persons, bike, pedestrian"}]});
//                 h.addTo(map).on("done", function(c) {
//                     function e(a) {
//                         var c = a.coords.latitude, e = a.coords.longitude, h = f.reverseGeocode(c, e);
//                         h.then(function(a) {
//                             var f = a.Response.View[0].Result[0].Location.Address.State;
//                             "VIC" === f ? (b.userLocation = [c, e], console.log("In Victoria"), map.setView([c, e], 15), L.circle([c, e], 5).addTo(map).bindPopup("Your Location")) : (map.setView(d.vicDefaultMapLocation, 12), $("#locationModel").foundation("reveal", "open"), console.log("Not in Victoria"))
//                         })
//                     }
//                     function h() {
//                         return ""
//                     }
//                     map.cartoDbLayer = c, c.getSubLayer(0).setSQL("SELECT * FROM " + d.accidents + " WHERE 1 = 2");
//                     var i = c.getSubLayer(0);
//                     i.setInteraction(!0);
//                     var j = L.popup();
//                     map.popup = j, i.on("featureClick", function(a, pos, c, data) {
//                         j.setLatLng(pos), j.setContent("<h5>Location Details</h5><p>Crashes:  <b> " + data.accident_count + " </b><br>Vehicles:  <b>" + data.no_of_vehicles + " </b><br>Persons:  <b>" + data.no_persons + " </b><br>Fatalities:  <b>" + data.no_persons_killed + " </b></p>"), j.addTo(map), j.openOn(map)
//                     }), "geolocation" in navigator && navigator.geolocation.getCurrentPosition(e, h), map.on("click", function(b) {
//                         a.$broadcast("MAP_CLICK_EVENT", b)
//                     })
//                 }), a.map = g
//             }}
//     }])


    // vm.executeFunctionByName = function(functionName, context /*, args */) {
    //     ctrlsFactory.executeFunctionByName(functionName, context /*, args */);
    // };

            // function getAppPath(suffix){
            //     var scripts = document.getElementsByTagName("script"),
            //         item,
            //         basePath;
            //     for (var i = 0, len = scripts.length; i < len; i++) {
            //         item = scripts[i];
            //         if (item.src.indexOf('map-app') !== -1){
            //             basePath = item.src;
            //             var name = basePath.split('/').pop();
            //             basePath = basePath.replace('/'+name,"");
            //             break;
            //         }
            //     }
            //     return basePath + suffix;
            // }

