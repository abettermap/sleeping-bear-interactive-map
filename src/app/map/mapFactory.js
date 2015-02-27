(function() {

    'use strict';

    angular
        .module('mapApp')
        .service('mapService', mapService);
        // .factory('mapService', mapService);

    // do this so you don't lose it during ugg...
    mapService.$inject = ['$rootScope', 'cdbValues'];

    function mapService($rootScope, cdbValues){

        this.tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
            // terrain: L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q', {
            //     attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a><a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
            // })
        };

        this.leafletDefaults = {
            
            attribution: false,
            center: [44.88652,-86.00544],
            zoom: 12,
            zoomControl: false,
            layers: this.tileLayers.terrain
            
        };

        this.map = {};

        this.createMap = function(yes){
            this.map = L.map('map', this.leafletDefaults);
            return this.map;
        }

        $rootScope.testData = {};

        // return this;

    }


})();