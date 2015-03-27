(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$state', '$rootScope', '$scope', '$stateParams', 'selFeatData', 'basePath', 'popupFactory', 'layersFactory', '$http'];

    function PopupCtrl($state, $rootScope, $scope, $stateParams, selFeatData, basePath, popupFactory, layersFactory, $http){

        var vm = this;

        vm.currentSeason = $rootScope.activeSeason;

        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        /********** DATA FOR SELECTED FEATURE **********/

        /* Only need first row */
        vm.selFeatData = selFeatData.rows[0];

        /* Defaults for all hosts */
        var root = '',
            hostName = window.location.hostname,
            origin = window.location.origin,
            wpContent = '/wp-content/sbht-i-map/img-prod/';

        var wpToFeat = '\/wp-content\/sbht-i-map\/img-prod\/features\/mid_size\/';

        /* Account for fosb folder */
        if (hostName == 'localhost' || hostName == 'wpmulti.dev' || hostName == 'abettermap.com'){
            origin = origin + '\/fosb' + wpToFeat;
        } else {
            origin = origin + wpToFeat;
        }

        vm.activeImg = origin + vm.selFeatData.mile + '\/' + vm.selFeatData.name_id + '\/img00001.jpg';


        // vm.activeImg = popupFactory.activeImg;

        $rootScope.$on('rootScope:activeImgUpdated', function (event, data) {
          // vm.activeImg = '';
          // alert(data);
          var f = data;
          console.log(data);
          vm.activeImg = f;
        });

        $rootScope.$on('rootScope:secondaryThumbsSet', function (event, data) {
          vm.secondaryThumbs = data;
          // vm.activeImg = data;
          console.log(data);
        });
        // $scope.$watch('vm.secondaryThumbs', function(){
        // });

        // $scope.$watch('vm.activeImg', function(){
        // });


        /***** Header *****/

        // Icon
        vm.icon = '#icon-' + vm.selFeatData.type;

        // Title
        vm.title = vm.selFeatData.name;

        /***** Images *****/
        // vm.activeImg = popupFactory.activeImg;
        // vm.secondaryThumbs = popupFactory.secondaryThumbs;

        // vm.secondaryThumbs =

        // Name
        vm.featName = vm.selFeatData.name;

    }


})();
