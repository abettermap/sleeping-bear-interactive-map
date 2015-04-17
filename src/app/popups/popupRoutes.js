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
                    templateUrl: 'src/app/popups/templates/popup.html',
                    controller: 'PopupCtrl',
                    controllerAs: 'vm',
                    params: {
                        lat: 0,
                        lon: 0,
                        seasons: 3,
                        filepath: '',
                    },
                    resolve: {
                        selFeatData: ['$http', '$stateParams', function($http, $stateParams) {

                            // Common
                            var sp = $stateParams,
                                query,
                                sharedPrefix = "" +
                                    queryPrefix + "cartodb_id, the_geom, filepath, lin_dist, '" +
                                    sp.layer + "' AS layer," +
                                    " ROUND(ST_X(the_geom)::numeric, 5) AS lon," +
                                    " ROUND(ST_Y(the_geom)::numeric, 5) AS lat,",
                                sharedSuffix = " FROM " + sp.layer + " WHERE cartodb_id = " + sp.cartodb_id;

                            // Features
                            var featQuery = "" +
                                queryPrefix +
                                " features.cartodb_id," +
                                " features.the_geom," +
                                " ROUND(ST_X(features.the_geom)::numeric, 5) AS lon," +
                                " ROUND(ST_Y(features.the_geom)::numeric, 5) AS lat," +
                                " features.filepath," +
                                " features.lin_dist," +
                                " features.seasons," +
                                " features.type," +
                                " features.name," +
                                " narrative, video_link, audio_link," +
                                " feature_types.name AS type_name," +
                                " 'features' AS layer" +
                                " FROM" +
                                    " features" +
                                " INNER JOIN" +
                                    " feature_types" +
                                " ON" +
                                    " features.type=feature_types.type" +
                                " WHERE features.cartodb_id = " + sp.cartodb_id;

                                var queries = {
                                    features: featQuery,
                                    commercial: 'similar to features',
                                    faces: '',
                                    trail_pix: "" +
                                        sharedPrefix +
                                        " 'camera' AS type," +
                                        " 'Trail Snapshot' AS name," +
                                        " 'Trail Snapshot' AS type_name" +
                                        sharedSuffix,
                                    trail_condition: ''
                                };

                            query = queries[sp.layer];

                            return $http.get(query).then(function(response){
                                return response.data;
                            });

                        }],
                    },
                });
        }]);

})();
