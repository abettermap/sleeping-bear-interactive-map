(function() {

    'use strict';

    angular.module('mapApp')
        .config(['paginationTemplateProvider', '$stateProvider', '$urlRouterProvider', 'basePath', function(paginationTemplateProvider, $stateProvider, $urlRouterProvider, basePath) {

            // Nothing to do w/routes, but set pagination template:
            var pagPath = 'src/app/vendor/dirPagination.tpl.html';
            paginationTemplateProvider.setPath(pagPath);

            // Make these constants later...
            var queryPrefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT ',
                midString = ' WHERE cartodb_id = ';

            // $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    // template: '<div ui-view></div>',
                    params: {
                        layer: ''
                    },
                    controller: function(){
                        $('.leaflet-tile-container.leaflet-zoom-animated').click();
                    },
                })
                .state('popup', {
                    url: 'popup/',
                    template: '<div ui-view></div>',
                })
                .state('popup.poi', {
                    url: ':layer/:cartodb_id/',
                    templateUrl: 'src/app/popups/templates/popup.features.html',
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    params: {
                        lat: 0,
                        lon: 0,
                        seasons: 3,
                        imgDir: ''
                    },
                    resolve: {
                        selFeatData: ['$http', '$stateParams', function($http, $stateParams) {

                            var layer = $stateParams.layer,
                                query = queryPrefix + "cartodb_id, the_geom, type, name, filepath, '" + layer + "' AS layer" +
                                " FROM " + layer + " WHERE cartodb_id = " + $stateParams.cartodb_id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    },
                })
                .state('popup.pic', {
                    url: ':layer/:cartodb_id/',
                    templateUrl: 'src/app/popups/templates/popup.pic.html',
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    params: {
                        lat: 0,
                        lon: 0,
                        seasons: 3,
                        imgDir: ''
                    },
                    resolve: {
                        selFeatData: ['$http', '$stateParams', function($http, $stateParams) {

                            var layer = $stateParams.layer,
                                query = queryPrefix + "cartodb_id, the_geom, filepath, '" + layer + "' AS layer" +
                                " FROM " + layer + " WHERE cartodb_id = " + $stateParams.cartodb_id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    },
                });
        }]);

})();
