(function() {

    'use strict';

    FastClick.attach(document.body);

    angular
        .module('ctrlsModule', []);
    angular
        .module('mapModule', []);
    angular
        .module('layersModule', []);
    angular
        .module('panelsModule', []);
    angular
        .module('popupsModule', []);

    // angular
    //     .module('blank', [
    //         'ui.router',
    //     ])
    //     .controller('wtf',function(){
    //         alert('i really made a controller');
    //     }); 

    var mapApp = angular.module('mapApp', [
            // 'blank',
            'ctrlsModule',
            'mapModule',
            'panelsModule',
            'popupsModule',
            'layersModule',
            'ngAnimate',
            'ui.router',
        ]);

    mapApp
        .run(['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        // .config(['$stateProvider', '$urlRouterProvider', 'basePath', function($stateProvider, $urlRouterProvider, basePath) {
            function getAppPath(suffix){
                var scripts = document.getElementsByTagName("script"),
                    item,
                    basePath;
                for (var i = 0, len = scripts.length; i < len; i++) {
                    item = scripts[i];
                    if (item.src.indexOf('map-app') !== -1){
                        basePath = item.src;
                        var name = basePath.split('/').pop(); 
                        basePath = basePath.replace('/'+name,"");
                        break;
                    }
                }
                return basePath + suffix;
            }

            // Make these constants later...
            var queryPrefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT ',
                midString = 'WHERE cartodb_id = ';

            $urlRouterProvider.otherwise('/');

            $stateProvider                
                .state('home', {
                    url: '/',
                    template: '<div ui-view></div>',
                })
                .state('home.comm-poi', {
                    url: 'comm-poi/:id/:mile',
                    templateUrl: getAppPath('/popups/templates/comm-poi-template.html'),
                    controller: 'PopupCtrl',
                    resolve: {
                        features: ['$http', '$stateParams', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name, audio, video FROM comm_poi_master ',
                                query = queryPrefix + columns + midString + $stateParams.id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    }
                })
                .state('home.nps-poi', {
                    url: 'nps-poi/:id/:mile',
                    templateUrl: getAppPath('/popups/templates/nps-poi-template.html'),
                    controller: 'PopupCtrl',
                    resolve: {
                        features: ['$http', '$stateParams', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name FROM nps_poi_giscloud ',
                                query = queryPrefix + columns + midString + $stateParams.id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });


                        }],
                    }
                })
                .state('home.sbht-poi', {
                    url: 'sbht-poi/:id/:mile',
                    templateUrl: getAppPath('/popups/templates/sbht-poi-template.html'),
                    controller: 'PopupCtrl',
                    resolve: {
                        features: ['$http', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name FROM sbht_poi_digitize ',
                                query = queryPrefix + columns + midString + $stateParams.id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    }
                })
                .state('home.trail-pix', {
                    url: 'trail-pix/:id/:mile',
                    templateUrl: getAppPath('/popups/templates/trail-pix-template.html'),
                    controller: 'PopupCtrl',
                    resolve: {
                        features: ['$http', function($http) {
                            return $http.get('https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM trail_pix_digitize')
                                .then(function(response){
                                    return response.data;
                                });
                        }],
                    }
                });

        }]);

})();

(function() {

    'use strict';

    angular
        .module('mapApp')
        .value('cdbValues',{
            attribution: false,
            type: 'CartoDB',
            user_name: 'remcaninch',
            tiler_protocol: "https",
            tiler_domain: "cartodb.com",
            tiler_port: "443",
            sql_domain: "cartodb.com",
            sql_port: "443",
            sql_protocol: "https",
            sublayers: [
                {   // TRAIL
                    sql: "SELECT * FROM sbht",
                    cartocss: "#sbht{line-color:green;line-width:4;}",
                    interactivity: "cartodb_id, name",
                    name: "Sleeping Bear Heritage Trail",
                    route: "trail-pix",
                    table: 'sbht'
                },
                {   // GRADE
                    sql: "SELECT * FROM sbht_grade",
                    cartocss: "#sbht_grade{line-color: #000000;line-width: 5;line-dasharray: 2,3;}",
                    // interactivity: "cartodb_id, name, direction, grade",
                    name: "Grade",
                    route: "",
                    table: ''
                },
                {   // CAUTION
                    sql: "SELECT * FROM sbht_caution",
                    cartocss: "#sbht_caution{line-color:#F11810;line-width:5;}",
                    // interactivity: "cartodb_id, descrip, type",
                    name: 'Caution',
                    route: ""
                },
                {   // NPS POI
                    sql: "SELECT * FROM nps_poi_giscloud",
                    cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "cartodb_id, mile, name",
                    // interactivity: "cartodb_id, name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                    name: 'NPS POI',
                    route: "nps-poi",
                    table: 'nps_poi_giscloud'
                },
                {   // SBHT POI
                    sql: "SELECT * FROM sbht_poi_digitize",
                    cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "cartodb_id, name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                    name: 'SBHT POI',
                    route: "sbht-poi",
                    table: 'sbht_poi_digitize'
                },
                {   // COMM POI
                    sql: "SELECT * FROM comm_poi_master",
                    cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "cartodb_id, name, type, mile, name_id, season, x, y, sw_offset, ne_offset, descrip, video, audio, phone, addr_no, addr_name, addr_type, city, zip, email, website",
                    name: 'Commercial POI',
                    route: "comm-poi",
                    table: 'comm_poi_master'
                },
                {   // TRAIL PIX
                    sql: "SELECT * FROM trail_pix_digitize",
                    cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "cartodb_id, img_file, season",
                    name: 'Trail Pics',
                    route: "trail-pix",
                    table: 'trail_pix_digitize'
                }
            ]
            
        });

})();

