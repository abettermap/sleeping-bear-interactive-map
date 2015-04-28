(function() {

    'use strict';

    angular
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    layersFactory.$inject = ['$timeout', 'cdbValues', '$state', '$rootScope', 'popupFactory'];

    function layersFactory($timeout, cdbValues, $state, $rootScope, popupFactory){

    	var factory = {
            addTempMarker: addTempMarker,
            createCdbLayers: createCdbLayers,
            layers: {},
            map: {},
            panToSelection: panToSelection,
            setSelFeatColor: setSelFeatColor,
            sublayers: {},
    	};

        /* Create the CDB layer w/initial sublayer (trail) and add to map */
    	function createCdbLayers(map){

            // Make map accesible to dependents
            factory.map = map;

            // Create and add to map
            cartodb.createLayer(map, cdbValues.lineLayer)
            // .addTo(map)
            .on('done', function(lineLayer){

                factory.layers.lineLayer = lineLayer;

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
                factory.sublayers.sbht_grade     = lineLayer.getSubLayer(1);
                factory.sublayers.sbht_caution   = lineLayer.getSubLayer(2);

                /* Set interaction for all sublayers */
                for (var i = 0; i < lineLayer.layers.length; i++) {
                    lineLayer.getSubLayer(i).setInteraction(true);
                }


            })
            .on('error', function() {
                console.log("Ayo nayo! Could not add LINE layer");
            });

            createFeatLayer(map);

    	}

        /* Create feat/trail_condition layer */
        function createFeatLayer(map){

            // Create and add point layer to map
            cartodb.createLayer(map, cdbValues.pointLayer)
            // .addTo(map)
            .on('done', function(pointLayer){

                factory.layers.pointLayer = pointLayer;

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
                factory.sublayers.features  = pointLayer.getSubLayer(0);
                factory.sublayers.trail_condition = pointLayer.getSubLayer(1);

                // Hide trail_condition
                pointLayer.getSubLayer(1).hide();


            })
            .on('error', function() {
                console.log("Ayo nayo! Could not add POINT layer");
            });

            // Create comm layer
            createCommLayer(map);

        }

        /* Create comm layer */
        function createCommLayer(map){

            // Create and add point layer to map
            cartodb.createLayer(map, cdbValues.commLayer)
            .on('done', function(commLayer){

                factory.layers.commLayer = commLayer;

                // Add interaction
                cdb.vis.Vis.addCursorInteraction(map, commLayer);

                /* Set interaction for all sublayers */
                commLayer.getSubLayer(0).setInteraction(true);
                commLayer.getSubLayer(0).on('featureClick', function(e, latlng, pos, data){
                    featureWasClicked(e, latlng, pos, data);
                });

                /* Assign variables to reference sublayer based on index */
                factory.sublayers.commercial  = commLayer.getSubLayer(0);

                // Add layers to map
                addLayersToMap(map);

            })
            .on('error', function() {
                console.log("Ayo nayo! Could not add COMM layer");
            });

        }

        /* Add layers to map */
        function addLayersToMap(map,layer,sublayer,layerName){
            factory.layers.lineLayer.addTo(map);
            $timeout(function() {
                factory.layers.pointLayer.addTo(map);
                factory.layers.commLayer.addTo(map);
            }, 1000);
        }

        /* When any point or line is clicked */
        function featureWasClicked(e, latlng, pos, data, isItLine){

            var params = {};

            if (isItLine){

                $rootScope.cautionText = '';

                popupFactory.getNearest([latlng[0], latlng[1]])
                .then(function(result){
                    console.log("LOOKING FOR NEAREST");
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
                };

                $state.go('popup.poi', params, {reload: true});
            }

            $rootScope.$broadcast('featureClicked');

        }

        /***** SET SELECTED FEATURE COLOR *****/
        function setSelFeatColor(sublayer, cartodb_id){

            var sub, subs = factory.sublayers, mss,
                featCommCondArr = ['features', 'commercial', 'trail_condition'];

            // If trail_pix or faces, clear others
            if (sublayer === 'trail_pix' || sublayer === 'faces'){
                for (var i = 0; i < 3; i++) {
                    sub = featCommCondArr[i];
                    subs[sub].setCartoCSS(getMss(sub));
                }
            } else {
                for (var n = 0; n < 3; n++) {
                    sub = featCommCondArr[n];
                    if (sub === sublayer){
                        subs[sub].setCartoCSS(getMss(sub, cartodb_id));
                    } else {
                        subs[sub].setCartoCSS(getMss(sub));
                    }
                }
            }

        }

        function getMss(sublayer, cartodb_id){

            var newString = '', mss = $('#mss-' + sublayer).text();

            /* Not using mss file for trail condition, so specifiy from cdbvalues*/
            // if (sublayer === 'trail_condition'){
            //     mss = cdbValues.pointLayer.sublayers[1].cartocss;
            //     // console.log(mss);
            // } else {
            // }


            if (cartodb_id){
                if (sublayer === 'trail_condition'){
                    newString = '#' + sublayer + '[cartodb_id=' + cartodb_id + '][zoom>1][zoom<22]{' +
                      'bg/marker-fill: @c-sel-feat-fill; bg/marker-line-color: @c-sel-feat-stroke; fg/marker-fill: #fff;}';
                } else {
                    newString = '#' + sublayer + '[cartodb_id=' + cartodb_id + '][zoom>1][zoom<22]{' +
                      'bg/marker-fill: @c-sel-feat-fill; bg/marker-line-color: @c-sel-feat-stroke;}';
                }
            }

            return mss + newString;
        }

        /****** PAN TO SELECTION ******/
        function panToSelection(coords){
            console.log(coords);
            var map = factory.map,
                targetPoint, targetLatLng,
                viewportWidth = document.documentElement.clientWidth;

            map.panTo(coords);

            if (viewportWidth > 740){
                var y = map.getSize().y / 2;
                var xOffset = map.getSize().x / 3 * 2;
                targetLatLng = map.containerPointToLatLng([xOffset, y]);
                map.panTo(targetLatLng);
            }

        }


        /*** TEMP CAMERA/FACE ICON ****/
        function addTempMarker(coords, type){

            /***** Have marker ready but don't add to map *****/
            var tempMarker = L.marker(coords,{
                temp: true,
                icon: L.divIcon({
                    className: 'temp-div-icon',
                    html: "<svg viewBox='0 0 100 100'>" +
                        "<use xlink:href='#icon-" + type + "'></use></svg>"
                }),
            });

            tempMarker.addTo(factory.map);

        }

    	return factory;
    }

})();