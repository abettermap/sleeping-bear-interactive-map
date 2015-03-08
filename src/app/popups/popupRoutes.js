(function() {

    'use strict';

    angular.module('mapApp')
        .config(['$stateProvider', '$urlRouterProvider', 'basePath', function($stateProvider, $urlRouterProvider, basePath) {

            // Make these constants later...
            var queryPrefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT ',
                midString = 'WHERE cartodb_id = ';

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    template: '<div ui-view></div>',
                })
                .state('home.commercial', {
                    url: 'commercial/:id/:mile',
                    templateUrl: basePath.url('app/popups/templates/comm-poi-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        features: ['$http', '$stateParams', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name, audio, video FROM commercial ',
                                query = queryPrefix + columns + midString + $stateParams.id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    }
                })
                .state('home.features', {
                    url: 'features/:id/:mile',
                    templateUrl: basePath.url('app/popups/templates/nps-poi-template.html'),
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        features: ['$http', '$stateParams', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name FROM features ',
                                query = queryPrefix + columns + midString + $stateParams.id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });


                        }],
                    }
                })
                .state('home.trail-pix', {
                    url: 'trail-pix/:id/:mile',
                    templateUrl: basePath.url('app/popups/templates/trail-pix-template.html'),
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
