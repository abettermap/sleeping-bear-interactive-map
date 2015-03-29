(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$timeout', '$state', '$rootScope', '$scope', '$stateParams', 'selFeatData', 'basePath', 'popupFactory', 'layersFactory', '$http'];

    function PopupCtrl($timeout, $state, $rootScope, $scope, $stateParams, selFeatData, basePath, popupFactory, layersFactory, $http){

        var vm = this;

        vm.currentSeason = $rootScope.activeSeason;

        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        /********** DATA FOR SELECTED FEATURE **********/

        /* Only need first row */
        vm.selFeatData = selFeatData.rows[0];

        /***** Header *****/

        // Popup pages nav icon
        vm.popupNavIcon = '#icon-info';

        // Tooltip
        vm.popupNavTooltip = 'View feature info';

        vm.showPopupInfo = 'false';

        // vm.setPopupPg = function(){

        //   vm.showPopupInfo = !vm.showPopupInfo;

        //   if (vm.showPopupInfo) {
        //       vm.title = vm.selFeatData.name;
        //       vm.popupNavIcon = '#icon-info';
        //       vm.typeIcon = '#icon-' + vm.selFeatData.type;
        //       vm.popupNavTooltip = 'View feature info';
        //   } else {
        //       vm.title = "Feature Info";
        //       vm.popupNavIcon = '#icon-camera';
        //       vm.popupNavTooltip = 'Back to photos';
        //       // vm.typeIcon = '';//'#icon-' + vm.selFeatData.type;
        //   }

        // };

        // Type icon
        vm.typeIcon = '#icon-' + vm.selFeatData.type;

        // Title
        vm.title = vm.selFeatData.name;

        $rootScope.$on('rootScope:featureClicked', function (event, data) {
            console.log(data[0]);
            // vm.activeImages = data;
        });

        /***** Images *****/
        $rootScope.$on('rootScope:activeImagesSet', function (event, data) {
            var f = data;
            vm.activeImages = data;
        });

        // Thumbs pagination
        $scope.currentPage = 1;

        // Name
        vm.featName = vm.selFeatData.name;

    }


})();
