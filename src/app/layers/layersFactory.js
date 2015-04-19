(function() {

    'use strict';

    angular
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    layersFactory.$inject = ['cdbValues', '$state', '$stateParams', '$rootScope', 'popupFactory', '$timeout'];

    function layersFactory(cdbValues, $state, $stateParams, $rootScope, popupFactory, $timeout){

        // Set empty objects for easy access later
        var sublayers = {
            sbht: {},
            sbht_grade: {},
            sbht_caution: {},
            features: {},
            commercial: {},
            trail_pix: {},
            faces: {},
            trail_condition: {},
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

                layer.getSubLayer(0).on('featureClick', function(e, latlng, pos, data){
                    doThisWhenTrailClicked(e, latlng, pos, data);
                });

                // Create remaining sublayers
    	        createSublayers(map, layer);

    	    })
    	    .on('error', function() {
    	        console.log("Ayo nayo! Could not add POINT layer");
    	    });

    	}

        function doThisWhenTrailClicked(e, latlng, pos, data){

            var coords = [latlng[0], latlng[1]],
                states = $rootScope.queryStates;

            $rootScope.cautionText = '';

            // Only do this if something other than a POI layer is visible
            // if (states.trail_pix || states.faces || states.trail_condition){

                popupFactory.getNearest(coords)
                .then(function(result){

                    var closest = result.data.rows[0];

                    $state.go('popup.poi', {
                        cartodb_id: closest.cartodb_id,
                        filepath: closest.filepath,
                        layer: closest.layer,
                        lat: latlng[0],
                        lon: latlng[1],
                    },{
                        reload: true
                    });

                });

            // }

            $rootScope.$broadcast('featureClicked', '');

        }

        /* Create remaining sublayers individually for more flexibility */
    	function createSublayers(map, layer){

            /***** LINES *****/

            // Grade overlay (index: 1)
            layer.createSubLayer({
              cartocss: cdbValues.gradeSublayer.cartocss,
              sql: cdbValues.gradeSublayer.sql,
            }).on('featureClick', function(e, latlng, pos, data){
                doThisWhenTrailClicked(e, latlng, pos, data);
            });;

            // Caution overlay (index: 2)
            layer.createSubLayer({
              cartocss: cdbValues.cautionSublayer.cartocss,
              sql: cdbValues.cautionSublayer.sql,
              interactivity: cdbValues.cautionSublayer.interactivity,
            }).on('featureClick', function(e, latlng, pos, data){
                doThisWhenTrailClicked(e, latlng, pos, data);
                var type = data.type;
                $rootScope.cautionText = type;
            });;

            /***** POINTS *****/

            // Features (index: 3)
            layer.createSubLayer({
              cartocss: cdbValues.featSublayer.cartocss,
              interactivity: cdbValues.featSublayer.interactivity,
              name: 'features',
              sql: cdbValues.featSublayer.sql,
            }).on('featureClick', function(e, pos, latlng, data){

                $state.go('popup.poi', {
                    cartodb_id: data.cartodb_id,
                    filepath: data.filepath,
                    layer: 'features',
                    lat: pos[0],
                    lon: pos[1],
                },{
                    reload: true
                });

                $rootScope.$broadcast('featureClicked', '');

            });

            /* Assign variables to reference sublayer based on index */
            layersFactory.sublayers.sbht     = layer.getSubLayer(0);
            layersFactory.sublayers.sbht_grade     = layer.getSubLayer(1);
            layersFactory.sublayers.sbht_caution   = layer.getSubLayer(2);
            layersFactory.sublayers.features  = layer.getSubLayer(3);
            // layersFactory.commercial = layer.getSubLayer(4);
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
        function setSelFeatColor(tableNm, cartodb_id){

            var newCss,
                layer = layersFactory.sublayers[tableNm];

            // Clear if no CDB id passed
            if (cartodb_id){
                newCss = getMss(tableNm, cartodb_id);
            } else {
                newCss = getMss(tableNm);
                newCss = getMss(tableNm, cartodb_id);
            }

            layer.setCartoCSS(newCss);

        }

        function getMss(layer, cartodb_id){

            var mss = $('#mss-' + layer).text(),
                newString = '#' + layer + '[cartodb_id=' + cartodb_id + '][zoom>1][zoom<22]{' +
                      'bg/marker-fill: @c-sel-feat-fill;' +
                      'bg/marker-line-color: @c-sel-feat-stroke;' +
                    '}';

            if (cartodb_id){
            }
                mss = mss + newString;

            return mss + newString;
        }

    	return layersFactory;
    }

})();