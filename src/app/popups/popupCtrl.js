(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$timeout', '$rootScope', '$scope', '$stateParams', 'selFeatData', 'basePath', 'popupFactory', 'layersFactory'];

    function PopupCtrl($timeout, $rootScope, $scope, $stateParams, selFeatData, basePath, popupFactory, layersFactory){

        var vm = this;

        vm.currentSeason = $rootScope.queryStates.season;

        /******************************/
        /****** FEATURES POPUPS *******/
        /******************************/

        vm.closePopup = function(){
            popupFactory.closePopup();
        };

        /* Active popup */
        vm.imgPopupPage = true;

        /********** DATA FOR SELECTED FEATURE **********/

        /* Only need first row */
        vm.selFeatData = selFeatData.rows[0];

        /***** Header *****/

        // Popup pages nav icon
        vm.popupNavIcon = '#icon-info';

        // Tooltip
        vm.popupNavTooltip = 'View feature info';

        vm.showPopupInfo = 'false';

        // Type icon
        vm.typeIcon = '#icon-' + vm.selFeatData.type;

        // Title
        vm.title = vm.selFeatData.name;

        /***** Active primary *****/

        /*** Create Path ***/
        var layer = 'features';
        var primaryPath = 'img-prod\/' + layer  + '\/mid_size\/' + vm.selFeatData.mile + '\/' + vm.selFeatData.name_id + '\/image00001.jpg';

        vm.activeImages = [primaryPath];

        /* Secondary active */
        $rootScope.$on('rootScope:activeImagesSet', function (event, data) {
            vm.activeImages = vm.activeImages.concat(data);
        });

        /* Thumbnails */
        vm.thumbsData = null;
        $rootScope.$on('rootScope:thumbsSet', function (event, response) {

            // debugger;
            var layer = 'features';
            var arr = [],
                basePath = 'img-prod\/' + response.layer + '\/thumbnail\/';

            for (var n = 0; n < response.length; n++) {

                // arr.push(basePath + data[n].mile + '\/' + data[n].name_id + '\/image00001.jpg');
                arr.push({
                    layer: response[n].layer,
                    path: 'img-prod\/' + response[n].layer + '\/thumbnail\/' + response[n].mile + '\/' + response[n].name_id + '\/image00001.jpg'
                });

            }
            $timeout(function() {
                vm.thumbsData = arr;
            },1000);

        });

        // Thumbs pagination
        $scope.currentPage = 1;

        /* Trigger new popup */
        vm.resetPopup = function(layer, cdbid){
            var queryLayer = layersFactory.sublayers[layer];
            layersFactory.setSelFeatColor(queryLayer, layer, cdbid);
            console.log(layer);
        };

        // Name
        vm.featName = vm.selFeatData.name;

    }


})();
