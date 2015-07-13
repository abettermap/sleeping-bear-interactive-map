(function() {

    'use strict';

    FastClick.attach(document.body);

    angular
        .module('ctrlsModule', []);
    angular
        .module('layersModule', []);
    angular
        .module('metaInfoModule', []);
    angular
        .module('panelsModule', []);
    angular
        .module('popupsModule', []);

    angular.module('mapApp', [
            'metaInfoModule',
            'ctrlsModule',
            'panelsModule',
            'popupsModule',
            'layersModule',
            'ngAnimate',
            'angularUtils.directives.dirPagination',
            'ui.router',
        ])
        .run(['$rootScope', '$state', '$stateParams', '$location',
            function ($rootScope, $state, $stateParams, $location) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;


                /******************************/
                /******* QUERY STATES  ********/
                /******************************/

                /**** NEED TO AUTOMATE DEFAULT SEASON ****/
                $rootScope.queryStates = {
                    commercial: [50],
                    faces: false,
                    features: ["'mainpoints'"],
                    season: 3,
                    sbht_caution: false,
                    trail_condition: false,
                    trail_pix: true
                };


                /******************************/
                /****** META INFO/TAGS ********/
                /******************************/

                $rootScope.metaInfo = {
                    image: 'http://friendsofsleepingbear.org/wp-content/uploads/2012/06/SBHT-Logo-300x300-192x192.jpg',
                    title: 'Sleeping Bear Heritage Trail - Interactive Map',
                    description: "An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country.",
                    url: 'http://friendsofsleepingbear.org/sbht-i-map'
                };


                /******************************/
                /******** THUMBNAILS  *********/
                /******************************/

                $rootScope.thumbsArrays = {
                    current: [],
                    both: [],
                    north: [],
                    south: [],
                };

                $rootScope.updateThumbs = function(direction){
                    $rootScope.thumbsArrays.current = $rootScope.thumbsArrays[direction];
                };

                $rootScope.thumbsDirectionModel = 'both';


                /******************************/
                /***** SEASONS (NEEDED?) ******/
                /******************************/

                $stateParams.seasons = $rootScope.queryStates.season;

                /******************************/
                /******** CAUTION TEXT ********/
                /******************************/
                $rootScope.cautionInfo = {
                    text: '',
                    icon: '',
                };

                $rootScope.$on('cautionClicked',function(){
                    $rootScope.cautionInfo.text = $rootScope.cautionInfo.text;
                    $rootScope.cautionInfo.icon = $rootScope.cautionInfo.icon;
                });

                $rootScope.tempSublayerIndexes = {
                    sbht_caution: -1,
                    sbht_grade: -1,
                    trail_condition: -1,
                };

            }
        ]);

})();

(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('BetaDisclaimerCtrl', BetaDisclaimerCtrl);

    BetaDisclaimerCtrl.$inject = ['ngDialog', '$timeout'];

    function BetaDisclaimerCtrl(ngDialog, $timeout){

        // Cookies for temp map beta disclaimer
        function setCookie(cname,cvalue) {
            var expires = "expires=Fri, 22 May 2015 00:00:00 UTC";
            document.cookie = cname+"="+cvalue+"; "+expires;
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function checkCookie() {
            var visitedStatus = getCookie("map visited");
            if (visitedStatus !== "") {
                // console.log("Welcome back");
                // ngDialog.open({ template: 'src/app/map/beta-disclaimer.html' });
            } else {
                // alert("hey guyyyyysss");
                ngDialog.open({ template: 'src/app/map/beta-disclaimer.html' });
                setCookie("map visited", 1);
                $timeout(function() {
                    $('#ngdialog1').scrollTop(0);
                }, 500);
            }
        }

        checkCookie();

    }

})();
(function() {

    'use strict';

    function getMss(css){
        var elem = '#mss-' + css,
            mss = $(elem).text();
        return mss;
    }

    angular
        .module('mapApp')
        .value('cdbValues',{
            layerProps: {
                attribution: false,
                type: 'CartoDB',
                user_name: 'remcaninch',
                sublayers: [
                    // TRAIL
                    {
                        sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht",
                        cartocss: getMss('lines'),
                        interactivity: 'cartodb_id'
                    },
                    // GRADE
                    {
                        cartocss: "" +
                            "#sbht_grade{line-color: red; line-width: 4; line-opacity: .76; line-join: round; line-smooth: .25;}",
                        sql: "SELECT the_geom_webmercator, cartodb_id, grade FROM sbht_grade",
                    },
                    // CAUTION
                    {
                        cartocss: "" +
                            "#sbht_caution{line-color: yellow; line-width: 4; line-opacity: .76; line-smooth: .25; line-join: round;}" +
                            "#sbht_caution::bottom {line-width:12; line-opacity: .1; line-color: yellow;}" +
                            "#sbht_caution::labels[zoom >= 14]{" +
                              "text-name: [type_name];" +
                              "text-face-name: 'DejaVu Sans Book';" +
                              "text-size: 11;" +
                              "text-opacity: .85;" +
                              "text-label-position-tolerance: 0;" +
                              "text-fill: #000;" +
                              "text-halo-fill: rgba(255,255,0,.6);" +
                              "text-halo-radius: 2;" +
                              "text-dy: 10;" +
                              "text-allow-overlap: true;" +
                              "text-placement: line;" +
                            "}",
                        interactivity: 'cartodb_id, type_name, type',
                        sql: "SELECT the_geom_webmercator, cartodb_id, type_name, type FROM sbht_caution",
                    },
                    // FEATURES
                    {
                        cartocss: getMss('features'),
                        interactivity: 'cartodb_id, type, filepath, layer, lin_dist',
                        sql: "SELECT 'features' AS layer, features.lin_dist, features.the_geom_webmercator, features.seasons, features.cartodb_id, features.type, features.filepath, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE substring(features.seasons,3,1) = 'y' AND features.type = 'mainpoints' ORDER BY priority DESC",
                    },
                    // TRAIL (SKI) CONDITION
                    {
                        interactivity: 'cartodb_id, filepath, layer, lin_dist',
                        cartocss: getMss('trail_condition'),
                        sql: "SELECT the_geom_webmercator, lin_dist, cartodb_id, filepath, 'trail_condition' as layer FROM trail_condition",
                    },
                    // COMMERCIAL
                    {
                        cartocss: getMss('commercial'),
                        interactivity: 'cartodb_id, type, filepath, layer, lin_dist',
                        sql: "SELECT 'commercial' AS layer, commercial.lin_dist, commercial.the_geom_webmercator, commercial.seasons, commercial.cartodb_id, commercial.type, commercial.filepath, commercial_types.name AS type_name, commercial_types.priority FROM commercial INNER JOIN commercial_types ON commercial.type=commercial_types.type WHERE commercial.cartodb_id = 0",
                    },
                    ]
            },
            sharedQueries: {
                url: "https://remcaninch.cartodb.com/api/v2/sql?q=",
                sql: "SELECT cartodb_id, lin_dist, the_geom, the_geom_webmercator, filepath, ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat,"
            }

        });

})();

