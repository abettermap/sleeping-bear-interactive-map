(function() {

    'use strict';

    angular
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    layersFactory.$inject = ['cdbValues', '$state', '$stateParams', '$rootScope', 'popupFactory', '$timeout'];

    function layersFactory(cdbValues, $state, $stateParams, $rootScope, popupFactory, $timeout){

        // Set empty objects for easy access later
        var sublayers = {
            trail: {},
            grade: {},
            caution: {},
            features: {},
            commercial: {},
            trailPics: {},
            faces: {},
            trailCond: {},
        };

    	var layersFactory = {
            addCdbLayer: addCdbLayer,
    		createSublayers: createSublayers,
            setSelFeatColor: setSelFeatColor,
            sublayers: sublayers,
    	};

        /* Create the CDB layer w/initial sublayer (trail) and add to map */
    	function addCdbLayer(map){

            var cdbLayer = cdbValues.baseInfo;

            // Need at least one sublayer to start, so use trail
            // This means its index = 0
            cdbLayer["sublayers"] = cdbValues.trailSublayer;

            // Create and add to map
    	    cartodb.createLayer(map, cdbLayer)
    	    .addTo(map)
    	    .on('done', function(layer){

                // Add interaction
                cdb.vis.Vis.addCursorInteraction(map, layer);

                // Create remaining sublayers
    	        createSublayers(map, layer);

    	    })
    	    .on('error', function() {
    	        console.log("Ayo nayo! Could not add POINT layer");
    	    });

    	}

        /* Create remaining sublayers individually for more flexibility */
    	function createSublayers(map, layer){

            /***** LINES *****/

            // Grade overlay (index: 1)
            layer.createSubLayer({
              cartocss: cdbValues.gradeSublayer.cartocss,
              name: 'grade',
              sql: cdbValues.gradeSublayer.sql,
            });

            // Caution overlay (index: 2)
            layer.createSubLayer({
              cartocss: cdbValues.cautionSublayer.cartocss,
              name: 'caution',
              sql: cdbValues.cautionSublayer.sql,
            });

            /***** POINTS *****/

            // Features (index: 3)
            layer.createSubLayer({
              cartocss: cdbValues.featSublayer.cartocss,
              interactivity: cdbValues.featSublayer.interactivity,
              name: 'features',
              sql: cdbValues.featSublayer.sql,
            }).on('featureClick', function(e, pos, latlng, data){
                var season = $rootScope.queryStates.season;
                // var info = [data, 'features'];
                // var s = data.mile;

                $state.go('layer.features', {
                    cartodb_id: data.cartodb_id,
                    mile: data.mile,
                    seasons: season,
                    table: 'features'
                },{
                    reload: true
                });

                // Restyle selected feature
                setSelFeatColor(this, 'features', data.cartodb_id);

                // Set primary/secondary
                popupFactory.setActiveImages(data, 'features', pos);

                // Set thumbnails
                var thumbsParams = {
                    coords: pos,
                    layer: 'features',
                    cartodb_id: data.cartodb_id,
                }

                popupFactory.setThumbs(thumbsParams).then(function(dataResponse) {
                    // debugger;
                    var thumbsData = dataResponse.data.rows;
                    for (var i in thumbsData){
                        thumbsData[i].layer = thumbsParams.layer;
                    }

                    $rootScope.$broadcast('rootScope:thumbsSet', thumbsData);
                });

            });

            /* Assign variables to reference sublayer based on index */
            layersFactory.sublayers.grade     = layer.getSubLayer(1);
            layersFactory.sublayers.caution   = layer.getSubLayer(2);
            layersFactory.sublayers.features  = layer.getSubLayer(3);
            // layersFactory.commercial = layer.getSubLayer(4);
            // layersFactory.trailPics = layer.getSubLayer(5);
            // layersFactory.faces     = layer.getSubLayer(6);
            // layersFactory.trailCond = layer.getSubLayer(7);


            /***** CLICK FUNCTIONALITY *****/
            /* Set interaction for all sublayers */
            var sublayers = layer.layers;
            for (var i = 0; i < sublayers.length; i++) {

                var sublayer = layer.getSubLayer(i);
                sublayer.setInteraction(true);

            } // end for loop

        } // end returned object

        /***** SET SELECTED FEATURE COLOR *****/
        function setSelFeatColor(layer, elem, cartodb_id){

            var newCss = getMss(elem, cartodb_id);
            layer.setCartoCSS(newCss);

        }

        function getMss(layer, cartodb_id){
            var mss = $('#mss-' + layer).text(),
                newString = '#' + layer + '[cartodb_id=' + cartodb_id + '][zoom>1][zoom<22]{' +
                      'bg/marker-fill: @c-sel-feat-fill;' +
                      'bg/marker-line-color: @c-sel-feat-stroke;' +
                    '}';
            return mss + newString;
        }

    	return layersFactory;
    }

})();