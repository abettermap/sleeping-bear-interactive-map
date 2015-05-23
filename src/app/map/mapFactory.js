(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('mapFactory', mapFactory);

    mapFactory.$inject = ['$http'];

    function mapFactory($http){

        var tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
        };

        var factory = {
            createMap: createMap,
            disableLinks: disableLinks,
            map: {},
            screenSaver: screenSaver,
            tileLayers: tileLayers,
            zoomHome: zoomHome,
        };

        var leafletDefaults = {
            attribution: false,
            zoomControl: false,
            layers: tileLayers.terrain
        };

        function zoomHome(map){
            var empireBeach = L.latLng(44.8123, -86.0681),
                portOneida = L.latLng(44.9394, -85.9374),
                center = L.latLng(44.87585, -86.00275);
            map.fitBounds([
                [empireBeach],
                [portOneida]
            ]);
        }

        function createMap(){
            factory.map = L.map('map', leafletDefaults);
            factory.zoomHome(factory.map);
        }

        // Disable outbound links if kiosk
        function disableLinks(){

            var i = window.location.href.indexOf('kiosk');

            if (i < 0){
               return;
            } else {
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
                factory.screenSaver();
            }

        }

        /* TAKE THIS BACK OUT AFTER TESTING */
        screenSaver();

        // Start screensaver if kiosk
        function screenSaver(){

            var mousetimeout,
                screensaver_active,
                keepGoing;

            /* Mouse events */
            $(document).mousemove(function(){
                clearInterval(mousetimeout);
                if (screensaver_active) {
                    screensaver_active = false;
                }
                mousetimeout = setInterval(function(){
                    screensaver_active = true;
                    goToPopup();
                }, 3000);
            });

            // mousetimeout = setTimeout(function(){
            //     screensaver_active = true;
            //     goToPopup();
            // }, 2000);

            function goToPopup(){
                var subs = ['features', 'commercial', 'trail_pix'];
                var randomSub = Math.floor(Math.random() * 3);

                var cdbId;
                if (screensaver_active) {
                    getRandomCdbId(subs[randomSub]).then(function(dataResponse) {
                        cdbId = dataResponse.data.rows[0].id;
                        console.log(cdbId);

                        // window.location.href = 'http://friendsofsleepingbear.org/sbht-i-map/kiosk.php';
                        var newUrl = 'http://localhost:3000/sbht-i-map/#/popup/' + subs[randomSub] + '\/' + cdbId;
                        window.location.href = newUrl;
                    });
                }

            }

            function getRandomCdbId(table){
                var query = 'https://remcaninch.cartodb.com/api/v2/sql?q=' +
                    ' SELECT cartodb_id AS id FROM ' + table +
                    ' WHERE ' +
                      ' random() < 1000 / (SELECT COUNT(1) FROM ' + table + ')::float' +
                    ' ORDER by random()' +
                    ' LIMIT 1';

                return $http({
                    method: 'GET',
                    url: query,
                });
            }


        }


        return factory;

    }

})();