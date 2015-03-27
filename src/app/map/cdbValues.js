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
            baseInfo: {
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
            },
            trailSublayer: [ // Use trail as default sublayer
                {
                    sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht",
                    cartocss: getMss('lines'),
                    interactivity: 'cartodb_id',
                    route: 'trail-pix',
                    name: 'trail',
                    table: 'sbht'
                }
            ],
            gradeSublayer: { // GRADE
                cartocss: "#sbht_grade[zoom>=13]{line-color: red; line-width: 4; line-opacity: .76; line-join: round; line-smooth: .25;}",
                route: '',
                sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht_grade WHERE cartodb_id = null",
                name: 'grade',
                table: '',
            }, // end GRADE
            cautionSublayer: { // CAUTION
                cartocss: "#sbht_caution[zoom>=13]{line-color: yellow; line-width: 4; line-opacity: .76; line-join: round; line-smooth: .25;}",
                route: '',
                sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht_caution WHERE cartodb_id = null",
                name: 'caution',
                table: '',
            }, // end CAUTION
            commSublayer: { // COMMERCIAL
                sql: "SELECT the_geom_webmercator, cartodb_id FROM commercial",
                cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:.1;marker-allow-overlap:true;}",
                // interactivity: 'cartodb_id',
                route: 'commercial',
                name: 'comm',
                table: 'commercial'
            }, // end COMMERCIAL
            featSublayer: { // FEATURES
                cartocss: getMss('features'),
                // cartocss: "#features[cartodb_id=2]{marker-width: 14}",
                interactivity: 'cartodb_id, type, name_id, mile',
                route: 'features',
                sql: "SELECT features.the_geom_webmercator, features.cartodb_id, features.type, features.mile, features.name_id, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE substring(features.seasons,3,1) = 'y' ORDER BY priority",
                // AND features.type = 'mainpoints' (ADD THIS BACK IN LATER)
                name: 'features',
                table: 'nps_poi_giscloud'
            }, // end FEATURES

        });

})();
