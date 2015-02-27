(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = ['$scope', 'mapService', '$rootScope', 'layersFactory'];

    function PopupCtrl($scope, mapService, $rootScope, layersFactory){

    	$scope.sublayers = layersFactory.sublayers;
        var vm = this;
        vm.data = layersFactory.getFeatureInfo;
        $scope.$watch('vm.data', function(){
            alert('things change');
        });

    	var vm = this;

    	vm.dataArray = function(){
    	    var hey = Object.keys(data).map(function(key){
    	        var result = {
    	            key: key,
    	            data: data[key]
    	        };
    	        return result;
    	    });
    	    return hey;
    	}; 

    	vm.getFeatureData = function(data, tableName){
    	    console.log("passed");
    	    if (!data){
    	        return "";
    	    } else {
    	        return dataArray();
    	    }
    	};
        // console.log("mapService.map._container");
        vm.container = mapService.map._container;
        // vm.container = mapService.map._container.id;
        // $scope.$watch('vm.container',function(){
        //     console.log(vm.container);
        // });
    	//     // $scope.$on('$viewContentLoaded', function(){
    	//     //   hey();
    	//     // });
    	//     // $scope.$watch("traildata.name", function (zoom) {
    	//     //     console.log("things happenin");
    	//     // });


	}

})();