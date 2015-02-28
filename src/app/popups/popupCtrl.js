(function() {

    'use strict';

    angular
        // .module('mapApp')
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory', '$stateParams', '$state', 'features'];

    function PopupCtrl($scope, mapService, $rootScope, layersFactory, $stateParams, $state, features){

        $scope.city = features.rows[0].city;
        
        $scope.id = $stateParams.id;
        $scope.mile = $stateParams.mile;

        $scope.sublayers = layersFactory.sublayers;
        var vm = this;

        $scope.featureData = [];
        $scope.featureName = null;

        $scope.$on('feature updated', function(event,data) {
            $scope.tableName = data;
            console.log(data);
          // $scope.name = user.firstname + ' ' + user.lastname;
        });

        function init() {
            layersFactory.getFeatureInfo()
                .success(function(featureData) {
                    $stateParams.id = featureData.rows[0].cartodb_id;
                    $scope.featureData = featureData.rows;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
        }
        
        init();

	}

})();