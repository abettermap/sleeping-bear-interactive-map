(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('BetaDisclaimerCtrl', BetaDisclaimerCtrl);

    BetaDisclaimerCtrl.$inject = ['ngDialog'];

    function BetaDisclaimerCtrl(ngDialog){

        $('.leaflet-tile-container.leaflet-zoom-animated').click();

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
                console.log("Welcome again");
            } else {
                ngDialog.open({ template: 'src/app/map/beta-disclaimer.html' });
                console.log("first timer");
               setCookie("map visited", 1);
            }
        }

        checkCookie();

    }

})();