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

                screenSaver();

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

                    // Make CDB link target in same window
                    if (count == 2){
                        $('.cartodb-logo a').attr('target', '_self');
                    }

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