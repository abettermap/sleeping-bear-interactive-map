(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', '$stateParams', 'features'];

    function PopupCtrl($scope, $stateParams, features){

        var vm = this;

        vm.id = $stateParams.id;
        vm.mile = $stateParams.mile;

        vm.features = features.rows[0];
        vm.tableName = null;

    }

})();


// vm.sublayers = layersFactory.sublayers;

// $scope.$on('feature updated', function(event,data) {
//     vm.tableName = data;
// });

// PROMISES, not sure if needed, seems to be fine without
// function init() {
//     layersFactory.getFeatureInfo()
//         .success(function(featureData) {
//             $stateParams.id = featureData.rows[0].cartodb_id;
//             $scope.featureData = featureData.rows;
//         })
//         .error(function(data, status, headers, config) {
//             $log.log(data.error + ' ' + status);
//         });
// }

// init();
