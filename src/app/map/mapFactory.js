(function() {

    angular
        .module('mapApp')
        // .module('mapModuleFactory')
        .factory('mapFactory', mapFactory);

    // do this so you don't lose it during ugg...
    // mapFactory.$inject = [''];

    function mapFactory(){

        var mapFactory = {}

        mapFactory.mapDefaults = {
            cartodb: {
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
            },
            tileLayer: {
                url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            }
        }
        var aerial = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
            attribution: '<p>Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png"></p>',
            subdomains: '1234'
        }),
            terrain = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q', {
            attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
        });
        
        mapFactory.leafletDefaults = {
            
            attribution: false,
            center: [44.88652,-86.00544],
            zoom: 12,
            zoomControl: false,
            layers: [terrain]
            
        }
    
        mapFactory.map = new L.Map('map', mapFactory.leafletDefaults);

        return mapFactory;
    };




})();