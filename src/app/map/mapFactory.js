(function() {

    'use strict';

    angular
        .module('mapApp')
        .factory('mapFactory', mapFactory);

    function mapFactory(){

        var map = {};

        var tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
        };

        var leafletDefaults = {
            attribution: false,
            zoomControl: false,
            layers: tileLayers.terrain
        };

        var mapFactory = {
            createMap: createMap,
            map: map,
            tileLayers: tileLayers,
            zoomHome: zoomHome,
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

            mapFactory.map = L.map('map', leafletDefaults);

            mapFactory.zoomHome(mapFactory.map);

        }

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
                console.log("Welcome back");
                // ngDialog.open({ template: 'src/app/map/beta-disclaimer.html' });
            } else {
                ngDialog.open({ template: 'src/app/map/beta-disclaimer.html' });
                setCookie("map visited", 1);
                $timeout(function() {
                    $('#ngdialog1').scrollTop(0);
                }, 500);
            }
        }

        checkCookie();

        return mapFactory;

    }

})();