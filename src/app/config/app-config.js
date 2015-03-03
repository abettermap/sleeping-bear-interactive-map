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
        .module('popupModule', []);

    angular.module('mapApp', [
            // 'blank',
            'ctrlsModule',
            'panelsModule',
            'popupModule',
            'layersModule',
            'ngAnimate',
            'ui.router',
        ])
        .run(['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);
        
})();
