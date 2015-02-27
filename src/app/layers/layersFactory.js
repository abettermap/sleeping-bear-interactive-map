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