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

            // Make these constants later...
            var queryPrefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT ',
                midString = 'WHERE cartodb_id = ';

            $urlRouterProvider.otherwise('/');

            $stateProvider                
                .state('home', {
                    url: '/',
                    template: '<div ui-view></div>',
                })
                .state('home.comm-poi', {
                    url: 'comm-poi/:id/:mile',
                    templateUrl: getAppPath('/popups/templates/comm-poi-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        features: ['$http', '$stateParams', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name, audio, video FROM comm_poi_master ',
                                query = queryPrefix + columns + midString + $stateParams.id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    }
                })
                .state('home.nps-poi', {
                    url: 'nps-poi/:id/:mile',
                    templateUrl: getAppPath('/popups/templates/nps-poi-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        features: ['$http', '$stateParams', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name FROM nps_poi_giscloud ',
                                query = queryPrefix + columns + midString + $stateParams.id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });


                        }],
                    }
                })
                .state('home.sbht-poi', {
                    url: 'sbht-poi/:id/:mile',
                    templateUrl: getAppPath('/popups/templates/sbht-poi-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        features: ['$http', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name FROM sbht_poi_digitize ',
                                query = queryPrefix + columns + midString + $stateParams.id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    }
                })
                .state('home.trail-pix', {
                    url: 'trail-pix/:id/:mile',
                    templateUrl: getAppPath('/popups/templates/trail-pix-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        features: ['$http', function($http) {
                            return $http.get('https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM trail_pix_digitize')
                                .then(function(response){
                                    return response.data;
                                });
                        }],
                    }
                });

        }]);

})();
