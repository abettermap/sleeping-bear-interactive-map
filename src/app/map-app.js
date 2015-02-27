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


    angular
        .module('mapApp', [
            'ctrlsModule',
            'mapModule',
            'panelsModule',
            'popupsModule',
            'ui.router'
        ])
        .run(['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);
    // angular
    //     .module('basePathModule',['ui.router'])
    //     .constant('basePath',{
    //         url: ''
    //     });



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
                    interactivity: "name",
                    name: "Sleeping Bear Heritage Trail",
                    id: "trail-pic"
                },
                {   // GRADE
                    sql: "SELECT * FROM sbht_grade",
                    cartocss: "#sbht_grade{line-color: #000000;line-width: 5;line-dasharray: 2,3;}",
                    interactivity: "name, direction, grade",
                    name: "Grade",
                    id: "grade"
                },
                {   // CAUTION
                    sql: "SELECT * FROM sbht_caution",
                    cartocss: "#sbht_caution{line-color:#F11810;line-width:5;}",
                    interactivity: "descrip, type",
                    name: 'Caution',
                    id: "caution"
                },
                {   // NPS POI
                    sql: "SELECT * FROM nps_poi_giscloud",
                    cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "name",
                    // interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                    name: 'NPS POI',
                    id: "nps-poi"
                },
                {   // SBHT POI
                    sql: "SELECT * FROM sbht_poi_digitize",
                    cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                    name: 'SBHT POI',
                    id: "sbht-poi"
                },
                {   // COMM POI
                    sql: "SELECT * FROM comm_poi_master",
                    cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "name, type, mile, name_id, season, x, y, sw_offset, ne_offset, descrip, video, audio, phone, addr_no, addr_name, addr_type, city, zip, email, website",
                    name: 'Commercial POI',
                    id: "comm-poi"
                },
                {   // TRAIL PIX
                    sql: "SELECT * FROM trail_pix_digitize",
                    cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "img_file, season",
                    name: 'Trail Pics',
                    id: "trail-pix"
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

        // console.log($location);

        $rootScope.className = "map-container";

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

        $rootScope.testData = {};

        // return this;

    }


})();
(function() {

    'use strict';

    angular
        // .module('layersModule')
        .module('layersModule')
        .controller('LayersCtrl', LayersCtrl);

    LayersCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory'];

    function LayersCtrl($scope, mapService, $rootScope, layersFactory){

    	$scope.sublayers = layersFactory.sublayers;

	}

})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('layersFactory', layersFactory);

    // do this so you don't lose it during ugg...
    layersFactory.$inject = ['$rootScope', 'cdbValues', 'mapService'];

    function layersFactory($rootScope, cdbValues, mapService){

    	var layersFactory = {
    		tileLayers: {},
    		setCdbInteraction: {},
    		getFeatureInfo: {}
    	};

    	// var map = mapService.map;

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

    	layersFactory.getFeatureInfo = function(e, pos, latlng, data, tableName, i) {

    	    $rootScope.$apply(function() {
    	        $rootScope.tableName = tableName[i].name;
                $rootScope.data = data;
    	        $rootScope.name = data.name;
                console.log($rootScope.name);

    	    });
    	    
    	};

    	layersFactory.sublayers = [];
    	
    	layersFactory.setCdbInteraction = function(map, layer){
    	    cdb.vis.Vis.addCursorInteraction(map, layer);
    	    var sublayers = layer.options.sublayers;
    	    // debugger;
    	    var tableNameArr = [];
    	    for (var i = 0; i < sublayers.length; i++) {
                // for (var i = 0; i < Things.length; i++) {
                //     Things[i]
                // };
    	        var sublayer = layer.getSubLayer(i);
    	        layersFactory.sublayers.push(sublayer);
    	        sublayer.setInteraction(true);

    	        tableNameArr.push({
    	            name: sublayers[i].name,
    	            index: i
    	        });

    	        var newSub = layer.options.sublayers[i];
    	        // var newSub = layer.options.sublayers[this._position];
    	        // debugger;
    	        var tableName = newSub.name;
    	        // var dataArray = layersFactory.getFeatureData(data, tableName);

    	        // sublayer.on('featureClick', layersFactory.featureClick(pos, latlng, data));
    	        sublayer.on('featureClick', function(e, pos, latlng, data){
		            if (e){
		                var i = this._position;
		                layersFactory.getFeatureInfo(e, pos, latlng, data, tableNameArr, i);
		            }    	        	

    	        });

    	    } // end for loop
    	};

    	return layersFactory;
    };

})();
(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory'];

    function PopupCtrl($scope, mapService, $rootScope, layersFactory){

    	$scope.sublayers = layersFactory.sublayers;
        var vm = this;
        vm.data = layersFactory.getFeatureInfo;
        $scope.$watch('vm.data', function(){
            alert('things change');
        });

    	var vm = this;

    	vm.dataArray = function(){
    	    var hey = Object.keys(data).map(function(key){
    	        var result = {
    	            key: key,
    	            data: data[key]
    	        };
    	        return result;
    	    });
    	    return hey;
    	}; 

    	vm.getFeatureData = function(data, tableName){
    	    console.log("passed");
    	    if (!data){
    	        return "";
    	    } else {
    	        return dataArray();
    	    }
    	};
        // console.log("mapService.map._container");
        vm.container = mapService.map._container;
        // vm.container = mapService.map._container.id;
        // $scope.$watch('vm.container',function(){
        //     console.log(vm.container);
        // });
    	//     // $scope.$on('$viewContentLoaded', function(){
    	//     //   hey();
    	//     // });
    	//     // $scope.$watch("traildata.name", function (zoom) {
    	//     //     console.log("things happenin");
    	//     // });


	}

})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['$scope', 'ctrlsFactory', '$rootScope'];

    function CtrlsCtrl($scope, ctrlsFactory, $rootScope){
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

        // vm.ctrls = [
        //     {
        //         name: '+',
        //         fn: 'zoomIn',
        //         id: '#icon-zoom-in'
        //     },
        //     {
        //         name: '-',
        //         fn: 'zoomOut',
        //         id: '#icon-zoom-out'
        //     },
        //     {
        //         name: 'home',
        //         fn: 'zoomHome',
        //         id: '#icon-zoom-home'
        //     },
        //     {
        //         name: 'GPS',
        //         fn: 'locate',
        //         id: '#icon-locate'
        //     },
        //     {
        //         name: 'full',
        //         fn: 'fullScreen',
        //         id: '#icon-enable-full'
        //     }
        // ];


        // $rootScope.$watch('data', function() {
        //     vm.data = $rootScope.data;
        // });

    }

})();
(function() {

    'use strict';

    angular
        .module('ctrlsModule')
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
        .module('ctrlsModule')
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
        .module('panelsModule')
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
        .module('panelsModule')
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
        .module('panelsModule')
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
(function() {

    'use strict';

    angular.module('mapApp')
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

            $urlRouterProvider.otherwise('/');

            $stateProvider
                
                // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/',
                    templateUrl: getAppPath('/config/homeTemplate.html'),
                    // controller: PopupCtrl
                })
                .state('home.comm', {
                    url: 'comm-poi',
                    templateUrl: getAppPath('/popups/templates/comm-poi-template.html')
                })
                .state('home.nps', {
                    url: '/nps-poi/{name}',
                    templateUrl: getAppPath('/popups/templates/nps-poi-template.html'),
                    controller: function($stateParams){
                       $stateParams.contactId  //*** Exists! ***//
                    }
                })
                .state('home.sbht', {
                    url: 'sbht-poi',
                    templateUrl: getAppPath('/popups/templates/sbht-poi-template.html'),
                })
                .state('home.trail-pix', {
                    url: 'trail-pix',
                    templateUrl: getAppPath('/popups/templates/trail-pix-template.html'),
                });

            // $locationProvider.html5Mode({
            //   enabled: true,
            //   requireBase: false,
            //   rewriteLinks: true
            // });
            // $locationProvider.hashPrefix('!');

        }]);

})();

