(function() {

    angular
        .module('mapApp')
        // .module('mapModuleFactory')
        .factory('mapFactory', mapFactory);

    // do this so you don't lose it during ugg...
    // mapFactory.$inject = [''];

    function mapFactory(){

        var mapFactory = {}

        mapFactory.cartodbDefaults = {
            attribution: false,
            type: 'CartoDB',
            user_name: 'remcaninch',
            tiler_protocol: "https",
            tiler_domain: "cartodb.com",
            tiler_port: "443",
            sql_domain: "cartodb.com",
            sql_port: "443",
            sql_protocol: "https",
            sublayers: [
                {   // TRAIL FOR NOW
                    sql: "SELECT * FROM sbht",
                    cartocss: "#sbht{line-color:green;line-width:4;}",
                    interactivity: "name",
                    name: "Sleeping Bear Heritage Trail",
                    id: "sbht"
                },
                {   // GRADE FOR NOW
                    sql: "SELECT * FROM sbht_grade",
                    cartocss: "#sbht_grade{line-color: #000000;line-width: 5;line-dasharray: 2,3;}",
                    interactivity: "name, direction, grade",
                    name: "Grade",
                    id: "grade"
                },
                {   // CAUTION FOR NOW
                    sql: "SELECT * FROM sbht_caution",
                    cartocss: "#sbht_caution{line-color:#F11810;line-width:5;}",
                    interactivity: "descrip, type",
                    name: 'Caution',
                    id: "caution"
                },
                {   // NPS POI
                    sql: "SELECT * FROM nps_poi_giscloud",
                    cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "name",
                    // interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                    name: 'NPS POI',
                    id: "nps_poi"
                },
                {   // SBHT POI
                    sql: "SELECT * FROM sbht_poi_digitize",
                    cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                    name: 'SBHT POI',
                    id: "sbht_poi"
                },
                {   // COMM POI
                    sql: "SELECT * FROM comm_poi_master",
                    cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "name, type, mile, name_id, season, x, y, sw_offset, ne_offset, descrip, video, audio, phone, addr_no, addr_name, addr_type, city, zip, email, website",
                    name: 'Commercial POI',
                    id: "comm_poi"
                },
                {   // TRAIL PIX
                    sql: "SELECT * FROM trail_pix_digitize",
                    cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "img_file, season",
                    name: 'Trail Pics',
                    id: "trail_pix"
                }
            ]
            
        }

        mapFactory.tileLayers = {
            aerial: L.esri.basemapLayer('Imagery'),
            terrain: L.esri.basemapLayer('Topographic')
            // terrain: L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q', {
            //     attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a><a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
            // })
        }

        mapFactory.leafletDefaults = {
            
            attribution: false,
            center: [44.88652,-86.00544],
            zoom: 12,
            zoomControl: false,
            layers: mapFactory.tileLayers.terrain
            
        }
    
        mapFactory.map = new L.Map('map', mapFactory.leafletDefaults);

        mapFactory.cdbLayer = {}

        mapFactory.addCdbLayer = function(){
            cartodb.createLayer(mapFactory.map, mapFactory.cartodbDefaults)
            .addTo(mapFactory.map)
            .on('done', function(layer){
                cdb.vis.Vis.addCursorInteraction(mapFactory.map, layer);
                var sublayers = layer.options.sublayers;
                var tableNameArr = [];
                for (var i = sublayers.length - 1; i >= 0; i--) {

                    var sublayer = layer.getSubLayer(i);
                    sublayer.setInteraction(true);

                    tableNameArr.push({
                        tablename: sublayers[i].name,
                        index: i
                    });

                    // sublayer.on('featureClick', mapFactory.featureClick(e, pos, latlng, data));
                    sublayer.on('featureClick', function(e, pos, latlng, data) {
                        $rootScope.$apply(function() {
                            $rootScope.data = data;
                        });
                         // mapFactory.featureClick(data);
                        // mapFactory.setProperty(data.name);
                        // var newSub = layer.options.sublayers[this._position]
                        // var tableName = newSub.name;
                        // var dataArray = mapFactory.getFeatureData(data, tableName);
                        // $scope.$apply(function() {
                        //     mapFactory.featureData = {
                        //         name: tableName,
                        //         data: dataArray
                        //     }
                        // });
                    });

                } // end for loop

            })
            .on('error', function() {
                console.log("some error occurred");
            });
        }

        return mapFactory;

    };




})();