(function() {

    'use strict';

    angular
        .module('mapApp')
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapFactory', 'layersFactory', 'kioskFactory'];

    function interactiveMap(mapFactory, layersFactory, kioskFactory){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){

                mapFactory.createMap();
                layersFactory.createCdbLayers(mapFactory.map);
                kioskFactory.disableLinks();

            }
        };

    }

})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('mapFactory', mapFactory);

    mapFactory.$inject = ['$http'];

    function mapFactory($http){

        // Background layers
        var tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
        };

        var factory = {
            addGps: addGps,
            createMap: createMap,
            map: {},
            reloadMap: reloadMap,
            tileLayers: tileLayers,
            zoomHome: zoomHome,
        };

        // Leaflet defaults
        var leafletDefaults = {
            attribution: false,
            zoomControl: false,
            layers: tileLayers.terrain
        };

        // Make the map
        function createMap(){
            factory.map = L.map('map', leafletDefaults);
            factory.zoomHome(factory.map);
        }

        // Zoom to initial extent
        function zoomHome(map){
            var empireBeach = L.latLng(44.8123, -86.0681),
                portOneida = L.latLng(44.9394, -85.9374),
                center = L.latLng(44.87585, -86.00275);
            map.fitBounds([
                [empireBeach],
                [portOneida]
            ]);
        }

        function addGps(map){

            var tempMarker = L.marker([0,0],{
                iconSize: [25,25],
                icon: L.divIcon({
                    className: 'current-location-icon',
                    html: "<svg viewBox='0 0 100 100'>" +
                        "<use xlink:href='#icon-locate'></use></svg>"
                }),
            });

            var gpsCtrl =  new L.Control.Gps({
                maxZoom: 20,
                marker: tempMarker,
                style: {radius: 15, weight:4, color: 'red', fill: false, opacity:0.8}
            });
            gpsCtrl._map = map;

            var controlDiv = gpsCtrl.onAdd(map);
            $('#zoom-to-current').append(controlDiv);

        }

        // Reload map
        function reloadMap(){

            var url = location.href;

            // If popup, go to initial page
            if (url.indexOf('popup') > -1) {
                if (url.indexOf('kiosk') > -1){ // Kiosk
                    window.location = '/sbht-i-map/kiosk';
                } else {
                    window.location = '/sbht-i-map'; // Not kiosk
                }
            // Otherwise reload
            } else {
                location.reload();
            }

        }


        // Zoom to current GPS position
        function locate(){
            map.locate({
                setView: true,
                maxZoom: 13
            });
        }

        return factory;

    }

})();
(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PositionCtrl', PositionCtrl);

    PositionCtrl.$inject = ['currentPositionLatLng', 'mapFactory', '$state', 'popupFactory'];

    function PositionCtrl(currentPositionLatLng, mapFactory, $state, popupFactory){

        var map = mapFactory.map,
            mapLayers = map._layers;

        popupFactory.clearTempMarker(map, mapLayers);

        map.panTo(currentPositionLatLng);
        map.setZoom(14);

        var positionMarker = L.marker(currentPositionLatLng,{
            temp: true,
            icon: L.divIcon({
                className: 'current-location-icon',
                html: "<svg viewBox='0 0 100 100'>" +
                    "<use xlink:href='#icon-locate'></use></svg>"
            }),
        });

            positionMarker.addTo(map);

        }

})();
(function() {

    'use strict';

    angular
        .module('layersModule')
        .factory('layersFactory', layersFactory);

    layersFactory.$inject = ['cdbValues', '$state', '$rootScope', 'popupFactory'];

    function layersFactory(cdbValues, $state, $rootScope, popupFactory){

    	var factory = {
            addTempMarker: addTempMarker,
            createCdbLayers: createCdbLayers,
            map: {},
            panToSelection: panToSelection,
            setSelFeatColor: setSelFeatColor,
            sublayers: {},
            toggleOverlayState: toggleOverlayState,
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
                factory.sublayers = {
                    sbht_grade: layer.getSubLayer(1),
                    sbht_caution: layer.getSubLayer(2),
                    features: layer.getSubLayer(3),
                    trail_condition: layer.getSubLayer(4),
                    commercial: layer.getSubLayer(5),
                };

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
        function panToSelection(coords, type){

            var map = factory.map,
                targetPoint, targetLatLng,
                viewportWidth = document.documentElement.clientWidth;

            // Zoom in if mainpoints
            if (type && type === 'mainpoints'){
                map.setView(coords, 16, {reset: true});
            } else {
                map.panTo(coords);
            }

            // Pan to 1/3 of the viewport on tablets and up
            if (viewportWidth > 740){
                var y = map.getSize().y / 2;
                var xOffset = map.getSize().x / 3 * 2;
                targetLatLng = map.containerPointToLatLng([xOffset, y]);

                // Animation looks silly if zoom happens first, so omit
                if (type && type === 'mainpoints'){
                    map.panTo(targetLatLng, {animate: false});
                } else {
                    map.panTo(targetLatLng);
                }
            }

        }

        /*** TEMP CAMERA/FACE ICON ****/
        function addTempMarker(coords, type){

            // Clear temp marker
            popupFactory.clearTempMarker(factory.map, factory.map._layers);

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
                        '</svg>'
                }),
            });

            tempMarker.addTo(factory.map);

            panToSelection(coords, type);

        }

        /***** TOGGLE OVERLAY STATE *****/
        function toggleOverlayState(overlay){

            if (overlay === 'trail_condition' || overlay === 'sbht_caution'){
                $rootScope.queryStates[overlay] = !$rootScope.queryStates[overlay];
            }

            factory.sublayers[overlay].toggle();

        }

    	return factory;
    }

})();
(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('kioskFactory', kioskFactory);

    kioskFactory.$inject = ['$http', '$rootScope', 'layersFactory', '$state'];

    function kioskFactory($http, $rootScope, layersFactory, $state){

        var factory = {
            disableLinks: disableLinks,
            resetMapDefaults: resetMapDefaults,
            screensaverInterval: null,
            screensaverTimer: null,
        };

        // Disable context menu and outbound links if kiosk
        function disableLinks(){

            var k = window.location.href.indexOf('kiosk');
            if (k > 0){

                // Disable right-click
                $('body').attr('oncontextmenu', 'return false');

                var css = '' +
                    '.disable-outbound-links a {' +
                      'color: inherit !important;' +
                      'text-decoration: none !important;' +
                      'pointer-events: none !important;' +
                    '}' +
                    '.disable-outbound-links iframe,' +
                    'popup-info-pg__content .disable-outbound-links h4 {' +
                        'display: none !important;' +
                    '}' +
                    '.prevent-link {' +
                        'display: block !important;' +
                    '}';
                var head = document.head || document.getElementsByTagName('head')[0],
                    style = document.createElement('style');

                style.type = 'text/css';

                if (style.styleSheet){
                  style.styleSheet.cssText = css;
                } else {
                  style.appendChild(document.createTextNode(css));
                }

                head.appendChild(style);

                document.getElementById('map-wrapper').addEventListener("touchstart", screenSaver);
                document.getElementById('map-wrapper').addEventListener("touchend", screenSaver);
                document.getElementById('map-wrapper').addEventListener("touchmove", screenSaver);
                document.getElementById('map-wrapper').addEventListener("mousemove", screenSaver);

            }

        }

        // Kiosk screensaver
        function screenSaver(){

            clearInterval(factory.screensaverInterval);
            clearTimeout(factory.screensaverTimer);

            factory.screensaverTimer = setTimeout(function(){

                // Start counter
                var count = 1;

                // Start timed interval
                factory.screensaverInterval = setInterval(function(){
                    count++;
                    if (count <= 50){
                        resetMapDefaults();
                    } else {
                        window.location = '/sbht-i-map/kiosk';
                    }
                }, 7000);

            }, 180000);

        }


        // Reset map defaults
        function resetMapDefaults(){

            // Set zoom to 12
            layersFactory.map.setZoom(12);

            // Uncheck all POI toggles, faces, trail_condition
            var checkBoxes = $('.poi-type__checkbox, #faces-toggle');
            [].forEach.call(checkBoxes, uncheckBoxes);

            // Make sure trail pics are on
            var isTrailPixChecked = $('#trail-pics-toggle').prop('checked');

            if (!isTrailPixChecked){
                $('#trail-pics-toggle').click();
            }

            // Click summer
            $('#summer-toggle').click();


            /* DISABLE GRADE, CAUTION, TRAIL_CONDITION */

            // Let controller know about it in order to update model
            $rootScope.$broadcast('setDefaults');

            // Uncheck all (can't do via click() b/c using ng-change)
            var overlays = [
                {id: '#sbht_caution-toggle', sub: 'sbht_caution'},
                {id: '#sbht_grade-toggle', sub: 'sbht_grade'},
                {id: '#trail-cond-toggle', sub: 'trail_condition'},
            ];

            for (var i = 0; i < overlays.length; i++){

                // Uncheck it
                $(overlays[i].id).prop('checked', false);

                // Hide sublayer
                layersFactory.sublayers[overlays[i].sub].hide();

            }

            // Update $rootScope as needed
            $rootScope.queryStates.sbht_caution = false;
            $rootScope.queryStates.trail_condition = false;

            goToRandomFeat();

        }

        function goToRandomFeat(){

            // Grab a random sublayer
            var subs = ['features', 'commercial', 'trail_pix'],
                randomSub = Math.floor(Math.random() * 3);

            getRandomCdbId(subs[randomSub]).then(function(dataResponse) {

                // Get random feature and its CDB_id
                var randomId = Math.floor(Math.random() * dataResponse.data.rows.length);
                randomId = dataResponse.data.rows[randomId].id;

                var params = {
                    cartodb_id: randomId,
                    layer: subs[randomSub],
                };

                $state.go('popup.poi', params, {reload: true});

            });

        }

        function uncheckBoxes(element, index, array){

            var isChecked = $(element).prop('checked');

            if (isChecked){
                $(element).click();
                $(element).prop('checked', false);
            }

        }

        function getRandomCdbId(table){

            var query = '';
            query = 'https://remcaninch.cartodb.com/api/v2/sql?q=' +
                'SELECT cartodb_id AS id FROM ' + table;

            return $http({
                method: 'GET',
                url: query,
            });

        }

        return factory;

    }

})();
(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$rootScope', 'selFeatData', 'popupFactory', 'layersFactory', '$location'];

    function PopupCtrl($rootScope, selFeatData, popupFactory, layersFactory, $location){

        var vm = this;
        $('#map').click();

        /********** DATA FOR SELECTED FEATURE **********/
        vm.selFeatData = selFeatData.rows[0];

        if (vm.selFeatData.narrative) {
            $rootScope.metaInfo.description = vm.selFeatData.narrative.replace(/<\/?[^>]+(>|$)/g, "");
        } else {
            $rootScope.metaInfo.description = "An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country.";
        }

        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        // Get seasons ready, run if it exists (POI and trail pics only)
        if (vm.selFeatData.available){
            seasonsAvailable(vm.selFeatData.available);
        }

        function seasonsAvailable(seasons){

            var obj = {
                0: {
                    name: 'Winter',
                    open: null,
                    icon: '#icon-winter',
                    classNm: 'winter',
                },
                1: {
                    name: 'Spring',
                    open: null,
                    icon: '#icon-spring',
                    classNm: 'spring',
                },
                2: {
                    name: 'Summer',
                    open: null,
                    icon: '#icon-summer',
                    classNm: 'summer',
                },
                3: {
                    name: 'Fall',
                    open: null,
                    icon: '#icon-fall',
                    classNm: 'fall',
                },
            };

            for (var i = 0; i < 4; i++) {
                if (seasons.substring(i,i+1) === 'y'){
                    obj[i].open = true;
                    obj[i].classNm = 'available-seasons__icon available';
                } else {
                    obj[i].open = false;
                    obj[i].classNm = 'available-seasons__icon';
                }
            }

            vm.availableSeasons = obj;

        }

        /***** Trust video URLs *****/
        if (vm.selFeatData.video_link){
            vm.videoUrl = popupFactory.trustMedia(vm.selFeatData.video_link, true);
        }


        /***** Trust audio URLs *****/
        var audio = vm.selFeatData.audio_link;

        // Run if it exists (POI only)
        if (audio){
            audio = "https://w.soundcloud.com/player/?url=" + audio + "&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false";
            vm.audioUrl = popupFactory.trustMedia(audio);
        }

        /***** Header *****/
        // Type icon -- header
        vm.headerTypeIcon = '#icon-' + vm.selFeatData.type;

        // Type icon
        vm.typeIcon = '#icon-' + vm.selFeatData.type;

        // Directions
        vm.directionsUrl = 'https://maps.google.com/maps?daddr=' + vm.selFeatData.lat + ',' + vm.selFeatData.lon;

        // Distances from Dune Climb
        vm.distFromDuneClimb = function(dist){
            return popupFactory.distFromDuneClimb(dist);
        };

        // Description/Narrative - enable HTML
        vm.trustHtml = popupFactory.trustHtml;

        if (vm.selFeatData.layer === 'commercial'){
            popupFactory.getCommTypes(vm.selFeatData.categories).then(function(result){
                vm.commTypesArr = result.data.rows;
                for (var i = 0; i < vm.commTypesArr.length; i++) {
                    vm.commTypesArr[i].type = "#icon-" + vm.commTypesArr[i].type;
                }
            });
        }


        /******************************/
        /******** GRADE/CAUTION *******/
        /******************************/

        // Hide caution when any feature clicked
        $rootScope.$on('featureClicked',function(){
            $rootScope.cautionInfo.text = '';
        });


        // Get non-poi narratives from help table
        if (vm.selFeatData.layer === 'trail_pix' || vm.selFeatData.layer === 'faces' || vm.selFeatData.layer === 'trail_condition'){

            popupFactory.getNonPoiNarrative(vm.selFeatData.layer).then(function(dataResponse) {
                vm.selFeatData.narrative = dataResponse.data.rows[0].narrative;
            });

        }

        /******************************/
        /****** PAN TO SELECTION ******/
        /******************************/

        /***** Clear existing marker, add new, zoom/pan to selection *****/
        layersFactory.addTempMarker([vm.selFeatData.lat, vm.selFeatData.lon], vm.selFeatData.type);


        /******************************/
        /****** SECONDARY IMAGES ******/
        /******************************/

        /* Look for secondary images (even w/pics & faces, to stay consistent) */
        popupFactory.findSecondary(vm.selFeatData)
        .then(function(result) {

            var imgObj = result.data,
                arr = [],
                layer = vm.selFeatData.layer,
                suffix = 'img_prod\/' + layer + '\/mid_size' + vm.selFeatData.filepath;

            /* POI need path + file pushed */
            if (layer === 'features' || layer === 'commercial'){
                for (var i in imgObj){
                    if (imgObj[i].hasOwnProperty(i)){
                       arr.push(imgObj[i]);
                    }
                }
            }

            return arr;
        })
        .then(function(result){

            var activeImages = [],
                secondImgFiles = result,
                suffix = 'img_prod\/' + vm.selFeatData.layer + '\/mid_size' + vm.selFeatData.filepath;

            // Length will be zero for trail pics, faces, and trail condition (???)
            if (secondImgFiles.length <= 0){
                activeImages =[suffix];
            } else {
                for ( var i in secondImgFiles ) {
                    activeImages.push(suffix + secondImgFiles[i]);
                }
            }

            vm.activeImages = activeImages;

           return vm.activeImages[0];

        })
        .then(function(activeImage){

            var urlShareParams = {
                caption: 'Sleeping Bear Heritage Trail -- Interactive Map',
                description: $rootScope.metaInfo.description,
                img: encodeURIComponent('http://friendsofsleepingbear.org/sbht-i-map/' + activeImage),
                name: vm.selFeatData.name,
                url: $location.$$absUrl,
            };

            /********** UPDATE META **********/
            $rootScope.metaInfo.image = encodeURIComponent(activeImage);

            // Update page title
            $rootScope.metaInfo.title = vm.selFeatData.name + ' - SBHT Interactive Map';

            /* Upate meta URL */
            $rootScope.metaInfo.url = $location.$$absUrl;

            /* Share buttons */
            vm.socialLinkList = [
                {
                    name: 'email',
                    caption: 'via email',
                    icon: '#icon-email',
                    url: popupFactory.setShareUrl('email', urlShareParams),
                    target: '_blank',
                },
                {
                    name: 'facebook',
                    caption: ' on Facebook',
                    icon: '#icon-facebook',
                    target: '_blank',
                    url: '',
                    click: function(){
                        var left = (screen.width/2)-(300);
                        var top = (screen.height/2)-(300);
                        MyWindow = window.open(popupFactory.setShareUrl('facebook', urlShareParams),
                            'MyWindow',
                            'width=600,height=600,top=' + top + ',left=' + left);
                        return false;
                    }
                },
                {
                    name: 'twitter',
                    caption: ' on Twitter',
                    icon: '#icon-twitter',
                    url: '',
                    click: function(){
                        var left = (screen.width/2)-(300);
                        var top = (screen.height/2)-(150);
                        MyWindow = window.open(popupFactory.setShareUrl('twitter', urlShareParams),
                            'MyWindow',
                            'width=600,height=300,top=' + top + ',left=' + left);
                        return false;
                    },
                    target: '_blank',
                },
                {
                    name: 'google',
                    caption: 'on Google Plus',
                    icon: '#icon-google',
                    url: popupFactory.setShareUrl('google', urlShareParams),
                    target: '_blank',
                },
                {
                    name: 'pinterest',
                    caption: 'on Pinterest',
                    icon: '#icon-pinterest',
                    url: popupFactory.setShareUrl('pinterest', urlShareParams),
                    target: '_blank',
                },
                {
                    name: 'link',
                    caption: 'get link',
                    icon: '#icon-link',
                    url: '',
                    target: '_self',
                    click: function(){vm.showLinkContainer = !vm.showLinkContainer;}
                },
            ];

        });

        vm.getCurrentUrl = popupFactory.getCurrentUrl;


        /******************************/
        /****** SET THUMBNAILS *******/
        /******************************/

        popupFactory.setThumbs(vm.selFeatData).then(function(dataResponse) {

            var thumbsData = dataResponse.data.rows,
                arr = [], path, layer, difference, label,
                southArr = [],
                northArr = [];

            for (var n = 0; n < thumbsData.length; n++) {

                // Thumbs paths
                path = 'img_prod\/' + thumbsData[n].layer + '\/thumbnail' + thumbsData[n].filepath;
                layer = thumbsData[n].layer;

                if ( layer === 'features' || layer === 'commercial'){
                    path = path + 'image00001.jpg';
                }

                // Thumbs distance filter values
                difference = vm.selFeatData.lin_dist - thumbsData[n].lin_dist;

                // Thumbs labels
                if (Math.abs(difference) < 528){
                    label = Math.floor(Math.abs(difference)) + ' ft';
                } else {
                    label = Math.abs(Math.round(difference / 5280 * 100)/100) + ' mi';
                    label = label.replace(/^[0]+/g,"");
                }

                arr.push({
                    path: path,
                    diff: Math.abs(difference),
                    label: label,
                    attribs: thumbsData[n],
                });

                if (difference > 0){
                    southArr.push({
                        path: path,
                        diff: difference,
                        label: label,
                        attribs: thumbsData[n],
                    });
                } else {
                    northArr.push({
                        path: path,
                        diff: difference,
                        label: label,
                        attribs: thumbsData[n],
                    });
                }

            }


            function dynamicSort(property) {
                var sortOrder = 1;
                if(property[0] === "-") {
                    sortOrder = -1;
                    property = property.substr(1);
                }
                return function (a,b) {
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            }

            arr.sort(dynamicSort("diff"));
            northArr.sort(dynamicSort("-diff"));
            southArr.sort(dynamicSort("diff"));

            $rootScope.thumbsArrays.north = northArr;
            $rootScope.thumbsArrays.south = southArr;
            $rootScope.thumbsArrays.both = arr;

        }).then(function(){

            if ($rootScope.thumbsArrays.current.length < 1){
                $rootScope.updateThumbs('both');
            } else {
                $rootScope.updateThumbs($rootScope.thumbsDirectionModel);
            }

        });

    }

})();

