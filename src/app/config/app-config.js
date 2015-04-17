(function() {

    'use strict';

    FastClick.attach(document.body);

    angular
        .module('ctrlsModule', []);
    angular
        .module('layersModule', []);
    angular
        .module('metaInfoModule', []);
    angular
        .module('panelsModule', []);
    angular
        .module('popupsModule', []);

    function getBasePath(suffix){

        var path = '';

        if (window.location.host === 'friendsofsleepingbear.org'){
            path = window.location.origin + '/wp-content/plugins/wp-fosb-map/' + suffix;
        } else {
            path = window.location.origin + '/fosb/wp-content/plugins/wp-fosb-map/' + suffix;
        }

        return path;

    }

    angular
        .module('basePathModule',[])
        .constant('basePath',{
            url: getBasePath
        });

    angular.module('mapApp', [
            'basePathModule',
            'metaInfoModule',
            'ctrlsModule',
            'panelsModule',
            'popupsModule',
            'layersModule',
            'ngAnimate',
            'angularUtils.directives.dirPagination',
            'ui.router',
        ])
        .run(['$log', '$rootScope', '$state', '$stateParams', '$location',
            function ($log, $rootScope, $state, $stateParams, $location) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                // Let's keep track of these, hey?
                $rootScope.queryStates = {
                    sbht_caution: false,
                    commercial: ["''"],
                    faces: false,
                    features: ["'mainpoints'"],
                    sbht_grade: false,
                    season: 3,
                    trail_condition: false,
                    trail_pix: true
                };

                $rootScope.metaInfo = {
                    image: 'http://friendsofsleepingbear.org/wp-content/uploads/2012/06/SBHT-Logo-300x300-192x192.jpg',
                    title: 'Sleeping Bear Heritage Trail - Interactive Map',
                    description: "An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country.",
                    url: 'http://friendsofsleepingbear.org/sbht-i-map'
                }

                // Thumbs sort preference states
                $rootScope.thumbsPrefs = {
                    sortField: 'diff',
                    rel: true,
                    label: 'relLabel'
                };

                $stateParams.seasons = $rootScope.queryStates.season;
            }
        ]);

})();
