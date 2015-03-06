(function() {

    'use strict';

    FastClick.attach(document.body);

    angular
        .module('ctrlsModule', []);
    angular
        .module('layersModule', []);
    angular
        .module('panelsModule', []);
    angular
        .module('popupsModule', []);

    function getBasePath(suffix){

        var path = '';

        if (window.host === 'friendsofsleepingbear.org'){
            path = window.location.origin + '/wp-content/plugins/wp-fosb-map/src/' + suffix;
        } else {
            path = window.location.origin + '/fosb/wp-content/plugins/wp-fosb-map/src/' + suffix;
        }
        return path;

    }

    angular
        .module('basePathModule',[])
        .constant('basePath',{
            url: getBasePath
        });

    angular.module('mapApp', [
            'basePathModule',
            'ctrlsModule',
            'panelsModule',
            'popupsModule',
            'layersModule',
            'ngAnimate',
            'ui.router',
        ])
        .run(['$rootScope', '$state', '$stateParams', '$location',
            function ($rootScope, $state, $stateParams, $location) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);

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
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht",
                    cartocss: "#sbht{line-color:green;line-width:4;}",
                    interactivity: 'cartodb_id',
                    route: 'trail-pix',
                    table: 'sbht'
                },
                {   // GRADE
                    sql: "SELECT the_geom_webmercator FROM sbht_grade",
                    cartocss: "#sbht_grade{line-color: #000000;line-width: 5;line-dasharray: 2,3;}",
                    route: '',
                    table: ''
                },
                {   // CAUTION
                    sql: "SELECT the_geom_webmercator FROM sbht_caution",
                    cartocss: "#sbht_caution{line-color:#F11810;line-width:5;}",
                    route: ''
                },
                {   // FEATURES
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM features",
                    cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: 'cartodb_id',
                    route: 'nps-poi',
                    table: 'nps_poi_giscloud'
                },
                {   // COMMERCIAL
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM comm_poi_master",
                    cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: 'cartodb_id',
                    route: 'comm-poi',
                    table: 'comm_poi_master'
                },
                // {   // TRAIL PIX
                //     sql: "SELECT the_geom_webmercator, cartodb_id FROM trail_pix_digitize",
                //     cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                //     interactivity: 'cartodb_id',
                //     route: 'trail-pix',
                //     table: 'trail_pix_digitize'
                // },
                // {   // NPS POI
                //     sql: "SELECT the_geom_webmercator, cartodb_id FROM nps_poi_giscloud",
                //     cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                //     interactivity: 'cartodb_id',
                //     route: 'nps-poi',
                //     table: 'nps_poi_giscloud'
                // },
                // {   // SBHT POI
                //     sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht_poi_digitize",
                //     cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                //     interactivity: 'cartodb_id',
                //     route: 'sbht-poi',
                //     table: 'sbht_poi_digitize'
                // },
            ]

        });

})();

(function() {

    'use strict';

    angular
        .module('mapApp')
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapFactory', 'layersFactory'];

    function interactiveMap(mapFactory, layersFactory){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){

                function init(){
                    mapFactory.createMap();
                    layersFactory.addCdbLayer(mapFactory.map);
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
        .factory('mapFactory', mapFactory);

    mapFactory.$inject = ['cdbValues'];

    function mapFactory(cdbValues){

        var map = {};

        var tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
            // terrain: L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q', {
            //     attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a><a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
            // })
        };

        var leafletDefaults = {
            
            attribution: false,
            center: [44.88652,-86.00544],
            zoom: 12,
            zoomControl: false,
            layers: tileLayers.terrain
            
        };

        var mapFactory = {
            createMap: createMap,
            map: map,
            leafletDefaults: leafletDefaults,
            tileLayers: tileLayers,
        };

        function createMap(){
            mapFactory.map = L.map('map', leafletDefaults);
            return mapFactory.map;
        }

        return mapFactory;

    }

})();
(function() {

    'use strict';

    angular
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    layersFactory.$inject = ['popupFactory', 'cdbValues', 'mapFactory', '$state', '$stateParams'];

    function layersFactory(popupFactory, cdbValues, mapFactory, $state, $stateParams){

    	var layersFactory = {
            addCdbLayer: addCdbLayer,
    		setCdbInteraction: setCdbInteraction,
    	};

    	function addCdbLayer(map){

    	    cartodb.createLayer(map, cdbValues)
    	    .addTo(map)
    	    .on('done', function(layer){
    	        setCdbInteraction(map, layer);
    	    })
    	    .on('error', function() {
    	        console.log("Ayo nayo! Could not add cdb layer");
    	    });

    	};

    	function setCdbInteraction(map, layer){
    	    cdb.vis.Vis.addCursorInteraction(map, layer);
    	    var sublayers = layer.options.sublayers;
    	    var tableNameArr = [];
    	    for (var i = 0; i < sublayers.length; i++) {

    	        // layersFactory.sublayers.push(sublayer);
    	        // var newSub = layer.options.sublayers[i];
    	        // var newSub = layer.options.sublayers[this._position];

                var sublayer = layer.getSubLayer(i);
                sublayer.setInteraction(true);

                tableNameArr.push({
                    index: i,
                    route: sublayers[i].route,
                    table: sublayers[i].table
                });

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

                        popupFactory.getTableInfo(thisTable);
          
                    }                   

                });

            } // end for loop
        };

    	return layersFactory;
    };

})();
(function() {

    'use strict';

    var playground = function(mapFactory, $rootScope, layersFactory){

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

    playground.$inject = ['mapFactory', '$rootScope', 'layersFactory'];

    angular
        .module('mapApp')
        // .directive('interactiveMap', interactiveMap);
        .directive('playground', playground);

})();
(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', '$stateParams', 'features'];

    function PopupCtrl($scope, $stateParams, features){

        var vm = this;

        vm.id = $stateParams.id;
        vm.mile = $stateParams.mile;

        vm.features = features.rows[0];
        vm.tableName = null;

    }

})();


