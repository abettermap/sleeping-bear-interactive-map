(function() {

    'use strict';

    angular
        .module('popupsModule')
        .directive('dynamicMeta', dynamicMeta);

    dynamicMeta.$inject = ['$rootScope', 'MetaInfoService'];

    function dynamicMeta($rootScope, MetaInfoService){

        var metaDefaults = {
            ogTitle: 'Sleeping Bear Heritage Trail - Interactive Map',
        };


        return {
            // restrict: 'A',
            // scope: {
            //     property: '@description',
            //     content: '@content',
            // },
            template: '<meta name="akljsdfkljadsljkf" content="{{description}}">',
            // controller: 'DynamicMetaCtrl',
            // controller: function(){

            // },
            // link: function(scope, elem, attrs) {

            //     scope.metaDefaults = metaDefaults;
            //     scope.description = 'description goes here';


            //     $rootScope.$on('metaUpdated',function(event, data){

            //     attrs.$observe('og:title', function(value){
            //         console.log(value);
            //     });

            //         // scope.$apply(function() {
            //         //   scope.color = "white";
            //         // });

            //     });
            //         // debugger;




            //     // attrs.$set('tooltip', function(value) {
            //     //   if (value) {
            //     //     element.addClass('tooltip-title');
            //     //   }
            //     // });
            // },
            // // controllerAs: 'vm',
            replace: true
        };
    }

})();