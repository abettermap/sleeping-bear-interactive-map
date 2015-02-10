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