(function() {

    'use strict';

    FastClick.attach(document.body);

    angular
        .module('ctrlsModule', []);
    angular
        .module('layersModule', []);
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
            'ctrlsModule',
            'panelsModule',
            'popupsModule',
            'layersModule',
            'ngAnimate',
            'ui.router',
        ])
        .run(['$rootScope', '$state', '$stateParams', '$location',
            function ($rootScope, $state, $stateParams, $location) {
                $stateParams.seasons = 'summer';
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.activeSeason = 'summer';
                // $rootScope.primaryImg = '';
            }
        ]);

})();
