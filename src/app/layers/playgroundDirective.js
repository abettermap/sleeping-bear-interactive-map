(function() {

    'use strict';

    var playground = function(){

        return {
            restrict: 'E',
            templateUrl: '../../wp-content/plugins/wp-fosb-map/src/app/layers/templates/layersTemplate.html',
            replace: true,
            // CAREFUL WITH MINIFICATION HERE, NOT SURE HOW THIS WORKS W/INTERNAL CTRLER!
            controller: function($scope, layersFactory, $http){

                var layer = 'poi\/',
                    mile = 'n00\/',
                    type = 'features\/',
                    id = 'dc_trailhead\/',
                    level = 'secondary';

                var subpath = layer + mile + type + id + level;

                var fullPath = "http://wpmulti.dev/fosb/wp-content/plugins/wp-fosb-map/get-images.php?dir=" + subpath;

                $http.get(fullPath, {})
                .success(function(data) {
                    for (var i = data.length - 1; i >= 0; i--) {
                        console.log(data[i]);
                    }
                });

            }
        };

    };

    playground.$inject = ['mapFactory', '$rootScope', 'layersFactory'];

    angular
        .module('mapApp')
        // .directive('interactiveMap', interactiveMap);
        .directive('playground', playground);

})();