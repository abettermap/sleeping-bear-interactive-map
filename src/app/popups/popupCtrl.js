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

        $scope.$watch('vm.selFeatData', function(){
            // console.log('vm.selFeatData updated (PopupCtrl)');
            popupFactory.getPrimary(vm.selFeatData);
        });

        $scope.$watch('vm.activeImg', function(){
            console.log('vm.activeImg updated (PopupCtrl)');
            console.log(vm.selFeatData);
            // console.log(vm.activeImg);
        });


        /***** Header *****/

        // Icon
        vm.icon = '#icon-' + vm.selFeatData.type;

        // Title
        vm.title = vm.selFeatData.type_name;
        console.log("selFeatData: ");
        console.log(vm.selFeatData);

        /***** Images *****/
        vm.activeImg = popupFactory.activeImg;

        // Name
        vm.featName = vm.selFeatData.name;

    }


})();
