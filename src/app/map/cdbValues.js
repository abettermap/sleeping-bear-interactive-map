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
                }
            ],
            gradeSublayer: {
                cartocss: "" +
                    "#sbht_grade{line-color: red; line-width: 4; line-opacity: .76; line-join: round; line-smooth: .25;}",
                sql: "SELECT the_geom_webmercator, cartodb_id, grade FROM sbht_grade WHERE cartodb_id = 0",
            },
            cautionSublayer: {
                cartocss: "" +
                    "#sbht_caution{line-color: yellow; line-width: 4; line-opacity: .76; line-smooth: .25; line-join: round;}" +
                    "#sbht_caution::bottom {line-width:12; line-opacity: .1; line-color: yellow;}" +
                    "#sbht_caution::labels[zoom >= 14]{" +
                      "text-name: [type_name];" +
                      "text-face-name: 'DejaVu Sans Book';" +
                      "text-size: 11;" +
                      "text-opacity: .85;" +
                      "text-label-position-tolerance: 0;" +
                      "text-fill: #000;" +
                      "text-halo-fill: rgba(255,255,0,.6);" +
                      "text-halo-radius: 2;" +
                      "text-dy: 10;" +
                      "text-allow-overlap: true;" +
                      "text-placement: line;" +
                      // "text-placement-type: dummy;" +
                    "}",
                interactivity: 'cartodb_id, type_name, type',
                sql: "SELECT the_geom_webmercator, cartodb_id, type_name, type FROM sbht_caution WHERE cartodb_id = 0",
            },
            commSublayer: { // COMMERCIAL
                cartocss: getMss('commercial'),
                interactivity: 'cartodb_id, type, filepath, layer, seasons, lin_dist',
                sql: "SELECT 'commercial' AS layer, commercial.lin_dist, commercial.the_geom_webmercator, commercial.seasons, commercial.cartodb_id, commercial.type, commercial.filepath, commercial_types.name AS type_name, commercial_types.priority FROM commercial INNER JOIN commercial_types ON commercial.type=commercial_types.type WHERE commercial.cartodb_id = 0",
            },
            featSublayer: { // FEATURES
                cartocss: getMss('features'),
                interactivity: 'cartodb_id, type, filepath, layer, seasons, lin_dist',
                sql: "SELECT 'features' AS layer, features.lin_dist, features.the_geom_webmercator, features.seasons, features.cartodb_id, features.type, features.filepath, feature_types.name AS type_name, feature_types.priority FROM features INNER JOIN feature_types ON features.type=feature_types.type WHERE substring(features.seasons,3,1) = 'y' AND features.type = 'mainpoints' ORDER BY priority DESC",
            },
            sharedQueries: {
                url: "https://remcaninch.cartodb.com/api/v2/sql?q=",
                sql: "SELECT cartodb_id, lin_dist, the_geom, the_geom_webmercator, filepath, ST_X(the_geom) AS lon, ST_Y(the_geom) AS lat,"
            }

        });

})();
