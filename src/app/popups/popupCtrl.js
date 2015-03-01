(function() {

    'use strict';

    var PopupCtrl = function($scope, layersFactory, $stateParams, $state, features){
        
        $scope.id = $stateParams.id;
        $scope.mile = $stateParams.mile;

        // $scope.sublayers = layersFactory.sublayers;

        $scope.features = features.rows[0];
        // debugger;

        $scope.$on('feature updated', function(event,data) {
            $scope.tableName = data;
        });

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

	};

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'layersFactory', '$stateParams', '$state', 'features'];

})();