(function() {

    'use strict';

    angular
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    layersFactory.$inject = ['popupFactory', 'cdbValues', 'mapService', '$state', '$stateParams'];

    function layersFactory(popupFactory, cdbValues, mapService, $state, $stateParams){

    	var layersFactory = {
    		tileLayers: {},
    		setCdbInteraction: {},
    	};

    	layersFactory.tileLayers = mapService.tileLayers;

    	layersFactory.addCdbLayer = function(map){

    	    cartodb.createLayer(map, cdbValues)
    	    .addTo(map)
    	    .on('done', function(layer){
    	        layersFactory.setCdbInteraction(map, layer);
    	    })
    	    .on('error', function() {
    	        console.log("Ayo nayo! Could not add cdb layer");
    	    });
    	};

    	layersFactory.setCdbInteraction = function(map, layer){
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