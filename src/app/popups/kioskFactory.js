(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('kioskFactory', kioskFactory);

    kioskFactory.$inject = ['$http', '$rootScope', 'layersFactory'];

    function kioskFactory($http, $rootScope, layersFactory){

        var factory = {
            disableLinks: disableLinks,
            mousetimeout: null,
            screensaverActive: false,
        };

        // Disable outbound links if kiosk
        function disableLinks(){

            // Change 'test' to 'kiosk' later
            var i = window.location.href.indexOf('test');
            var k = window.location.href.indexOf('kiosk');

            if (k > 0){
                console.log("kiosk is in URL");
                var css = '' +
                    '.disable-outbound-links a {' +
                      'color: inherit !important;' +
                      'text-decoration: none !important;' +
                      'pointer-events: none !important;' +
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

            }

            // Start screensaver if kiosk
            if (i > 0){
                document.getElementById('map-wrapper').addEventListener("touchstart", screenSaver);
                document.getElementById('map-wrapper').addEventListener("touchend", screenSaver);
                document.getElementById('map-wrapper').addEventListener("touchmove", screenSaver);
                document.getElementById('map-wrapper').addEventListener("mousemove", screenSaver);
            }

        }

        function screenSaver(){

            clearInterval(factory.mousetimeout);

            if (factory.screensaverActive) {
                factory.screensaverActive = false;
            }

            factory.mousetimeout = setInterval(function(){
                factory.screensaverActive = true;
                resetMapDefaults();
            }, 5000);

        }

        function resetMapDefaults(){

            // Zoom to 12
            layersFactory.map.setZoom(12);

            // Uncheck all POI toggles, faces, trail_condition
            var checkBoxes = $('.poi-type__checkbox, #faces-toggle');
            [].forEach.call(checkBoxes, uncheckBoxes);

            // Make sure trail pics are on
            var isTrailPixChecked = $('#trail-pics-toggle').prop('checked');

            if (!isTrailPixChecked){
                $('#trail-pics-toggle').click();
            }

            // Click spring
            $('#spring-toggle').click();


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

            // Go to random feature
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

                // Create URL
                var newUrl = window.location.origin + window.location.pathname + '#\/popup\/' +
                    subs[randomSub] + '\/' + randomId;

                // Go to URL
                window.location.href = newUrl;

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