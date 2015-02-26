(function() {

    'use strict';

    angular.module('panelsModule')
        .config(['$stateProvider', '$urlRouterProvider', wtf]);

        function wtf($stateProvider, $urlRouterProvider) {
        
            function getAppPath(suffix){
                var scripts = document.getElementsByTagName("script"),
                    item,
                    basePath;
                for (var i = 0, len = scripts.length; i < len; i++) {
                    item = scripts[i];
                    if (item.src.indexOf('map-app') !== -1){
                        basePath = item.src;
                        var name = basePath.split('/').pop(); 
                        basePath = basePath.replace('/'+name,"");
                        break;
                    }
                }
                return basePath + suffix;
            }

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                
                // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/home',
                    templateUrl: getAppPath('/config/homeTemplate.html')
                })
                .state('home.popup', {
                    url: '/popup',
                    templateUrl: getAppPath('/popups/templates/popupTemplate.html')
                });

            // $locationProvider.html5Mode({
            //   enabled: true,
            //   requireBase: false,
            //   rewriteLinks: true
            // });
            // $locationProvider.hashPrefix('!');

        }

})();