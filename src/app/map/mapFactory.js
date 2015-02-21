(function() {

    angular
        .module('mapApp')
        // .module('mapModuleFactory')
        .factory('mapFactory', mapFactory);

    // do this so you don't lose it during ugg...
    mapFactory.$inject = ['$rootScope'];

    function mapFactory($rootScope){

        var mapFactory = {}

        mapFactory.mapDefaults = {
            cartodb: {
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
                        sql: "SELECT * FROM sbht_temp",
                        cartocss: "#sbht_temp{line-color:green;line-width:4;}",
                        interactivity: "name",
                        name: "Sleeping Bear Heritage Trail",
                        id: "sbht"
                    },
                    {   // GRADE FOR NOW
                        sql: "SELECT * FROM sbht_grade_temp",
                        cartocss: "#sbht_grade_temp{line-color: #000000;line-width: 5;line-dasharray: 2,3;}",
                        interactivity: "name, direction, grade",
                        name: "Grade",
                        id: "grade"
                    },
                    {   // CAUTION FOR NOW
                        sql: "SELECT * FROM sbht_caution_temp",
                        cartocss: "#sbht_caution_temp{line-color:#F11810;line-width:5;}",
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
            },
            leaflet: {
                zoom: 12,
                zoomControl: false,
                center: [44.8957686012,-86.00646972]
            }

    }

        mapFactory.map = new L.Map('map', mapFactory.mapDefaults.leaflet);

        L.tileLayer(mapFactory.mapDefaults.tileLayer.url, mapFactory.mapDefaults.tileLayer.options)
        .addTo(mapFactory.map);
        L.control.scale().addTo(mapFactory.map);

        return mapFactory;

    }


})();