(function() {

    'use strict';

    angular
        .module('mapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory'];

    function MapCtrl($scope, mapService, $rootScope, layersFactory){

        $rootScope.className = "map-container";

        alert('mapctrl called');
        function init(){
            layersFactory.addCdbLayer();
        }
        init();

    }

})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        // .directive('interactiveMap', interactiveMap);
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapService', '$rootScope', 'layersFactory'];

    function interactiveMap(mapService, $rootScope, layersFactory){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){
                
                function init(map){
                    layersFactory.addCdbLayer(mapService.createMap());
                }
                init();
            }
        };
        
    }

})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        .service('mapService', mapService);
        // .factory('mapService', mapService);

    // do this so you don't lose it during ugg...
    mapService.$inject = ['$rootScope', 'cdbValues'];

    function mapService($rootScope, cdbValues){

        this.tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
            // terrain: L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q', {
            //     attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a><a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
            // })
        };

        this.leafletDefaults = {
            
            attribution: false,
            center: [44.88652,-86.00544],
            zoom: 12,
            zoomControl: false,
            layers: this.tileLayers.terrain
            
        };

        this.map = {};

        this.createMap = function(yes){
            this.map = L.map('map', this.leafletDefaults);
            return this.map;
        }

        // $rootScope.testData = {};

        // return this;

    }


})();
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
(function() {

    'use strict';

    var playground = function(mapService, $rootScope, layersFactory){

        return {
            restrict: 'E',
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/layers/templates/layersTemplate.html',
            replace: true,
            // CAREFUL WITH MINIFICATION HERE, NOT SURE HOW THIS WORKS W/INTERNAL CTRLER!
            controller: function($scope, layersFactory){
            // controller: function($scope, layersFactory){
				            	
                // $scope.tableName = '';
                // $scope.customers = [];

                // function init() {
                //     layersFactory.getWeather()
                //         .success(function(customers) {
                //             $scope.customers = customers.rows;
                //         })
                //         .error(function(data, status, headers, config) {
                //             $log.log(data.error + ' ' + status);
                //         });
                // }
                
                // init();

                // $scope.$on('feature updated', function(event, e, pos, latlng, data, tableName, i) {
                   
                //    $scope.tableName = tableName[i].name;

                // });

            }
        };
        
    };

    playground.$inject = ['mapService', '$rootScope', 'layersFactory'];

    angular
        .module('mapApp')
        // .directive('interactiveMap', interactiveMap);
        .directive('playground', playground);

})();
(function() {

    'use strict';

    var layersFactory = function($rootScope, cdbValues, mapService, $q, $state, $http, $stateParams){

    	var layersFactory = {
    		tileLayers: {},
    		setCdbInteraction: {},
    		getFeatureInfo: {}
    	};

    	layersFactory.tileLayers = mapService.tileLayers;

    	layersFactory.addCdbLayer = function(map){

    	    cartodb.createLayer(map, cdbValues)
    	    .addTo(map)
    	    .on('done', function(layer){
    	        layersFactory.setCdbInteraction(map, layer);
    	    })
    	    .on('error', function() {
    	        console.log("could not add cdb layer");
    	    });
    	};

    	layersFactory.setCdbInteraction = function(map, layer){
    	    cdb.vis.Vis.addCursorInteraction(map, layer);
    	    var sublayers = layer.options.sublayers;
    	    var tableNameArr = [];
    	    for (var i = 0; i < sublayers.length; i++) {
    	        var sublayer = layer.getSubLayer(i);
    	        // layersFactory.sublayers.push(sublayer);
    	        sublayer.setInteraction(true);

    	        tableNameArr.push({
    	            name: sublayers[i].name,
    	            index: i,
                    route: sublayers[i].route,
                    table: sublayers[i].table
    	        });

    	        var newSub = layer.options.sublayers[i];
    	        // var newSub = layer.options.sublayers[this._position];
    	        var tableName = newSub.name;
    	        // var dataArray = layersFactory.getFeatureData(data, tableName);

    	        sublayer.on('featureClick', function(e, pos, latlng, data){
                    if (e){

                        var i = this._position,
                            thisTable = tableNameArr[i],
                            state = '';

                        if (thisTable.route){
                            state = 'home.' + thisTable.route;
                            $state.go(state, {
                                    id: data.cartodb_id,
                                    mile: data.mile,
                                }, {
                                    reload: true
                                }
                            );
                        }

                        layersFactory.getTableInfo(thisTable);

                    }                   

                });

            } // end for loop
        };

        layersFactory.getFeatureInfo = function() {

            var prefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM sbht';
            return $http.get(prefix);

        };

        layersFactory.getTableInfo = function(table) {

            var thisTable = table;
            $rootScope.$broadcast('feature updated', thisTable);
            $rootScope.table = thisTable.table;
            // $rootScope.$apply(function(){
            //     table = test.table;
            // });
            layersFactory.getFeatureInfo();

        };

    	return layersFactory;
    };

    angular
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    layersFactory.$inject = ['$rootScope', 'cdbValues', 'mapService', '$q', '$state', '$http', '$stateParams'];

})();
(function() {

    'use strict';

    var PopupCtrl = function($scope, layersFactory, $stateParams, $state, features){
        
        $scope.id = $stateParams.id;
        $scope.mile = $stateParams.mile;

        // $scope.sublayers = layersFactory.sublayers;

        $scope.features = features.rows[0];
        // debugger;

        $scope.$on('feature updated', function(event,data) {
            $scope.tableName = data;
        });

        // function init() {
        //     layersFactory.getFeatureInfo()
        //         .success(function(featureData) {
        //             $stateParams.id = featureData.rows[0].cartodb_id;
        //             $scope.featureData = featureData.rows;
        //         })
        //         .error(function(data, status, headers, config) {
        //             $log.log(data.error + ' ' + status);
        //         });
        // }
        
        // init();

	};

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'layersFactory', '$stateParams', '$state', 'features'];

})();
(function() {

    'use strict';

    var CtrlsCtrl = function($scope, ctrlsFactory){
        var vm = this;

        vm.zoomIn = function(){
            ctrlsFactory.zoomIn();
        };
        vm.zoomOut = function(){
            ctrlsFactory.zoomOut();
        };
        vm.zoomHome = function(){
            ctrlsFactory.zoomHome();
        };
        vm.locate = function(){
            ctrlsFactory.locate();
        };

        vm.fullScreen = function() {
            ctrlsFactory.fullScreen();
        };

        vm.executeFunctionByName = function(functionName, context /*, args */) {
            ctrlsFactory.executeFunctionByName(functionName, context /*, args */);
        };

        // $rootScope.$watch('data', function() {
        //     vm.data = $rootScope.data;
        // });

    };

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['$scope', 'ctrlsFactory'];

})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        // .module('ctrlsModule')
        .directive('mapControls', mapControls);

    function mapControls(){
        return {
            restrict: 'E',
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/ctrls/templates/ctrlsTemplate.html',
            controller: 'CtrlsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
//////*   ctrlsFactory.js   *//////
(function() {

    'use strict';

    angular
        .module('mapApp')
        // .module('ctrlsModule')
        .factory('ctrlsFactory', ctrlsFactory);

    // do this so you don't lose it during ugg...
    ctrlsFactory.$inject = ['mapService'];

    function ctrlsFactory(mapService){
        
        var ctrlsFactory = {};
        var map = mapService.map;

        ctrlsFactory.zoomIn = function(){
            map.zoomIn();
        };

        ctrlsFactory.zoomOut = function(){
            map.zoomOut();
        };

        ctrlsFactory.zoomHome = function(){
            var southWest = L.latLng(44.82641, -86.07977),
                northEast = L.latLng(44.94245, -85.93695),
                bounds = L.latLngBounds(southWest, northEast);
            map.fitBounds([
                [southWest],
                [northEast]
            ]);
        };

        ctrlsFactory.locate = function(){
            map.locate({
                setView: true,
                maxZoom: 13
            });
        };

        ctrlsFactory.executeFunctionByName = function(functionName, context /*, args */) {
            var args = [].slice.call(arguments).splice(2);
            var namespaces = functionName.split(".");
            var func = namespaces.pop();
            for(var i = 0; i < namespaces.length; i++) {
              context = context[namespaces[i]];
            }
            return context[func].apply(this, args);
        };

        /* FULLSCREEN */
        ctrlsFactory.fullScreen = function(){
            angular.element('#map-wrapper').toggleClass('fullscreen');
            map.invalidateSize();
            $('#map-wrapper')[0].scrollIntoView(true);
        };

        return ctrlsFactory;

    }


})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        // .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['$scope', 'panelsFactory', '$rootScope', 'mapService'];

    function PanelsCtrl($scope, panelsFactory, $rootScope, mapService){

    	var vm = this;

        vm.panelSwitchStatus = '';

        vm.panel = '';

        vm.changePanel = function(panel){
            
            if (vm.panel === panel){
                vm.panel = '';
            } else {
                vm.panel = panel;
            }
            
        };

        $scope.currentBaselayer = {
            name: 'terrain'
        };
        
        vm.changeTiles = panelsFactory.changeTiles;

    }

})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        // .module('panelsModule')
        .directive('panels', panels);

    // panels.$inject = ['$rootScope'];

    // function panels($rootScope){
    function panels(){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/panels/templates/panelsTemplate.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

	'use strict';

    angular
        .module('mapApp')
        // .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    // do this so you don't lose it during ugg...
    panelsFactory.$inject = ['mapService', '$rootScope'];

    function panelsFactory(mapService, $rootScope){

		var panelsFactory = {};

		var map = mapService.map;
		var tileLayers = mapService.tileLayers;

		panelsFactory.changeTiles = function(current) {
		    var layerName = current.toString();
			var newLayer = '',
				currentLayer = '';
			for (var key in tileLayers) {
				if (key === layerName){
					newLayer = key;
				} else {
					currentLayer = key;
				}
			}
    		map.removeLayer(tileLayers[currentLayer]);					
    		map.addLayer(tileLayers[newLayer]);
		    tileLayers[newLayer].bringToBack();
		};

		return panelsFactory;

    }


})();
// (function() {