(function() {

    'use strict';

    angular
        .module('popupsModule')
        .factory('popupFactory', popupFactory);

    popupFactory.$inject = ['$rootScope', '$http', 'cdbValues', '$location', '$sce'];

    function popupFactory($rootScope, $http, cdbValues, $location, $sce){

        var defaultImg = 'sbht-i-map/img_prod/features/mid_size/n00/wdune-climb/image00009.jpg';

        var factory = {
            clearTempMarker: clearTempMarker,
            defaultImg: defaultImg,
            distFromDuneClimb: distFromDuneClimb,
            fbShareDialog: fbShareDialog,
            findSecondary: findSecondary,
            getCurrentUrl: getCurrentUrl,
            getCommTypes: getCommTypes,
            getNearest: getNearest,
            getNonPoiNarrative: getNonPoiNarrative,
            setShareUrl: setShareUrl,
            setThumbs: setThumbs,
            trustHtml: trustHtml,
            trustMedia: trustMedia,
        };

        /* Look for secondary images */
        function findSecondary(data){

            var suffix = data.layer + '\/mid_size' + data.filepath,
                phpQuery = 'get-images.php?dir=' + suffix,
                query = phpQuery;

            return $http({
                method: 'GET',
                url: query,
            });

        }

        function setThumbs(params){

            var query,
                commArr = [],
                commQuery,
                coords = [params.lat, params.lon],
                states = $rootScope.queryStates,
                shared = cdbValues.sharedQueries,
                sharedSeasons = "substring(seasons," + states.season + ",1) = 'y'",
                sql = shared.sql + " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist,",
                end = " ORDER BY dist LIMIT 50",
                nonPoiStatus = {
                    faces: states.faces,
                    trail_condition: '',
                    trail_pix: '',
                },
                queries = {
                    commercial: "",
                    faces: "",
                    trail_pix: "",
                    trail_condition: "",
                },
                skipCurrentCdbId = {
                    commercial: "",
                    faces: "",
                    features: "",
                    trail_pix: "",
                    trail_condition: "",
                };

            skipCurrentCdbId[params.layer] = " AND cartodb_id != " + params.cartodb_id;

            // Features
            var featQuery = sql +
                    " 'features' AS layer" +
                    " FROM features WHERE type IN(" + states.features + ")" +
                    " AND " + sharedSeasons + skipCurrentCdbId.features;

            // Commercial
            for (var n = 0; n < states.commercial.length; n++) {

                if (n === 0) {
                    commArr.push(" WHERE (substring(commercial.categories," + states.commercial[n] + ",1) = 'y'");
                } else {
                    commArr.push(" OR substring(commercial.categories," + states.commercial[n] + ",1) = 'y'");
                }
            }

            commQuery = commArr.join("") + ")";

            commQuery = ' UNION ALL ' + sql +
                    " 'commercial' AS layer" +
                    " FROM commercial" + commQuery +
                    " AND " + sharedSeasons + skipCurrentCdbId.commercial;


            // Trail pics
            if (states.trail_pix){
                if (params.layer === 'trail_pix'){
                    queries.trail_pix = ' UNION ALL ' + sql +
                    " 'trail_pix' AS layer" +
                    " FROM trail_pix" +
                    " WHERE cartodb_id != " + params.cartodb_id +
                    " AND " + sharedSeasons;
                } else {
                    queries.trail_pix = ' UNION ALL ' + sql +
                    " 'trail_pix' AS layer" +
                    " FROM trail_pix WHERE " + sharedSeasons;
                }
            }

            // Trail condition
            if (states.trail_condition){
                if (params.layer === 'trail_condition'){
                    queries.trail_condition = ' UNION ALL ' + sql +
                    " 'trail_condition' AS layer" +
                    " FROM trail_condition" +
                    " WHERE cartodb_id != " + params.cartodb_id;
                } else {
                    queries.trail_condition = ' UNION ALL ' + sql +
                    " 'trail_condition' AS layer" +
                    " FROM trail_condition";
                }
            }

            // Faces
            if (states.faces){
                if (params.layer === 'faces'){
                    queries.faces = ' UNION ALL ' + sql +
                    " 'faces' AS layer" +
                    " FROM faces" +
                    " WHERE cartodb_id != " + params.cartodb_id;
                } else {
                    queries.faces = ' UNION ALL ' + sql +
                    " 'faces' AS layer" +
                    " FROM faces";
                }
            }

            query = shared.url + featQuery + commQuery + queries.faces + queries.trail_pix + queries.trail_condition + end;

            return $http({
                method: 'GET',
                url: query,
            });

        }

        /* When trail is clicked on... */
        function getNearest (coords){

            var query = ' ',
                states = $rootScope.queryStates,
                shared = cdbValues.sharedQueries,
                sql = shared.sql + " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist,",
                seasonsString = "substring(seasons," + states.season + ",1) = 'y'",
                end = " ORDER BY dist LIMIT 1",
                nonPoiQueries = {
                    faces: "" +
                        " '' AS seasons, 'faces' AS type," +
                        " 'Faces Along the Trail' AS name," +
                        " 'Faces' AS type_name," +
                        " 'faces' AS layer FROM faces",
                    trail_pix: "" +
                        " seasons, 'camera' AS type," +
                        " 'Trail Snapshot' AS name," +
                        " 'Trail Photos' AS type_name," +
                        " 'trail_pix' AS layer" +
                        " FROM trail_pix WHERE " + seasonsString,
                    trail_condition: "" +
                        " '' AS seasons, 'trail-cond' AS type," +
                        " 'Current Ski Conditions' AS name," +
                        " 'Ski Conditions' AS type_name," +
                        " 'trail_condition' AS layer FROM trail_condition"
                },
                nonPoiShared = "" +
                    " UNION ALL" +
                    " SELECT" +
                        " cartodb_id, the_geom, the_geom_webmercator," +
                        " FLOOR(ST_Distance(the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                        " ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat," +
                        " lin_dist, filepath, ";

            // Loop through non-POI queries, keep query if state is on, otherwise ""
            for (var n in nonPoiQueries){

                if (states[n]){
                    nonPoiQueries[n] = nonPoiShared + nonPoiQueries[n];
                } else {
                    nonPoiQueries[n] = "";
                }

                query = query + nonPoiQueries[n];

            }

            // Features
            var featQuery = "" +
                "SELECT" +
                    " features.cartodb_id, features.the_geom, features.the_geom_webmercator," +
                    " FLOOR(ST_Distance(features.the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                    " ST_X(features.the_geom) AS lon, ST_Y(features.the_geom) AS lat," +
                    " features.lin_dist, features.filepath, features.seasons," +
                    " features.type," +
                    " features.name," +
                    " feature_types.name AS type_name," +
                    " 'features' AS layer" +
                " FROM features INNER JOIN feature_types" +
                " ON features.type=feature_types.type" +
                " WHERE " + seasonsString +
                " AND features.type IN(" + states.features + ")";

            // Commercial
            var commQuery = "" +
                " UNION ALL" +
                " SELECT" +
                    " commercial.cartodb_id, commercial.the_geom, commercial.the_geom_webmercator," +
                    " FLOOR(ST_Distance(commercial.the_geom::geography,CDB_LatLng(" + coords + ")::geography) * 3.28084) AS dist," +
                    " ST_X(commercial.the_geom) AS lon, ST_Y(commercial.the_geom) AS lat," +
                    " commercial.lin_dist, commercial.filepath, commercial.seasons," +
                    " commercial.type," +
                    " commercial.name," +
                    " commercial_types.name AS type_name," +
                    " 'commercial' AS layer" +
                " FROM commercial" +
                " INNER JOIN commercial_types ON commercial.type=commercial_types.type" +
                " WHERE " + seasonsString +
                " AND category_int IN (" + states.commercial + ")";

            query = shared.url + featQuery + commQuery + query + end;

            return $http({
                method: 'GET',
                url: query,
            });

        }

        /* Clear temp marker */
        function clearTempMarker(map, mapLayers){

            /***** Remove if already present *****/
            for (var i in mapLayers){
                if (mapLayers[i].options.temp){
                    map.removeLayer(mapLayers[i]);
                }
            }

        }

        /* Trust URLs */
        function trustMedia (html_code, isVideo){
            if (isVideo) {
                html_code = html_code + '?rel=0&modestbranding=1&autohide=1';
            }
            return $sce.trustAsResourceUrl(html_code);
        }

        /* Trust HTMLs */
        function trustHtml (html_code){
            return $sce.trustAsHtml(html_code);
        }

        /* Get Commercial types */
        function getCommTypes(types){

            var commTypesArr = [];

            for (var i = 0; i < types.length; i++) {
                if (types.charAt(i) === 'y'){
                    commTypesArr.push(i + 1);
                }
            }

            var query = "" +
                "https://remcaninch.cartodb.com/api/v2/sql?q=" +
                "SELECT category_int, name, type FROM commercial_types" +
                " WHERE category_int IN (" + commTypesArr + ")";

            return $http({
                method: 'GET',
                url: query
            });

        }

        /* Distance from Dune Climb */
        function distFromDuneClimb(dist){

            var difference = 35460 - dist,
                text;

            // North/South
            if (difference >= 0) {
                text = 'south';
            } else {
                text = 'north';
            }

            // Labels
            if (Math.abs(difference) < 528){
                text = Math.abs(difference) + ' feet ' + text;
            } else {
                text = Math.abs(Math.round(difference / 5280 * 100)/100) + ' mile(s) ' + text;
            }

            return "Approx. " + text + " of the Dune Climb ";

        }


        /* Encode URLs */
        function encodeUrls(url){
            var test = encodeURIComponent(url);
            return test;
        }

        /* FB Share Prompt */
        function fbShareDialog(params) {

            FB.ui({
                link: params.url,
                picture: decodeURIComponent(params.img),
                caption: params.caption,
                name: params.name,
                description: params.description,
                method: 'feed',
                display: 'popup'
            });

         }

        /* Get correct URL, even if via FB */
        function getCurrentUrl(){
            var url = "http://" + $location.$$host + "/sbht-i-map" + $location.$$url;
            return url;
        }

        /* Social links */
        function setShareUrl(medium, params) {

            var shareUrl = {
                    email: "mailto:?subject=" + $rootScope.metaInfo.title +
                    "&body=Check out this location on the Sleeping Bear Heritage Trail Interactive Map: " + getCurrentUrl(),
                    facebook: 'https://www.facebook.com/sharer/sharer.php?' +
                    'u=' + encodeURIComponent(params.url),
                    google: 'https://plus.google.com/share?url=' + encodeURIComponent(params.url),
                    link: '#',
                    pinterest: 'http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(params.url) +
                        '&media=' + params.img +
                        '&description=' + params.description.substr(0,490),
                    twitter: "https://twitter.com/intent/tweet?text=" + params.description.substr(0,90) + "..." +
                        "&url=" + encodeURIComponent(params.url) + "&hashtags=SleepingBear,Michigan"
                };

            return shareUrl[medium];

        }

        /* Load help data */
        function getNonPoiNarrative(layer){
            var query = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT name_id, narrative FROM help" +
                " WHERE name_id = '" + layer + "'";

            return $http({
                method: 'GET',
                url: query
            });
        }

    	return factory;
    }

})();

