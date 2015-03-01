// (function() {

//     'use strict';

//     var LayersCtrl = function($scope, mapService, $rootScope, layersFactory){

//     	$scope.sublayers = layersFactory.sublayers;

//     	var user = layersFactory.getFeatureInfo();

//     	// if you don't want to expose the actual object in your scope you could expose just the values, or derive a value for your purposes
//     	 $scope.name = user.firstname + ' ' +user.lastname;

//     	 $scope.$on('user:updated', function(event,data) {
//     	   console.log(data);
//     	   $scope.name = user.firstname + ' ' + user.lastname;
//     	 });
//          console.log("asdfjlkjjkljkll");
//          var makePromiseWithSon = function() {
//              // This service's function returns a promise, but we'll deal with that shortly
//              layersFactory.getWeather()
//                  // then() called when son gets back
//                  .then(function(data) {
//                      // promise fulfilled
//                      if (data.rows[0].name==='Parking Test Point') {
//                          alert("yes");
//                      } else {
//                          alert("nah");
//                      }
//                  }, function(error) {
//                      // promise rejected, could log the error with: console.log('error', error);
//                      alert("ayo nayo");
//                  });
//          };

// 	}; 

// 	LayersCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory'];

// 	angular
// 	    // .module('layersModule')
//         .module('mapApp')
// 	    // .module('layersModule')
// 	    .controller('LayersCtrl', LayersCtrl);


// })();