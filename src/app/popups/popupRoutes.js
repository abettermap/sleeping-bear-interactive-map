// (function() {

//     'use strict';

//     angular.module('mapApp')
//         .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//         // .config(['$stateProvider', '$urlRouterProvider', 'basePath', function($stateProvider, $urlRouterProvider, basePath) {
//             function getAppPath(suffix){
//                 var scripts = document.getElementsByTagName("script"),
//                     item,
//                     basePath;
//                 for (var i = 0, len = scripts.length; i < len; i++) {
//                     item = scripts[i];
//                     if (item.src.indexOf('map-app') !== -1){
//                         basePath = item.src;
//                         var name = basePath.split('/').pop(); 
//                         basePath = basePath.replace('/'+name,"");
//                         break;
//                     }
//                 }
//                 return basePath + suffix;
//             }

//             $urlRouterProvider.otherwise('/');

//             $stateProvider
                
//                 // HOME STATES AND NESTED VIEWS ========================================
//                 .state('home', {
//                     url: '/',
//                     template: '',
//                     // templateUrl: getAppPath('/config/homeTemplate.html'),
//                     // controller: function($stateParams){
//                     // }
//                 })
//                 .state('comm-poi', {
//                     url: 'comm-poi/:',
//                     templateUrl: getAppPath('/popups/templates/comm-poi-template.html'),
//                     // controller: function($scope, $stateParams, $state){
//                     //     $scope.customers = [];
//                     //     $scope.customer = null;

//                     //     function init() {
//                     //         layersFactory.getWeather()
//                     //             .success(function(customers) {
//                     //                 $scope.customers = customers.rows;
//                     //             })
//                     //             .error(function(data, status, headers, config) {
//                     //                 $log.log(data.error + ' ' + status);
//                     //             });
//                     //     }
                        
//                     //     init();
//                     // }
//                 })
//                 .state('nps-poi', {
//                     url: 'nps-poi',
//                     templateUrl: getAppPath('/popups/templates/nps-poi-template.html'),
//                     controller: function($scope, $stateParams, $state){
//                         // debugger;
//                         $scope.cartodb_id = 2;
//                         $stateParams.cartodb_id = $scope.cartodb_id;
//                     }
//                 })
//                 .state('sbht-poi', {
//                     url: 'sbht-poi',
//                     templateUrl: getAppPath('/popups/templates/sbht-poi-template.html'),
//                 })
//                 .state('trail-pix', {
//                     url: 'trail-pix',
//                     templateUrl: getAppPath('/popups/templates/trail-pix-template.html'),
//                 });

//             // $locationProvider.html5Mode({
//             //   enabled: true,
//             //   requireBase: false,
//             //   rewriteLinks: true
//             // });
//             // $locationProvider.hashPrefix('!');

//         }]);

// })();

