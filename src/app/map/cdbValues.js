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
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht",
                    cartocss: "#sbht{line-color:green;line-width:4;}",
                    interactivity: 'cartodb_id',
                    route: 'trail-pix',
                    table: 'sbht'
                },
                {   // GRADE
                    sql: "SELECT the_geom_webmercator FROM sbht_grade",
                    cartocss: "#sbht_grade{line-color: #000000;line-width: 5;line-dasharray: 2,3;}",
                    route: '',
                    table: ''
                },
                {   // CAUTION
                    sql: "SELECT the_geom_webmercator FROM sbht_caution",
                    cartocss: "#sbht_caution{line-color:#F11810;line-width:5;}",
                    route: ''
                },
                {   // FEATURES
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM features",
                    cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: 'cartodb_id',
                    route: 'nps-poi',
                    table: 'nps_poi_giscloud'
                },
                {   // COMMERCIAL
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM comm_poi_master",
                    cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: 'cartodb_id',
                    route: 'comm-poi',
                    table: 'comm_poi_master'
                },
                // {   // TRAIL PIX
                //     sql: "SELECT the_geom_webmercator, cartodb_id FROM trail_pix_digitize",
                //     cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                //     interactivity: 'cartodb_id',
                //     route: 'trail-pix',
                //     table: 'trail_pix_digitize'
                // },
                // {   // NPS POI
                //     sql: "SELECT the_geom_webmercator, cartodb_id FROM nps_poi_giscloud",
                //     cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                //     interactivity: 'cartodb_id',
                //     route: 'nps-poi',
                //     table: 'nps_poi_giscloud'
                // },
                // {   // SBHT POI
                //     sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht_poi_digitize",
                //     cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                //     interactivity: 'cartodb_id',
                //     route: 'sbht-poi',
                //     table: 'sbht_poi_digitize'
                // },
            ]

        });

})();