// vm.sublayers = layersFactory.sublayers;

// $scope.$on('feature updated', function(event,data) {
//     vm.tableName = data;
// });

// PROMISES, not sure if needed, seems to be fine without
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

(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope'];

    function popupFactory($rootScope){

        popupFactory.getTableInfo = function(table) {

            var thisTable = table;

            $rootScope.$broadcast('feature updated', thisTable);

        };

    	return popupFactory;
    };

})();



// popupFactory.getFeatureInfo = function() {

//     var prefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM sbht';

//     return $http.get(prefix);

// };
(function() {

    'use strict';

    angular.module('mapApp')
        .config(['$stateProvider', '$urlRouterProvider', 'basePath', function($stateProvider, $urlRouterProvider, basePath) {

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
                    templateUrl: basePath.url('app/popups/templates/comm-poi-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
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
                    templateUrl: basePath.url('app/popups/templates/nps-poi-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
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
                    templateUrl: basePath.url('app/popups/templates/sbht-poi-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
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
                    templateUrl: basePath.url('app/popups/templates/trail-pix-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
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
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['ctrlsFactory', 'basePath'];

    function CtrlsCtrl(ctrlsFactory, basePath){

        var vm = this;

        vm.svgPath = basePath.url;

        vm.fullScreen = ctrlsFactory.fullScreen;

        vm.locate = ctrlsFactory.locate;

        vm.zoomHome = ctrlsFactory.zoomHome;

        vm.zoomIn = ctrlsFactory.zoomIn;

        vm.zoomOut = ctrlsFactory.zoomOut;

    }

})();

(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .directive('mapControls', mapControls);

    mapControls.$inject = ['basePath'];

    function mapControls(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/ctrls/templates/ctrlsTemplate.html'),
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
        .module('ctrlsModule')
        .factory('ctrlsFactory', ctrlsFactory);

    // do this so you don't lose it during ugg...
    ctrlsFactory.$inject = ['mapFactory'];

    function ctrlsFactory(mapFactory){
        
        var map = mapFactory.map;

        var ctrlsFactory = {
            fullScreen: fullScreen,
            locate: locate,
            zoomHome: zoomHome,
            zoomIn: zoomIn,
            zoomOut: zoomOut,
        };

        function zoomIn(){
            map.zoomIn();
        }

        function zoomOut(){
            map.zoomOut();
        }

        function zoomHome(){
            var southWest = L.latLng(44.82641, -86.07977),
                northEast = L.latLng(44.94245, -85.93695),
                bounds = L.latLngBounds(southWest, northEast);
            map.fitBounds([
                [southWest],
                [northEast]
            ]);
        }

        function locate(){
            map.locate({
                setView: true,
                maxZoom: 13
            });
        }

        function fullScreen(){
            angular.element('#map-wrapper').toggleClass('fullscreen');
            map.invalidateSize();
            $('#map-wrapper')[0].scrollIntoView(true);
        }

        // ctrlsFactory.executeFunctionByName = function(functionName, context /*, args */) {
        //     var args = [].slice.call(arguments).splice(2);
        //     var namespaces = functionName.split(".");
        //     var func = namespaces.pop();
        //     for(var i = 0; i < namespaces.length; i++) {
        //       context = context[namespaces[i]];
        //     }
        //     return context[func].apply(this, args);
        // };

        return ctrlsFactory;

    }


})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelBaselayers', panelBaselayers);

    panelBaselayers.$inject = ['basePath'];

    function panelBaselayers(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.baselayers.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelLegend', panelLegend);

    panelLegend.$inject = ['basePath'];

    function panelLegend(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.legend.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelPoi', panelPoi);

    panelPoi.$inject = ['basePath'];

    function panelPoi(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.poi.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelSeasons', panelSeasons);

    panelSeasons.$inject = ['basePath'];

    function panelSeasons(basePath){
        return {
            restrict: 'E',
            templateUrl: basePath.url('app/panels/templates/panel.seasons.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory'];

    function PanelsCtrl(panelsFactory){

    	var vm = this;
        vm.season = 'summer';
        vm.changeTiles = panelsFactory.changeTiles;
        vm.panel = '';
        vm.currentBase = {
            name: 'terrain'
        };
        vm.changePanel = function(panel){

            if (vm.panel === panel){
                vm.panel = '';
            } else {
                vm.panel = panel;
            }

        };

    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panels', panels);

    panels.$inject = ['basePath'];

    function panels(basePath){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: basePath.url('app/panels/templates/panelsTemplate.html'),
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['mapFactory'];

    function panelsFactory(mapFactory){

		var map = mapFactory.map,
			tileLayers = mapFactory.tileLayers;

		var panelsFactory = {
			changeTiles: changeTiles
		};

		function changeTiles(current) {

		    var layerName = current.toString(),
				newLayer = '',
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