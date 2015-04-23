(function() {

    'use strict';

    angular
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    layersFactory.$inject = ['cdbValues', '$state', '$rootScope', 'popupFactory'];

    function layersFactory(cdbValues, $state, $rootScope, popupFactory){

    	var layersFactory = {
            createCdbLayers: createCdbLayers,
            setSelFeatColor: setSelFeatColor,
            sublayers: {},
            map: {}
    	};

        /* Create the CDB layer w/initial sublayer (trail) and add to map */
    	function createCdbLayers(map){

            // Make map accesible to dependents
            layersFactory.map = map;

            // Create and add to map
            cartodb.createLayer(map, cdbValues.lineLayer)
            .addTo(map)
            .on('done', function(lineLayer){

                // Hide grade and caution
                lineLayer.getSubLayer(1).hide();
                lineLayer.getSubLayer(2).hide();

                // Add interaction
                cdb.vis.Vis.addCursorInteraction(map, lineLayer);

                lineLayer.getSubLayer(0).on('featureClick', function(e, latlng, pos, data){

                    featureWasClicked(e, latlng, pos, data, true);

                    // Get non-poi narrative from help table
                    if ($rootScope.queryStates.sbht_caution){
                        popupFactory.getNonPoiNarrative('sbht_caution').then(function(dataResponse) {

                            $rootScope.cautionInfo.text = dataResponse.data.rows[0].narrative;
                            $rootScope.cautionInfo.icon = '';
                        });
                    }

                });

                // When caution is clicked
                lineLayer.getSubLayer(2).on('featureClick', function(e, latlng, pos, data){

                    featureWasClicked(e, latlng, pos, data, true);

                    var cautionInfo = {
                        text: data.type_name,
                        icon: '#icon-' + data.type,
                    };

                    $rootScope.cautionInfo.text = cautionInfo.text;
                    $rootScope.cautionInfo.icon = cautionInfo.icon;

                    $rootScope.$broadcast('cautionClicked');

                });

                /* Assign variables to reference sublayer based on index */
                layersFactory.sublayers.sbht_grade     = lineLayer.getSubLayer(1);
                layersFactory.sublayers.sbht_caution   = lineLayer.getSubLayer(2);

                /* Set interaction for all sublayers */
                for (var i = 0; i < lineLayer.layers.length; i++) {
                    lineLayer.getSubLayer(i).setInteraction(true);
                }

            })
            .on('error', function() {
                console.log("Ayo nayo! Could not add LINE layer");
            });


            // Create and add point layer to map
    	    cartodb.createLayer(map, cdbValues.pointLayer)
    	    .addTo(map)
    	    .on('done', function(pointLayer){

                // Add interaction
                cdb.vis.Vis.addCursorInteraction(map, pointLayer);

                /* Set interaction for all sublayers */
                for (var i = 0; i < pointLayer.layers.length; i++) {
                    pointLayer.getSubLayer(i).setInteraction(true);
                    pointLayer.getSubLayer(i).on('featureClick', function(e, latlng, pos, data){
                        featureWasClicked(e, latlng, pos, data);
                    });
                }

                /* Assign variables to reference sublayer based on index */
                layersFactory.sublayers.features  = pointLayer.getSubLayer(0);
                layersFactory.sublayers.commercial = pointLayer.getSubLayer(1);
                layersFactory.sublayers.trail_condition = pointLayer.getSubLayer(2);

                // Hide trail_condition
                pointLayer.getSubLayer(2).hide();

    	    })
    	    .on('error', function() {
    	        console.log("Ayo nayo! Could not add POINT layer");
    	    });

    	}

        // Consolidate w/cdbValues later if possible
        function getMss(css){
            var elem = '#mss-' + css,
                mss = $(elem).text();
            return mss;
        }

        /* When any point or line is clicked */
        function featureWasClicked(e, latlng, pos, data, isItLine){

            var params = {};

            if (isItLine){

                $rootScope.cautionText = '';

                popupFactory.getNearest([latlng[0], latlng[1]])
                .then(function(result){

                    var closest = result.data.rows[0];

                    params = {
                        cartodb_id: closest.cartodb_id,
                        filepath: closest.filepath,
                        layer: closest.layer,
                        lat: latlng[0],
                        lon: latlng[1],
                    };

                    return params;

                }).then(function(result){

                    var re = result;
                    $state.go('popup.poi', re, {reload: true});

                });

            } else {
                params = {
                    cartodb_id: data.cartodb_id,
                    filepath: data.filepath,
                    layer: data.layer,
                    lat: pos[0],
                    lon: pos[1],
                }
                $state.go('popup.poi', params, {reload: true});
            }

            $rootScope.$broadcast('featureClicked');

        }

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