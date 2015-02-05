mapApp.controller('MapCtrl',[ '$scope', 'MapValues', 'MapFactory', function($scope, MapValues, MapFactory) {

    angular.extend($scope, {
      defaults: MapValues.leafletDefaults
    });

    // $scope.panels = MapFactory.panels;
    // $scope.initialLayer = MapFactory.initialLayer();

    // $scope.panelTemplatePath = function(filename){
    //   var path = '/wordpress/wp-content/plugins/wp-interactive-map/app/html/partials/panels/panel-';
    //   path = path + filename.name + '.html';
    //   return path;
    // }

    // $scope.showPanel = function(visStatus){
    //   MapFactory.showPanel(visStatus);
    // }

    // $scope.ottawa = function(){
    //   MapFactory.ottawa();
    // }

    // $scope.pauseTorque = function(){
    //   leafletData.getMap('mymap').then(function(map) {
    //     timeLayer.addTo(map);
    //     timeLayer.play();
    //   });
    // }
    //     // timeLayer.pause();

}]);