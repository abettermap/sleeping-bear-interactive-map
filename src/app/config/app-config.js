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

    angular.module('mapApp', [
            'metaInfoModule',
            'ctrlsModule',
            'panelsModule',
            'popupsModule',
            'layersModule',
            'ngAnimate',
            'angularUtils.directives.dirPagination',
            'ui.router',
        ])
        .run(['$timeout', '$log', '$rootScope', '$state', '$stateParams', '$location',
            function ($timeout, $log, $rootScope, $state, $stateParams, $location) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;


                /******************************/
                /******* QUERY STATES  ********/
                /******************************/

                $rootScope.queryStates = {
                    commercial: [50],
                    faces: false,
                    features: ["'mainpoints'"],
                    season: 3,
                    trail_condition: false,
                    trail_pix: true
                };


                /******************************/
                /****** META INFO/TAGS ********/
                /******************************/

                $rootScope.metaInfo = {
                    image: 'http://friendsofsleepingbear.org/wp-content/uploads/2012/06/SBHT-Logo-300x300-192x192.jpg',
                    title: 'Sleeping Bear Heritage Trail - Interactive Map',
                    description: "An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country.",
                    url: 'http://friendsofsleepingbear.org/sbht-i-map'
                }


                /******************************/
                /******** THUMBNAILS  *********/
                /******************************/

                $rootScope.thumbsArrays = {
                    current: [],
                    both: [],
                    north: [],
                    south: [],
                }

                $rootScope.updateThumbs = function(direction){
                    $rootScope.thumbsArrays.current = $rootScope.thumbsArrays[direction];
                }

                $rootScope.thumbsDirectionModel = 'both';


                /******************************/
                /***** SEASONS (NEEDED?) ******/
                /******************************/

                $stateParams.seasons = $rootScope.queryStates.season;

                /******************************/
                /******** CAUTION TEXT ********/
                /******************************/
                $rootScope.cautionInfo = {
                    text: '',
                    icon: '',
                };

                $rootScope.$on('cautionClicked',function(){
                    $rootScope.cautionInfo.text = $rootScope.cautionInfo.text;
                    $rootScope.cautionInfo.icon = $rootScope.cautionInfo.icon;
                });

                $rootScope.tempSublayerIndexes = {
                    // commercial: [50],
                    sbht_caution: -1,
                    sbht_grade: -1,
                    trail_condition: -1,
                };

            }
        ]);

})();
