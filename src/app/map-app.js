(function() {

    'use strict';

    angular
        .module('mapApp', [
            'ngRoute',
            'mapModule'//,
            // 'mapFactory'
            // 'mapModuleFactory'
            // 'popupModule',
            // 'ctrlModule',
            // 'panelModule'
        ])
        .run(function($rootScope) {
        });

})();
(function() {

    'use strict';

    angular
        .module('mapModule', []);

})();
(function() {

    angular
        .module('mapModule')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'mapFactory', '$rootScope'];

    function MapCtrl($scope, mapFactory, $rootScope){

        var vm = this;

        vm.map = mapFactory.map;
        vm.mapDefaults = mapFactory.mapDefaults;

        cartodb.createLayer(vm.map, vm.mapDefaults.cartodb)
        .addTo(vm.map)
        .on('done', function(layer) {
            cdb.vis.Vis.addCursorInteraction(vm.map, layer);
            var sublayers = layer.options.sublayers;
            var tableNameArr = [];
            for (var i = sublayers.length - 1; i >= 0; i--) {

                var sublayer = layer.getSubLayer(i);
                sublayer.setInteraction(true);

                tableNameArr.push({
                    tablename: sublayers[i].name,
                    index: i
                });

                // sublayer.on('featureClick', mapFactory.featureClick(e, pos, latlng, data));
                sublayer.on('featureClick', function(e, pos, latlng, data) {
                    $rootScope.$apply(function() {
                        $rootScope.data = data;
                    });
                     // mapFactory.featureClick(data);
                    // mapFactory.setProperty(data.name);
                    // var newSub = layer.options.sublayers[this._position]
                    // var tableName = newSub.name;
                    // var dataArray = vm.getFeatureData(data, tableName);
                    // $scope.$apply(function() {
                    //     vm.featureData = {
                    //         name: tableName,
                    //         data: dataArray
                    //     }
                    // });
                });


            };
        }).on('error', function() {
            console.log("some error occurred");
        });

        vm.getFeatureData = function(data, tableName){
            console.log("passed");
            if (!data){
                return "";
            } else {
                function dataArray(){
                    var hey = Object.keys(data).map(function(key){
                        var result = {
                            key: key,
                            data: data[key]
                        }
                        return result;
                    });
                    return hey;
                }
                return dataArray();
            }
        }

        //     // $scope.$on('$viewContentLoaded', function(){
        //     //   hey();
        //     // });
        //     // $scope.$watch("traildata.name", function (zoom) {
        //     //     console.log("things happenin");
        //     // });

        //     // $scope.$watch("centroid.lng", function (zoom) {
        //     //     $scope.zoomLev = zoom;
        //     // });

    }

})();
(function() {

    angular
        .module('mapModule')
        .directive('interactiveMap', interactiveMap);

    function interactiveMap(){
        return {
            restrict: 'E',
            template: '<div id="map"></div>',
            controller: 'MapCtrl',
            controllerAs: 'vm',
            replace: true
        }
    }

})();
(function() {

    angular
        .module('mapApp')
        // .module('mapModuleFactory')
        .factory('mapFactory', mapFactory);

    function mapFactory($rootScope){

        var mapFactory = {}

        mapFactory.mapDefaults = {
            cartodb: {
                type: 'CartoDB',
                user_name: 'remcaninch',
                tiler_protocol: "https",
                tiler_domain: "cartodb.com",
                tiler_port: "443",
                sql_domain: "cartodb.com",
                sql_port: "443",
                sql_protocol: "https",
                sublayers: [
                    {   // TRAIL FOR NOW
                        sql: "SELECT * FROM sbht_temp",
                        cartocss: "#sbht_temp{line-color:green;line-width:4;}",
                        interactivity: "name",
                        name: "Sleeping Bear Heritage Trail",
                        id: "sbht"
                    },
                    {   // GRADE FOR NOW
                        sql: "SELECT * FROM sbht_grade_temp",
                        cartocss: "#sbht_grade_temp{line-color: #000000;line-width: 5;line-dasharray: 2,3;}",
                        interactivity: "name, direction, grade",
                        name: "Grade",
                        id: "grade"
                    },
                    {   // CAUTION FOR NOW
                        sql: "SELECT * FROM sbht_caution_temp",
                        cartocss: "#sbht_caution_temp{line-color:#F11810;line-width:5;}",
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
                        id: "nps_poi"
                    },
                    {   // SBHT POI
                        sql: "SELECT * FROM sbht_poi_digitize",
                        cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                        interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                        name: 'SBHT POI',
                        id: "sbht_poi"
                    },
                    {   // COMM POI
                        sql: "SELECT * FROM comm_poi_master",
                        cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                        interactivity: "name, type, mile, name_id, season, x, y, sw_offset, ne_offset, descrip, video, audio, phone, addr_no, addr_name, addr_type, city, zip, email, website",
                        name: 'Commercial POI',
                        id: "comm_poi"
                    },
                    {   // TRAIL PIX
                        sql: "SELECT * FROM trail_pix_digitize",
                        cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                        interactivity: "img_file, season",
                        name: 'Trail Pics',
                        id: "trail_pix"
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
                zoom: 12,
                zoomControl: true,
                center: [44.8957686012,-86.00646972]
            }

    }

        mapFactory.map = new L.Map('map', mapFactory.mapDefaults.leaflet);

        L.tileLayer(mapFactory.mapDefaults.tileLayer.url, mapFactory.mapDefaults.tileLayer.options)
        .addTo(mapFactory.map);

        return mapFactory;

    }


})();
(function() {

    angular
        .module('mapApp')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'mapFactory', '$rootScope'];

    function PopupCtrl($scope, mapFactory, $rootScope){
        var vm = this;
        vm.data = {}

        $rootScope.$watch('data', function() {
            vm.data = $rootScope.data;
        });

    }

})();
(function() {

    angular
        .module('mapApp')
        .directive('popup', popup);

    function popup(){
        return {
            restrict: 'E',
            // scope: {
            //     // test: '='
            // },
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/popups/templates/mapPopup.html',
            controller: 'PopupCtrl',
            controllerAs: 'vm',
            replace: true
        }
    }

})();
(function() {

    'use strict';

    angular
        .module('popupModule', []);

})();
(function() {

    'use strict';

    angular
        .module('ctrlModule', []);

})();
(function() {

    'use strict';

    angular
        .module('panelModule', []);

})();