//     'use strict';

//     angular.module('mapApp')
//         .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//         // .config(['$stateProvider', '$urlRouterProvider', 'basePath', function($stateProvider, $urlRouterProvider, basePath) {
//             function getAppPath(suffix){
//                 var scripts = document.getElementsByTagName("script"),
//                     item,
//                     basePath;
//                 for (var i = 0, len = scripts.length; i < len; i++) {
//                     item = scripts[i];
//                     if (item.src.indexOf('map-app') !== -1){
//                         basePath = item.src;
//                         var name = basePath.split('/').pop(); 
//                         basePath = basePath.replace('/'+name,"");
//                         break;
//                     }
//                 }
//                 return basePath + suffix;
//             }

//             $urlRouterProvider.otherwise('/');

//             $stateProvider
                
//                 // HOME STATES AND NESTED VIEWS ========================================
//                 .state('home', {
//                     url: '/',
//                     template: '',
//                     // templateUrl: getAppPath('/config/homeTemplate.html'),
//                     // controller: function($stateParams){
//                     // }
//                 })
//                 .state('comm-poi', {
//                     url: 'comm-poi/:',
//                     templateUrl: getAppPath('/popups/templates/comm-poi-template.html'),
//                     // controller: function($scope, $stateParams, $state){
//                     //     $scope.customers = [];
//                     //     $scope.customer = null;

