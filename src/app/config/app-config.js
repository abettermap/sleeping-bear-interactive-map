(function() {

    'use strict';

    FastClick.attach(document.body);
    
    // angular
    //     .module('basePath', []);
    angular
        .module('ctrlsModule', []);
    angular
        .module('mapModule', []);
    angular
        .module('panelsModule', []);
    angular
        .module('popupsModule', []);

    angular
        .module('mapApp', [
            'ui.router',
            'ctrlsModule',
            'mapModule',
            'panelsModule',
            'popupsModule'
        ])
        .run(function($rootScope) {
    });

})();
