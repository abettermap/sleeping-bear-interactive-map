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

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    // template: '<div ui-view></div>',
                    params: {
                        table: ''
                    },
                    controller: function(){
                        $('.leaflet-tile-container.leaflet-zoom-animated').click();
                    },
                    // controllerAs: 'vm',
                    // resolve: {
                    //     selFeatData: ['$http', '$stateParams', function($http, $stateParams) {

                    //         var seasonsQueries = {
                    //             winter: 1,
                    //             spring: 2,
                    //             summer: 3,
                    //             fall: 4,
                    //         },
                    //         season = $stateParams.seasons;

                    //         var query = queryPrefix + "features.the_geom_webmercator, features.cartodb_id, features.type, features.seasons, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE substring(features.seasons," + seasonsQueries[season] + ",1) = 'y'";
                    //         // var query = "SELECT features.the_geom_webmercator, features.cartodb_id, features.type, features.seasons, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE substring(features.seasons," + seasonsQueries[season] + ",1) = 'y'";
                    //         console.log(query);
                    //         // return query;
                    //         return $http.get(query).then(function(response){
                    //             return response.data;
                    //         });
                    //     }],
                    // }
                })
                .state('layer', {
                    url: 'layer/',
                    template: '<div ui-view></div>'
                })
                .state('layer.features', {
                    url: ':seasons/features/:cartodb_id/:mile',
                    templateUrl: 'src/app/popups/templates/popup.features.html',
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        selFeatData: ['$http', '$stateParams', function($http, $stateParams) {

                            // var columns = 'cartodb_id, name_id, type, mile, name FROM features ',
                            var columns =   "features.cartodb_id, " +
                                            "features.mile, " +
                                            "features.name, " +
                                            "features.name_id, " +
                                            "features.seasons, " +
                                            "features.type, " +
                                            "feature_types.name AS type_name, " +
                                            "feature_types.priority" +
                                            " FROM features INNER JOIN feature_types ON features.type=feature_types.type",
                                            query = queryPrefix + columns + " WHERE features.cartodb_id = " + $stateParams.cartodb_id + "ORDER BY priority DESC";

                            return $http.get(query).then(function(response){
                                return response.data;
                            });


                        }],
                    }
                })
                .state('home.commercial', {
                    url: 'commercial/:cartodb_id/:mile',
                    templateUrl: 'src/app/popups/templates/popup.comm.html',
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        selFeatData: ['$http', '$stateParams', function($http, $stateParams) {

                            var columns = 'cartodb_id, type, name, audio, video FROM commercial ',
                                query = queryPrefix + columns + midString + $stateParams.cartodb_id;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    }
                });
                // .state('home.trail-pix', {
                //     url: 'trail-pix/:cartodb_id/:mile',
                //     templateUrl: 'src/app/popups/templates/trail-pix-template.html',
                //     controller: 'PopupCtrl',
                //     controllerAs: 'vm',
                //     resolve: {
                //         selFeatData: ['$http', function($http) {
                //             return $http.get('https://remcaninch.cartodb.com/api/v2/sql?q=SELECT * FROM trail_pix_digitize')
                //                 .then(function(response){
                //                     return response.data;
                //                 });
                //         }],
                //     }
                // });

        }]);

})();
