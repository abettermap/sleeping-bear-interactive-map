(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('mapFactory', mapFactory);

    // do this so you don't lose it during ugg...
    mapFactory.$inject = ['$rootScope', 'cdbValues'];

    function mapFactory($rootScope, cdbValues){

        var mapFactory = {};

        mapFactory.tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
            // terrain: L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q', {
            //     attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a><a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
            // })
        };

        mapFactory.leafletDefaults = {
            
            attribution: false,
            center: [44.88652,-86.00544],
            zoom: 12,
            zoomControl: false,
            layers: mapFactory.tileLayers.terrain
            
        };
    
        mapFactory.map = new L.Map('map', mapFactory.leafletDefaults);

        mapFactory.cdbLayer = {};

        mapFactory.addCdbLayer = function(){
            cartodb.createLayer(mapFactory.map, cdbValues)
            .addTo(mapFactory.map)
            .on('done', function(layer){
                mapFactory.setCdbInteraction(layer);
            })
            .on('error', function() {
                console.log("some error occurred");
            });
        };
        mapFactory.setCdbInteraction = function(layer){
            cdb.vis.Vis.addCursorInteraction(mapFactory.map, layer);
            var sublayers = layer.options.sublayers;
            var tableNameArr = [];
            for (var i = sublayers.length - 1; i >= 0; i--) {

                var sublayer = layer.getSubLayer(i);
                sublayer.setInteraction(true);

                tableNameArr.push({
                    name: sublayers[i].name,
                    index: i
                });

                var newSub = layer.options.sublayers[i];
                // var newSub = layer.options.sublayers[this._position];
                // debugger;
                var tableName = newSub.name;
                // var dataArray = mapFactory.getFeatureData(data, tableName);

                sublayer.on('featureClick', function(e, pos, latlng, data){
                    if (e){
                        var i = this._position;
                        mapFactory.getFeatureInfo(e, pos, latlng, data, tableNameArr, i);
                    }
                });

            } // end for loop
        };

        $rootScope.testData = {};

        mapFactory.getFeatureInfo = function(e, pos, latlng, data, tableName, i) {

            $rootScope.$apply(function() {
                $rootScope.tableName = tableName[i].name;
                $rootScope.testData = data;
            });
            
        };

        return mapFactory;

    }


})();