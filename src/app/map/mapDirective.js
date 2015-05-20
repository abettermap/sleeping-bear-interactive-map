(function() {

    'use strict';

    angular
        .module('mapApp')
        .directive('interactiveMap', interactiveMap);

    interactiveMap.$inject = ['mapFactory', 'layersFactory', '$timeout'];

    function interactiveMap(mapFactory, layersFactory, $timeout){

        return {
            restrict: 'E',
            template: '<div class="map" id="map"></div>',
            replace: true,
            controller: function(){

                // // Cookies for temp map beta disclaimer
                // function setCookie(cname,cvalue) {
                //     var expires = "expires=Fri, 22 May 2015 00:00:00 UTC";
                //     document.cookie = cname+"="+cvalue+"; "+expires;
                // }

                // function getCookie(cname) {
                //     var name = cname + "=";
                //     var ca = document.cookie.split(';');
                //     for(var i=0; i<ca.length; i++) {
                //         var c = ca[i];
                //         while (c.charAt(0)==' ') c = c.substring(1);
                //         if (c.indexOf(name) == 0) {
                //             return c.substring(name.length, c.length);
                //         }
                //     }
                //     return "";
                // }

                // function checkCookie() {
                //     var visitedStatus = getCookie("map visited");
                //     if (visitedStatus !== "") {
                //         // console.log("Welcome back");
                //         // ngDialog.open({ template: 'src/app/map/beta-disclaimer.html' });
                //     } else {
                //         ngDialog.open({ template: 'src/app/map/beta-disclaimer.html' });
                //         setCookie("map visited", 1);
                //         $timeout(function() {
                //             $('#ngdialog1').scrollTop(0);
                //         }, 500);
                //     }
                // }

                // checkCookie();

                mapFactory.createMap();
                layersFactory.createCdbLayers(mapFactory.map);

            }
        };

    }

})();