(function() {

    'use strict';

    angular.module('mapApp')
        .config(['paginationTemplateProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function(paginationTemplateProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

            // Nothing to do w/routes, but set pagination template:
            var pagPath = 'src/app/vendor/dirPagination.tpl.html';
            paginationTemplateProvider.setPath(pagPath);

            // Check if kiosk
            var k = window.location.href.indexOf('kiosk'),
                path;

            if (k > 0){
                path = '/kiosk/';
            } else {
                path = '/';
            }

            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise(path);

            $stateProvider
                .state('popup', {
                    url: path,
                    template: '<div ui-view></div>',
                })
                .state('position', {
                    url: '/position/:lat/:lon',
                    controller: 'PositionCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        currentPositionLatLng: ['$stateParams', function($stateParams) {
                            return [$stateParams.lat, $stateParams.lon];
                        }]
                    }
                })
                .state('popup.poi', {
                    url: 'popup/:layer/:cartodb_id',
                    templateUrl: 'src/app/popups/templates/popup.html',
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    params: {
                        lat: 0,
                        lon: 0,
                        seasons: 3,
                        filepath: '',
                    },
                    resolve: {

                        selFeatData: ['$http', '$stateParams', function($http, $stateParams) {

                            // Common
                            var sp = $stateParams,
                                query,
                                queryPrefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT ',
                                sharedPrefix = "" +
                                    queryPrefix + "cartodb_id, the_geom, filepath, lin_dist, '" +
                                    sp.layer + "' AS layer," +
                                    " ROUND(ST_X(the_geom)::numeric, 5) AS lon," +
                                    " ROUND(ST_Y(the_geom)::numeric, 5) AS lat,",
                                sharedSuffix = " FROM " + sp.layer + " WHERE cartodb_id = " + sp.cartodb_id;

                            // Features
                            var featQuery = "" +
                                queryPrefix +
                                ' "features"."cartodb_id", ' +
                                ' "features"."the_geom", ' +
                                ' "features"."the_geom_webmercator",' +
                                ' ROUND(ST_X("features"."the_geom")::numeric, 5) AS lon,' +
                                ' ROUND(ST_Y("features"."the_geom")::numeric, 5) AS lat,' +
                                ' "features"."filepath", "features"."lin_dist", "features"."available",' +
                                ' "features"."type", "features"."name",' +
                                ' "features"."video_link", "features"."audio_link",' +
                                ' \'features\' AS layer,' +
                                ' (SELECT "type" AS "type_id" FROM feature_types WHERE "features"."type" = "feature_types"."type"),' +
                                ' (SELECT "name" AS "type_name" FROM feature_types WHERE "features"."type" = "feature_types"."type"),' +
                                ' (SELECT "narrative" FROM "narratives" WHERE "features"."filepath" = "narratives"."filepath")' +
                                ' FROM "features"' + '\n' +
                                ' WHERE "features"."cartodb_id" = ' + sp.cartodb_id + ' AND' +
                                ' ("features"."type" IS NOT NULL OR "features"."filepath" IS NOT NULL)';

                            // Commercial
                            var commQuery = "" +
                                queryPrefix +
                                ' "commercial"."cartodb_id", "commercial"."the_geom",' +
                                ' "commercial"."the_geom_webmercator",' +
                                ' ROUND(ST_X("commercial".the_geom)::numeric, 5) AS "lon",' +
                                ' ROUND(ST_Y("commercial".the_geom)::numeric, 5) AS "lat",' +
                                ' "commercial"."filepath", "commercial"."lin_dist", "commercial"."available",' +
                                ' "commercial"."address", "commercial"."city", "commercial"."phone", "commercial"."website", "commercial"."zip", "commercial"."categories",' +
                                ' "commercial"."type", "commercial"."name",' +
                                ' "commercial"."video_link", "commercial"."audio_link",' +
                                ' \'commercial\' AS layer,' +
                                ' (SELECT "type" AS type_id FROM commercial_types WHERE "commercial"."type" = "commercial_types"."type"),' +
                                ' (SELECT "name" AS type_name FROM commercial_types WHERE "commercial"."type" = "commercial_types"."type"),' +
                                ' (SELECT "narrative" FROM "narratives" WHERE "commercial"."filepath" = "narratives"."filepath")' +
                                ' FROM "commercial"' +
                                ' WHERE "commercial"."cartodb_id" = ' + sp.cartodb_id + ' AND' +
                                ' ("commercial"."type" IS NOT NULL OR "commercial"."filepath" IS NOT NULL)';

                                var queries = {
                                    features: featQuery,
                                    commercial: commQuery,
                                    faces: "" +
                                        sharedPrefix +
                                        " 'faces' AS type," +
                                        " 'Faces Along the Trail' AS name," +
                                        " 'Faces' AS type_name" +
                                        sharedSuffix,
                                    trail_pix: "" +
                                        sharedPrefix +
                                        " 'camera' AS type," +
                                        " 'Trail Snapshot' AS name," +
                                        " 'Trail Photos' AS type_name" +
                                        sharedSuffix,
                                    trail_condition: "" +
                                        sharedPrefix +
                                        " 'trail-cond' AS type," +
                                        " 'Current Ski Conditions' AS name," +
                                        " 'Ski Conditions' AS type_name" +
                                        sharedSuffix,
                                };

                            query = queries[sp.layer];

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    },
                });

        }]);

})();

