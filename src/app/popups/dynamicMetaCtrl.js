(function() {

    'use strict';

    angular
        .module('popupsModule')
        .controller('DynamicMetaCtrl', DynamicMetaCtrl);

    DynamicMetaCtrl.$inject = ['$sce', '$timeout', '$rootScope', '$scope', '$stateParams', 'popupFactory', 'layersFactory', '$state', 'mapFactory', 'MetaInfoService', 'PageTitle'];

    function DynamicMetaCtrl($sce, $timeout, $rootScope, $scope, $stateParams, popupFactory, layersFactory, $state, mapFactory, MetaInfoService, PageTitle){

        var vm = this;



        $rootScope.$on('metaUpdated',function(event, data){
            // debugger;

                vm.testCrazy = {
                    description: data.seasons,
                    keywords: data.cartodb_id,
                };

        });



    }

})();
