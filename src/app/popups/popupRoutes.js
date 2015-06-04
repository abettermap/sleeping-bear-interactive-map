(function() {

    'use strict';

    angular.module('mapApp')
        .config(['paginationTemplateProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function(paginationTemplateProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

            // Nothing to do w/routes, but set pagination template:
            var pagPath = 'src/app/vendor/dirPagination.tpl.html';
            paginationTemplateProvider.setPath(pagPath);

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('popup', {
                    url: '/',
                    template: '<div ui-view></div>',
                })
                .state('position', {
                    url: '/position/:lat/:lon',
                    controller: 'PositionCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        currentPositionLatLng: ['$stateParams', function($stateParams) {
                            return [$stateParams.lat, $stateParams.lon];
                        }]
                    }
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
                                queryPrefix = 'https://remcaninch.cartodb.com/api/v2/sql?q=SELECT ',
                                sharedPrefix = "" +
                                    queryPrefix + "cartodb_id, the_geom, filepath, lin_dist, '" +
                                    sp.layer + "' AS layer," +
                                    " ROUND(ST_X(the_geom)::numeric, 5) AS lon," +
                                    " ROUND(ST_Y(the_geom)::numeric, 5) AS lat,",
                                sharedSuffix = " FROM " + sp.layer + " WHERE cartodb_id = " + sp.cartodb_id;

                            // Features
                            var featQuery = "" +
                                queryPrefix +
                                ' "features"."cartodb_id", ' +
                                ' "features"."the_geom", ' +
                                ' "features"."the_geom_webmercator",' +
                                ' ROUND(ST_X("features"."the_geom")::numeric, 5) AS lon,' +
                                ' ROUND(ST_Y("features"."the_geom")::numeric, 5) AS lat,' +
                                ' "features"."filepath", "features"."lin_dist", "features"."available",' +
                                ' "features"."type", "features"."name",' +
                                ' "features"."video_link", "features"."audio_link",' +
                                ' \'features\' AS layer,' +
                                ' (SELECT "type" AS "type_id" FROM feature_types WHERE "features"."type" = "feature_types"."type"),' +
                                ' (SELECT "name" AS "type_name" FROM feature_types WHERE "features"."type" = "feature_types"."type"),' +
                                ' (SELECT "narrative" FROM "narratives" WHERE "features"."filepath" = "narratives"."filepath")' +
                                ' FROM "features"' + '\n' +
                                ' WHERE "features"."cartodb_id" = ' + sp.cartodb_id + ' AND' +
                                ' ("features"."type" IS NOT NULL OR "features"."filepath" IS NOT NULL)';
                                // alert(featQuery);
                            // Commercial
                            var commQuery = "" +
                                queryPrefix +
                                ' "commercial"."cartodb_id", "commercial"."the_geom",' +
                                ' "commercial"."the_geom_webmercator",' +
                                ' ROUND(ST_X("commercial".the_geom)::numeric, 5) AS "lon",' +
                                ' ROUND(ST_Y("commercial".the_geom)::numeric, 5) AS "lat",' +
                                ' "commercial"."filepath", "commercial"."lin_dist", "commercial"."available",' +
                                ' "commercial"."address", "commercial"."city", "commercial"."phone", "commercial"."website", "commercial"."zip", "commercial"."categories",' +
                                ' "commercial"."type", "commercial"."name",' +
                                ' "commercial"."video_link", "commercial"."audio_link",' +
                                ' \'commercial\' AS layer,' +
                                ' (SELECT "type" AS type_id FROM commercial_types WHERE "commercial"."type" = "commercial_types"."type"),' +
                                ' (SELECT "name" AS type_name FROM commercial_types WHERE "commercial"."type" = "commercial_types"."type"),' +
                                ' (SELECT "narrative" FROM "narratives" WHERE "commercial"."filepath" = "narratives"."filepath")' +
                                ' FROM "commercial"' +
                                ' WHERE "commercial"."cartodb_id" = ' + sp.cartodb_id + ' AND' +
                                ' ("commercial"."type" IS NOT NULL OR "commercial"."filepath" IS NOT NULL)';

                                var queries = {
                                    features: featQuery,
                                    commercial: commQuery,
                                    faces: "" +
                                        sharedPrefix +
                                        " 'faces' AS type," +
                                        " 'Faces Along the Trail' AS name," +
                                        " 'Faces' AS type_name" +
                                        sharedSuffix,
                                    trail_pix: "" +
                                        sharedPrefix +
                                        " 'camera' AS type," +
                                        " 'Trail Snapshot' AS name," +
                                        " 'Trail Photos' AS type_name" +
                                        sharedSuffix,
                                    trail_condition: "" +
                                        sharedPrefix +
                                        " 'trail-cond' AS type," +
                                        " 'Current Ski Conditions' AS name," +
                                        " 'Ski Conditions' AS type_name" +
                                        sharedSuffix,
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
