(function() {

    'use strict';

    angular
        .module('mapApp')
        .value('cdbValues',{
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
                {   // TRAIL
                    sql: "SELECT * FROM sbht",
                    cartocss: "#sbht{line-color:green;line-width:4;}",
                    interactivity: "name",
                    name: "Sleeping Bear Heritage Trail",
                    id: "trail-pic"
                },
                {   // GRADE
                    sql: "SELECT * FROM sbht_grade",
                    cartocss: "#sbht_grade{line-color: #000000;line-width: 5;line-dasharray: 2,3;}",
                    interactivity: "name, direction, grade",
                    name: "Grade",
                    id: "grade"
                },
                {   // CAUTION
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
                    id: "nps-poi"
                },
                {   // SBHT POI
                    sql: "SELECT * FROM sbht_poi_digitize",
                    cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                    name: 'SBHT POI',
                    id: "sbht-poi"
                },
                {   // COMM POI
                    sql: "SELECT * FROM comm_poi_master",
                    cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "name, type, mile, name_id, season, x, y, sw_offset, ne_offset, descrip, video, audio, phone, addr_no, addr_name, addr_type, city, zip, email, website",
                    name: 'Commercial POI',
                    id: "comm-poi"
                },
                {   // TRAIL PIX
                    sql: "SELECT * FROM trail_pix_digitize",
                    cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: "img_file, season",
                    name: 'Trail Pics',
                    id: "trail-pix"
                }
            ]
            
        });

})();