(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .controller('CtrlsCtrl', CtrlsCtrl);

    CtrlsCtrl.$inject = ['mapFactory', '$scope', 'kioskFactory'];

    function CtrlsCtrl(mapFactory, $scope, kioskFactory){

        var vm = this,
            map = mapFactory.map,
            tileLayers = mapFactory.tileLayers;

        vm.map = mapFactory.map;

        // Toggle bg tiles layer
        vm.bgId = '#icon-tree';
        vm.showAerial = false;

        // Locate
        mapFactory.addGps(map);

        var gpsBtn = angular.element( document.querySelector( '.gps-button' ) );

        gpsBtn.bind('click', function() {
            $scope.$apply(function(){
                vm.gpsIsActive = !vm.gpsIsActive;
            });
        });


        /***** Back/history *****/
        vm.historyControl = new L.HistoryControl({
            useExternalControls: true,
        }).addTo(map);

        // Enabled
        map.on('historybackenabled',function(){
            $scope.safeApply(function(){
                vm.backEnabled = !vm.backEnabled;
            });
        });

        // Disabled
        map.on('historybackdisabled',function(){
            $scope.safeApply(function(){
                vm.backEnabled = !vm.backEnabled;
            });
        });

        // Get rid of the 'digest cycle' errors
        $scope.safeApply = function(fn) {
          var phase = this.$root.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };

        // Zoom to home extent
        vm.zoomHome = function(){
            mapFactory.zoomHome(map);
        };

        // Reset map defaults
        vm.reloadMap = function(){
            mapFactory.reloadMap();
        };

        // Change background layer
        vm.changeTiles = function(){

            vm.showAerial = !vm.showAerial;

            if (vm.showAerial) {
                vm.bgId = '#icon-mountain';
                map.removeLayer(tileLayers.terrain);
                map.addLayer(tileLayers.aerial);
                tileLayers.aerial.bringToBack();
            } else {
                vm.bgId = '#icon-tree';
                map.removeLayer(tileLayers.aerial);
                map.addLayer(tileLayers.terrain);
                tileLayers.terrain.bringToBack();
            }

        };


    }

})();

