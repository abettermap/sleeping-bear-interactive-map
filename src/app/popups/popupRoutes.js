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
                .state('popup', {
                    url: '/',
                    controller: function(){
                        $('.leaflet-tile-container.leaflet-zoom-animated').click();
                    },
                    template: '<div ui-view></div>',
                })
                .state('popup.poi', {
                    url: 'popup/:layer/:cartodb_id',
                    templateUrl: 'src/app/popups/templates/popup.features.html',
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    params: {
                        lat: 0,
                        lon: 0,
                        seasons: 3,
                        filepath: ''
                    },
                    resolve: {
                        selFeatData: ['$http', '$stateParams', function($http, $stateParams) {

                            var sp = $stateParams,
                                query,
                                queries = {
                                    sharedPrefix: queryPrefix + "cartodb_id, the_geom, filepath, '" + sp.layer + "' AS layer," +
                                            " ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat",
                                    sharedSuffix: " FROM " + sp.layer + " WHERE cartodb_id = " + sp.cartodb_id,
                                    features: ", narrative, video_link, audio_link, type, name",
                                    commercial: 'similar to features',
                                    faces: '',
                                    trail_pix: '',
                                    trail_condition: ''
                                };

                            query = queries.sharedPrefix + queries[sp.layer] + queries.sharedSuffix;

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    },
                });
        }]);

})();
