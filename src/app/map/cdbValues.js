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
            // detectRetina: true,
            sql_domain: "cartodb.com",
            sql_port: "443",
            sql_protocol: "https",
            tiler_protocol: "https",
            tiler_domain: "cartodb.com",
            tiler_port: "443",
            type: 'CartoDB',
            user_name: 'remcaninch',
            sublayers: [
                {   // TRAIL
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht",
                    cartocss: getMss('lines'),
                    // interactivity: 'cartodb_id',
                    route: 'trail-pix',
                    table: 'sbht'
                },
                {   // GRADE
                    // cartocss: getMss('lines'),
                    cartocss: "#sbht_grade{line-pattern-file: url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/chevro.png);}",
                    route: '',
                    sql: "SELECT the_geom_webmercator FROM sbht_grade",
                    table: '',
                },
                {   // CAUTION
                    // cartocss: getMss('lines'),
                    cartocss: "#sbht_caution{line-color: yellow; line-width: 4; line-opacity: .76; line-join: round; line-smooth: .25;}",
                    route: '',
                    sql: "SELECT the_geom_webmercator FROM sbht_caution",
                    table: '',
                },
                {   // COMMERCIAL
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM commercial",
                    cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:.1;marker-allow-overlap:true;}",
                    // interactivity: 'cartodb_id',
                    route: 'commercial',
                    table: 'commercial'
                },
                {   // FEATURES
                    sql: "SELECT the_geom_webmercator, name, cartodb_id, type FROM features ORDER BY type ASC",
                    cartocss: getMss('features'),
                    interactivity: 'cartodb_id',
                    route: 'features',
                    table: 'nps_poi_giscloud'
                },
            ]

        });

})();
