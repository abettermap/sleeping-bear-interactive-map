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
            map: {},
            panToSelection: panToSelection,
            setSelFeatColor: setSelFeatColor,
            sublayers: {},
    	};

        /* CREATE THE CDB LAYER W/INITIAL SUBLAYER (TRAIL) AND ADD TO MAP */
    	function createCdbLayers(map){

            // Make map accesible to dependents
            factory.map = map;

            // Create and add to map
            cartodb.createLayer(map, cdbValues.layerProps)
            .addTo(map)
            .on('done', function(layer){

                // Add interaction
                cdb.vis.Vis.addCursorInteraction(map, layer);

                /* Assign variables to reference sublayer based on index */
                factory.sublayers.sbht_grade        = layer.getSubLayer(1);
                factory.sublayers.sbht_caution      = layer.getSubLayer(2);
                factory.sublayers.features          = layer.getSubLayer(3);
                factory.sublayers.trail_condition   = layer.getSubLayer(4);
                factory.sublayers.commercial        = layer.getSubLayer(5);

                // Hide trail_condition, grade, caution
                factory.sublayers.trail_condition.hide();
                factory.sublayers.sbht_grade.hide();
                factory.sublayers.sbht_caution.hide();

                /* Set interaction for all sublayers */
                for (var i = 0; i < layer.layers.length; i++) {
                    layer.getSubLayer(i).setInteraction(true);
                }

                // When trail is clicked
                layer.getSubLayer(0).on('featureClick', function(e, latlng, pos, data){

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
                factory.sublayers.sbht_caution.on('featureClick', function(e, latlng, pos, data){

                    featureWasClicked(e, latlng, pos, data, true);

                    var cautionInfo = {
                        text: data.type_name,
                        icon: '#icon-' + data.type,
                    };

                    $rootScope.cautionInfo.text = cautionInfo.text;
                    $rootScope.cautionInfo.icon = cautionInfo.icon;
                    $rootScope.$broadcast('cautionClicked');

                });

                // When features is clicked
                factory.sublayers.features.on('featureClick', function(e, latlng, pos, data){
                    featureWasClicked(e, latlng, pos, data);
                });

                // When trail_condition is clicked
                factory.sublayers.trail_condition.on('featureClick', function(e, latlng, pos, data){
                    featureWasClicked(e, latlng, pos, data);
                });

                // When commercial is clicked
                factory.sublayers.commercial.on('featureClick', function(e, latlng, pos, data){
                    featureWasClicked(e, latlng, pos, data);
                });

            })
            .on('error', function() {
                console.log("Ayo nayo! Could not add layer.");
            });

    	}

        /* WHEN ANY POINT OR LINE IS CLICKED */
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
                        // subs[sub].setCartoCSS(getMss(sub, cartodb_id));
                        subs[sub].setCartoCSS(getMss(sub));
                    } else {
                        subs[sub].setCartoCSS(getMss(sub));
                    }
                }
            }

        }

        function getMss(sublayer, cartodb_id){

            var newString = '', mss = $('#mss-' + sublayer).text();

            /* Slightly different symbology for trail_condition */
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
                    html: '' +
                        '<svg class="icon--temp--bg" viewBox="0 0 100 100">' +
                            '<use xlink:href="#icon-map-pin-wide-empty"></use>' +
                        '</svg>' +
                        '<svg class="icon--temp--fg" viewBox="0 0 100 100">' +
                            '<use xlink:href="#icon-' + type + '"></use>' +
                            // '<use xlink:href="{{ ' + type + ' | svgIconCardHref }}"></use>' +
                        '</svg>'
                }),
            });

            tempMarker.addTo(factory.map);

        }

    	return factory;
    }

})();