(function() {

    'use strict';

    angular
        .module('ctrlsModule')
        .directive('mapControls', mapControls);

    function mapControls(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/ctrls/templates/ctrlsTemplate.html',
            controller: 'CtrlsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelInfo', panelInfo);

    function panelInfo(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.info.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelFeatures', panelFeatures);

    function panelFeatures(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.poi.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelSeasons', panelSeasons);

    function panelSeasons(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.seasons.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panelTrail', panelTrail);

    function panelTrail(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/panels/templates/panel.trail.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['panelsFactory', '$rootScope', '$http', '$state', 'layersFactory', '$sce', 'popupFactory'];

    function PanelsCtrl(panelsFactory, $rootScope, $http, $state, layersFactory, $sce, popupFactory){

    	var vm = this;

        //////// PANELS \\\\\\\\

        // Close it when any feature clicked
        $rootScope.$on('featureClicked',function(){
            vm.activePanel = '';
        });

        vm.changePanel = function(panel){

            if (vm.activePanel === panel){
                vm.activePanel = '';
            } else {
                vm.activePanel = panel;
            }

            // Close popup
            $state.go('popup', {
            },{
                reload: true
            });

        };

        //////// SEASONS PANEL \\\\\\\\
        vm.activeSeason = $rootScope.queryStates.season;
        vm.activeSeasonIcon = 'summer';

        // Close Seasons panel when season is clicked
        vm.setSeason = function(season){
            vm.activePanel   = '';
            $rootScope.queryStates.season = season;

            var seasonsQueries = {
                1: 'winter',
                2: 'spring',
                3: 'summer',
                4: 'fall',
            };

            vm.activeSeasonIcon = seasonsQueries[$rootScope.queryStates.season];

            panelsFactory.setSeason(season);

        };

        //////// POI VIEWS \\\\\\\\

        // Pages/views
        vm.featSubGroups = null;
        vm.commSubGroups = null;
        vm.allFeatTypes = null;
        vm.allCommTypes = null;

        panelsFactory.getSubGroups('feat').then(function(dataResponse) {

            var subGroups = dataResponse.data.rows;

            getPoiTypes(subGroups, 'feat');

        });

        panelsFactory.getSubGroups('comm').then(function(dataResponse) {

            var subGroups = dataResponse.data.rows;

            getPoiTypes(subGroups, 'comm');

        });

        function getPoiTypes(subGroups, table){

            var sg = subGroups;

            panelsFactory.getPoiPages(table).then(function(dataResponse) {

                var types = dataResponse.data.rows;

                // Add a 'types' attribute to each record
                // and give it an empty array
                for (var z = 0; z < sg.length; z++) {
                    sg[z].types = [];
                }

                // Add 'icon' and 'id' attributes and assign subgroup
                for (var i = 0; i < sg.length; i++) {
                    for (var n = 0; n < types.length; n++) {
                        types[n].icon = "#icon-" + types[n].type;
                        types[n].id = table + "-" + types[n].type;

                        if (sg[i].sub_group === types[n].sub_group){
                            sg[i].types.push(types[n]);
                        }
                    }
                }

                if (table === 'feat'){
                    vm.featSubGroups = sg;
                } else {
                    vm.commSubGroups = sg;
                }

            });

        }

        // Change POI toggle view
        vm.activePoiPage = 'Home';
        vm.activePoiPageIcon = '#icon-map-pin';
        vm.activePoiPageTitle = 'Points of Interest';

        vm.setActivePoiPage = function(page){

            vm.activePoiPage = page;

            if (page === 'Home'){
                vm.activePoiPageTitle = 'Points of Interest';
                vm.activePoiPageIcon = '#icon-map-pin';
            } else {
                vm.activePoiPageTitle = page;
                vm.activePoiPageIcon = '#icon-back';
            }

        };

        vm.selectedCommTypes = [];
        vm.selectedFeatTypes = [];

        // Update SQL when feature toggled
        vm.toggleFeatures = function(type){

            var withQuotes = "'" + type + "'";
            var idx = vm.selectedFeatTypes.indexOf(withQuotes),
                mainPtsCheck = vm.selectedFeatTypes.indexOf("'mainpoints'");

            // is currently selected
            if (idx > -1) {
                vm.selectedFeatTypes.splice(idx, 1);
            }

            // is newly selected
            else {
                vm.selectedFeatTypes.push("'" + type + "'");
            }

            // Put mainpoints back in if features array empty
            if (mainPtsCheck <= 0) {
                vm.selectedFeatTypes.push("'mainpoints'");
            }

            panelsFactory.toggleFeatures(vm.selectedFeatTypes);

        };

        vm.toggleCommercial = function(type){

            var idx = vm.selectedCommTypes.indexOf(type);

            // is currently selected
            if (idx > -1) {
                vm.selectedCommTypes.splice(idx, 1);
            }

            // is newly selected
            else {
                vm.selectedCommTypes.push(type);
            }

            panelsFactory.toggleCommercial(vm.selectedCommTypes);

        };

        vm.selSubGroupCount = function(sublayer, i){

            var selector = '#' + sublayer + '-subgroup-' + i + ' .poi-type__checkbox:checked',
                count = $(selector);

            if (count) {
                return count.length;
            } else {
                return 0;
            }

        };

        //////// TRAIL PANEL \\\\\\\\

        // Root scope query states
        vm.queryStates = $rootScope.queryStates;

        // Trail pics state
        vm.trailPicsState = $rootScope.queryStates.trail_pix;

        // Faces state
        vm.facesState = $rootScope.queryStates.faces;

        // Grade/caution model attempt
        vm.overlayStates = [
            {name: 'Grade', layer: 'sbht_grade', on: false, icon: '#icon-grade'},
            {name: 'Caution', layer: 'sbht_caution', on: false, icon: '#icon-caution'},
        ];


        // Toggle Grade/caution
        vm.toggleOverlayState = function(overlay){
            layersFactory.toggleOverlayState(overlay);
        };

        // Why is 'data' passed here?
        $rootScope.$on('setDefaults', function(data){

            vm.overlayStates[0].on = false;
            vm.overlayStates[1].on = false;
            vm.trailCondState = false;
            // Why faces not turned off?
            // vm.facesState = false;

        });

        // Toggle trail pics and faces
        vm.togglePicsState = function(layer){

            popupFactory.clearTempMarker(panelsFactory.map, panelsFactory.map._layers);

            $rootScope.queryStates[layer] = !$rootScope.queryStates[layer];

        };

        // Show trail condition button if winter is selected and current month Nov - Mar
        vm.showTrailCondition = function(){

            var d = new Date(),
                month = d.getMonth();

            if (vm.queryStates.season == 1 && ((month <= 2 ) || (month >= 10 ))){
                return true;
            } else {
                return false;
            }

        };


        //////// INFO PANEL \\\\\\\\
        vm.activeInfoPgHeader = 'Help & Info';
        vm.isInfoHomePage = true;
        vm.activeInfoPgIcon = '#icon-info';

        // Enable HTML
        vm.toTrusted = function(html_code) {
            return $sce.trustAsHtml(html_code);
        };


        vm.toggleFeaturesLayer = function(layer){
            panelsFactory.toggleFeaturesLayer(layer);
        };

        vm.setActiveInfoPg = function(page){

            if (page === 'Home'){
                vm.activeInfoPgHeader = 'Help & Info';
            } else {
                vm.activeInfoPgHeader = page;
            }

            vm.isInfoHomePage = !vm.isInfoHomePage;

            vm.activeInfoPg = page;

        };

        panelsFactory.getHelpData().then(function(dataResponse) {

            vm.helpData = dataResponse.data.rows;

        });

    }

})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .directive('panels', panels);

    function panels(){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'src/app/panels/templates/panelsTemplate.html',
            controller: 'PanelsCtrl',
            controllerAs: 'vm',
            replace: true
        };
    }

})();
(function() {

	'use strict';

    angular
        .module('panelsModule')
        .factory('panelsFactory', panelsFactory);

    panelsFactory.$inject = ['$rootScope', '$http', 'layersFactory', 'cdbValues'];

    function panelsFactory($rootScope, $http, layersFactory, cdbValues){

        var selectedTypes = [],
            map = layersFactory.map;

        var factory = {
            getHelpData: getHelpData,
            getPoiPages: getPoiPages,
            getSubGroups: getSubGroups,
            map: map,
            setSeason: setSeason,
            toggleCommercial: toggleCommercial,
            toggleFeatures: toggleFeatures,
        };


        /******************************/
        /****** TOGGLE POI TYPES ******/
        /******************************/
        var sublayers = layersFactory.sublayers;

        function toggleFeatures(types){

            var query,
                states = $rootScope.queryStates,
                featQuery = {
                    start: "SELECT 'features' AS layer," +
                        " features.lin_dist," +
                        " features.the_geom_webmercator," +
                        " features.seasons," +
                        " features.cartodb_id," +
                        " features.type," +
                        " features.filepath," +
                        " feature_types.name AS type_name," +
                        " feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE features.type IN(",
                    end: ") AND substring(features.seasons," + states.season + ",1) = 'y' OR features.type = 'mainpoints' ORDER BY priority DESC",
                    all: ""
                };

            /* When not called from setSeason()... */
            if ( types ){
                /* Make sure mainpoints always present */
                if (states.features.indexOf("'mainpoints'") < 0){
                    types.push("'mainpoints'");
                    $rootScope.queryStates.features = types;
                }
                states.features = types;
                featQuery.all = featQuery.start + types + featQuery.end;
            } else {
                featQuery.all = featQuery.start + states.features + featQuery.end;
            }
            sublayers.features.setSQL(featQuery.all);

        }

        /* Set up commercial substring */
        function toggleCommercial(types){

            var query,
                states = $rootScope.queryStates,
                string = '',
                arr = [],
                commQuery = {
                    start: "SELECT 'commercial' AS layer," +
                        " commercial.lin_dist," +
                        " commercial.the_geom_webmercator," +
                        " commercial.seasons," +
                        " commercial.cartodb_id," +
                        " commercial.categories," +
                        " commercial.type," +
                        " commercial.filepath," +
                        " commercial_types.name AS type_name," +
                        " commercial_types.priority," +
                        " commercial_types.category_int FROM commercial INNER JOIN commercial_types ON commercial.type=commercial_types.type",
                    end: " AND substring(seasons," + states.season + ",1) = 'y' ORDER BY priority DESC",
                    all: ""
                };

            if ( types ){

                /* Make sure 50 always present */
                if (states.commercial.indexOf(50) < 0){
                    types.push(50);
                    $rootScope.queryStates.commercial = types;
                }

                for (var i = 0; i < types.length; i++) {
                    if (i === 0) {
                        arr.push(" WHERE (substring(commercial.categories," + types[i] + ",1) = 'y'");
                    } else {
                        arr.push(" OR substring(commercial.categories," + types[i] + ",1) = 'y'");
                    }
                }

                states.commercial = types;

            } else {  /* When not called from setSeason()... */

                for (var n = 0; n < states.commercial.length; n++) {
                    if (n === 0) {
                        arr.push(" WHERE (substring(commercial.categories," + states.commercial[n] + ",1) = 'y'");
                    } else {
                        arr.push(" OR substring(commercial.categories," + states.commercial[n] + ",1) = 'y'");
                    }
                }

            }

            string = arr.join("") + ")";

            commQuery.all = commQuery.start + string + commQuery.end;

            sublayers.commercial.setSQL(commQuery.all);


        }

        /* Will need to be run by router to keep season toggle accurate*/
        function setSeason(season){

            var newSeason = season;
            $rootScope.activeSeason = newSeason;
            toggleFeatures();
            toggleCommercial();

        }

        /* Load help data */
        function getHelpData(){
            var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT subject, narrative, priority FROM help ORDER BY priority';
            return $http({
                method: 'GET',
                url: query
            });
        }

        // Get feature subgroups
        function getSubGroups (table){
            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT DISTINCT ON (sub_group) sub_group FROM ",
                query;

            if (table == 'feat'){
                query = prefix + "feature_types WHERE type != 'mainpoints'";
            } else {
                query = prefix + "commercial_types";
            }

            return $http({
                method: 'GET',
                url: query,
            });
        }

        // Get POI toggles data
        function getPoiPages (table){

            var prefix = "https://remcaninch.cartodb.com/api/v2/sql?q=SELECT name, sub_group, type, type_desc, priority",
                query;

            if (table === 'feat'){
                query = prefix + " FROM feature_types WHERE type != 'mainpoints'";
            } else {
                query = prefix + ", category_int FROM commercial_types";
            }

            return $http({
                method: 'GET',
                url: query + " ORDER BY priority",
            });

        }

		return factory;

    }


})();
(function() {

    'use strict';

    angular
        .module('panelsModule')
        .filter('svgIconCardHref', SvgFilter);

    SvgFilter.$inject = ['$sce'];

    function SvgFilter ($sce){
      return function(iconCardId) {
        return $sce.trustAsResourceUrl('#icon-' + iconCardId);
      };
    }

})();


/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    var module;
    try {
        module = angular.module(moduleName);
    } catch(err) {
        // named module does not exist, so create one
        module = angular.module(moduleName, []);
    }

    module
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])
        .directive('dirPaginateNoCompile', noCompileDirective)
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])
        .service('paginationService', paginationService)
        .provider('paginationTemplate', paginationTemplateProvider);

    function dirPaginateDirective($compile, $parse, paginationService) {

        return  {
            terminal: true,
            multiElement: true,
            compile: dirPaginationCompileFn
        };

        function dirPaginationCompileFn(tElement, tAttrs){

            var expression = tAttrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRepeat.js#L211
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage\s*:[^|]*/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            addNoCompileAttributes(tElement);

            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.
            var rawId = tAttrs.paginationId || DEFAULT_ID;
            paginationService.registerInstance(rawId);

            return function dirPaginationLinkFn(scope, element, attrs){

                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;
                paginationService.registerInstance(paginationId);

                var repeatExpression = getRepeatExpression(expression, paginationId);
                addNgRepeatToElement(element, attrs, repeatExpression);

                removeTemporaryAttributes(element);
                var compiled =  $compile(element);

                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function() {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 <= result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    scope.$watchCollection(function() {
                        return collectionGetter(scope);
                    }, function(collection) {
                        if (collection) {
                            paginationService.setCollectionLength(paginationId, collection.length);
                        }
                    });
                }

                // Delegate to the link function returned by the new compilation of the ng-repeat
                compiled(scope);
            };
        }

        /**
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.
         *
         * @param expression
         * @param paginationId
         * @returns {*}
         */
        function getRepeatExpression(expression, paginationId) {
            var repeatExpression,
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);

            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:[^|]*)/, "$1 : '" + paginationId + "'");
            } else {
                repeatExpression = expression;
            }

            return repeatExpression;
        }

        /**
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the
         * appropriate multi-element ng-repeat to the first and last element in the range.
         * @param element
         * @param attrs
         * @param repeatExpression
         */
        function addNgRepeatToElement(element, attrs, repeatExpression) {
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)
                attrs.$set('ngRepeatStart', repeatExpression);
                element.eq(element.length - 1).attr('ng-repeat-end', true);
            } else {
                attrs.$set('ngRepeat', repeatExpression);
            }
        }

        /**
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.
         * @param tElement
         */
        function addNoCompileAttributes(tElement) {
            angular.forEach(tElement, function(el) {
                if (el.nodeType === Node.ELEMENT_NODE) {
                    angular.element(el).attr('dir-paginate-no-compile', true);
                }
            });
        }

        /**
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.
         * @param element
         */
        function removeTemporaryAttributes(element) {
            angular.forEach(element, function(el) {
                if (el.nodeType === Node.ELEMENT_NODE) {
                    angular.element(el).removeAttr('dir-paginate-no-compile');
                }
            });
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');
        }

        /**
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.
         *
         * @param scope
         * @param attrs
         * @param paginationId
         * @returns {*}
         */
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {
            var currentPageGetter;
            if (attrs.currentPage) {
                currentPageGetter = $parse(attrs.currentPage);
            } else {
                // if the current-page attribute was not set, we'll make our own
                var defaultCurrentPage = paginationId + '__currentPage';
                scope[defaultCurrentPage] = 1;
                currentPageGetter = $parse(defaultCurrentPage);
            }
            return currentPageGetter;
        }
    }

    /**
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */
    function noCompileDirective() {
        return {
            priority: 5000,
            terminal: true
        };
    }

    function dirPaginationControlsDirective(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        return {
            restrict: 'AE',
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            },
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?'
            },
            link: dirPaginationControlsLinkFn
        };

        function dirPaginationControlsLinkFn(scope, element, attrs) {

            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.
            var rawId = attrs.paginationId ||  DEFAULT_ID;
            var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;

            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                throw 'pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive.';
            }

            if (!scope.maxSize) { scope.maxSize = 9; }
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };
            scope.range = {
                lower: 1,
                upper: 1,
                total: 1
            };

            scope.$watch(function() {
                return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
            }, function(length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function() {
                return (paginationService.getItemsPerPage(paginationId));
            }, function(current, previous) {
                if (current != previous && typeof previous !== 'undefined') {
                    goToPage(scope.pagination.current);
                }
            });

            scope.$watch(function() {
                return paginationService.getCurrentPage(paginationId);
            }, function(currentPage, previousPage) {
                if (currentPage != previousPage) {
                    goToPage(currentPage);
                }
            });

            scope.setCurrent = function(num) {
                if (isValidPageNumber(num)) {
                    num = parseInt(num, 10);
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            function goToPage(num) {
                if (isValidPageNumber(num)) {
                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;
                    updateRangeValues();

                    // if a callback has been set, then call it with the page number as an argument
                    if (scope.onPageChange) {
                        scope.onPageChange({ newPageNumber : num });
                    }
                }
            }

            function generatePagination() {
                var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;

                scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                scope.pagination.current = page;
                scope.pagination.last = scope.pages[scope.pages.length - 1];
                if (scope.pagination.last < scope.pagination.current) {
                    scope.setCurrent(scope.pagination.last);
                } else {
                    updateRangeValues();
                }
            }

            /**
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
             */
            function updateRangeValues() {
                var currentPage = paginationService.getCurrentPage(paginationId),
                    itemsPerPage = paginationService.getItemsPerPage(paginationId),
                    totalItems = paginationService.getCollectionLength(paginationId);

                scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                scope.range.total = totalItems;
            }

            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    /**
     * This filter slices the collection into pages based on the current page number and number of items per page.
     * @param paginationService
     * @returns {Function}
     */
    function itemsPerPageFilter(paginationService) {

        return function(collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (collection instanceof Array) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                return collection.slice(start, end);
            } else {
                return collection;
            }
        };
    }

    /**
     * This service allows the various parts of the module to communicate and stay in sync.
     */
    function paginationService() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function(instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.isRegistered = function(instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function() {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function(instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function(instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function(instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function(instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.isAsyncMode = function(instanceId) {
            return instances[instanceId].asyncMode;
        };
    }

    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'directives/pagination/dirPagination.tpl.html';

        this.setPath = function(path) {
            templatePath = path;
        };

        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                }
            };
        };
    }
})();
//# sourceMappingURL=map-app.js.map