(function() {

    'use strict';

    var layersFactory = function($rootScope, cdbValues, mapService, $q, $state, $http, $stateParams){

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

                        // layersFactory.getFeatureInfo();
                        layersFactory.getTableInfo(thisTable);
                    }                   

                });

            } // end for loop
        };

        layersFactory.getFeatureInfo = function(table) {

            var test = table;
            // debugger;
            var prefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM sbht';
            return $http.get(prefix);

        };

        layersFactory.getTableInfo = function(table) {

            var test = table;
            $rootScope.$broadcast('feature updated', test);
            // return table.name;

        };

    	return layersFactory;
    };

    angular
        // .module('mapApp')
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    // do this so you don't lose it during ugg...
    layersFactory.$inject = ['$rootScope', 'cdbValues', 'mapService', '$q', '$state', '$http', '$stateParams'];

})();