(function() {

    'use strict';

    angular.module('mapApp')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        // .config(['$stateProvider', '$urlRouterProvider', 'basePath', function($stateProvider, $urlRouterProvider, basePath) {
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

            $urlRouterProvider.otherwise('/');

            $stateProvider
                
                // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/',
                    templateUrl: getAppPath('/config/homeTemplate.html'),
                    // controller: PopupCtrl
                })
                .state('home.comm', {
                    url: 'comm-poi',
                    templateUrl: getAppPath('/popups/templates/comm-poi-template.html')
                })
                .state('home.nps', {
                    url: '/nps-poi/{name}',
                    templateUrl: getAppPath('/popups/templates/nps-poi-template.html'),
                    controller: function($stateParams){
                       $stateParams.contactId  //*** Exists! ***//
                    }
                })
                .state('home.sbht', {
                    url: 'sbht-poi',
                    templateUrl: getAppPath('/popups/templates/sbht-poi-template.html'),
                })
                .state('home.trail-pix', {
                    url: 'trail-pix',
                    templateUrl: getAppPath('/popups/templates/trail-pix-template.html'),
                });

            // $locationProvider.html5Mode({
            //   enabled: true,
            //   requireBase: false,
            //   rewriteLinks: true
            // });
            // $locationProvider.hashPrefix('!');

        }]);

})();