//                     //     function init() {
//                     //         layersFactory.getWeather()
//                     //             .success(function(customers) {
//                     //                 $scope.customers = customers.rows;
//                     //             })
//                     //             .error(function(data, status, headers, config) {
//                     //                 $log.log(data.error + ' ' + status);
//                     //             });
//                     //     }
                        
//                     //     init();
//                     // }
//                 })
//                 .state('nps-poi', {
//                     url: 'nps-poi',
//                     templateUrl: getAppPath('/popups/templates/nps-poi-template.html'),
//                     controller: function($scope, $stateParams, $state){
//                         // debugger;
//                         $scope.cartodb_id = 2;
//                         $stateParams.cartodb_id = $scope.cartodb_id;
//                     }
//                 })
//                 .state('sbht-poi', {
//                     url: 'sbht-poi',
//                     templateUrl: getAppPath('/popups/templates/sbht-poi-template.html'),
//                 })
//                 .state('trail-pix', {
//                     url: 'trail-pix',
//                     templateUrl: getAppPath('/popups/templates/trail-pix-template.html'),
//                 });

//             // $locationProvider.html5Mode({
//             //   enabled: true,
//             //   requireBase: false,
//             //   rewriteLinks: true
//             // });
//             // $locationProvider.hashPrefix('!');

//         }]);

// })();

