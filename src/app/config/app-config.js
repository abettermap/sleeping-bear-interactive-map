(function() {

    'use strict';

    FastClick.attach(document.body);

    angular
        .module('ctrlsModule', []);
    angular
        .module('mapModule', []);
    angular
        .module('layersModule', []);
    angular
        .module('panelsModule', []);
    angular
        .module('popupsModule', []);


    angular
        .module('mapApp', [
            'ctrlsModule',
            'mapModule',
            'panelsModule',
            'popupsModule',
            'ui.router'
        ])
        .run(['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);
    // angular
    //     .module('basePathModule',['ui.router'])
    //     .constant('basePath',{
    //         url: ''
    //     });



})();
