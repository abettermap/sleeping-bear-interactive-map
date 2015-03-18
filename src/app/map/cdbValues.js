(function() {

    'use strict';

    function getMss(css){
        var elem = '#mss-' + css,
            mss = $(elem).text();
        return mss;
    }


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
                    cartocss: "#sbht{line-color:green;line-width:3;}",
                    interactivity: 'cartodb_id',
                    route: 'trail-pix',
                    table: 'sbht'
                },
                {   // GRADE
                    sql: "SELECT the_geom_webmercator FROM sbht_grade",
                    cartocss: "#sbht_grade{line-color: #000000;line-width: 3;line-dasharray: 2,3;}",
                    route: '',
                    table: ''
                },
                {   // CAUTION
                    sql: "SELECT the_geom_webmercator FROM sbht_caution",
                    cartocss: "#sbht_caution{line-color:#F11810;line-width:3;}",
                    route: ''
                },
                {   // COMMERCIAL
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM commercial",
                    cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                    interactivity: 'cartodb_id',
                    route: 'commercial',
                    table: 'commercial'
                },
                {   // FEATURES
                    sql: "SELECT the_geom_webmercator, name, cartodb_id, type FROM features",
                    cartocss: getMss('feat'),
                    interactivity: 'cartodb_id',
                    route: 'features',
                    table: 'nps_poi_giscloud'
                },
            ]

        });

})();
