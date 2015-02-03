<?php
/*
Plugin Name: Sleeping Bear Heritage Trail Interactive Map
Plugin URI: http://abettermap.com/contact
Description: An interactive map of the Sleeping Bear Heritage Trail, powered by Leaflet, CartoDB, and AngularJS.
Version: 1.0 or whatever version of the plugin (pretty self explanatory)
Author: Jason Lampel
Author URI: http://abettermap.com
License: GPL version 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/
/*
    Copyright 2015 Jason Lampel (email: jason at abettermap.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

    function insert_map_func() {

        //// ENQUEUE FILES \\\\

        // Enqueue styles and scripts based on dev/prod by checking if wp-local-config.php exists
        $localConfig = $_SERVER['DOCUMENT_ROOT'] .'/wp-local-config.php';

        if (file_exists($localConfig)) {    // DEVELOPMENT

            // DON'T FORGET THAT THERE WILL BE TWO SETS OF CODE (ONE FOR KIOSKS) \\


            // Register map style (should be combined w/Leaflet and CartoDB CSS if needed)
            wp_register_style( 'map_style', plugins_url() . '/wp-fosb-map/src/assets/css/map-style.css' );


            ////// DEREGISTER JQUERY?? \\\\\\

            // Angular
            wp_register_script( 'angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.js', array(), '1.0.0', true);

            // Angular route
            wp_register_script( 'angular_route', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.js', array('angular'), '1.0.0', true);

            // Vendor scripts UNminified: leaflet BUILD, cartodb build?, fastclick, fancybox, others?
            wp_register_script( 'map_vendors', plugins_url() . '/wp-sbht-map/assets/js/vendor/map-vendors.js', array(), '1.0.0', true );

            // map app script
            wp_register_script( 'map_script', plugins_url() . '/wp-sbht-map/src/assets/js/map-script.js', array('map_vendors'), '1.0.0', true );

        }
        else {  // PRODUCTION

            // DON'T FORGET THAT THERE WILL BE TWO SETS OF CODE (ONE FOR KIOSKS) \\

            /// Stylesheets \\\
            // Register map style (should be combined w/Leaflet and CartoDB CSS if needed)
            wp_register_style( 'map_style', plugins_url() . '/wp-fosb-map/dist/assets/css/map-style.css' );

            /// Scripts \\\

            ////// DEREGISTER JQUERY?? \\\\\\

            // Angular minified
            wp_register_script( 'angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js', array(), '1.0.0', true);

            // Angular route minified
            wp_register_script( 'angular_route', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min.js', array('angular'), '1.0.0', true);

            // Vendor scripts minified: leaflet BUILD, cartodb build?, fastclick, fancybox, others?
            wp_register_script( 'map_vendors', '/wp-sbht-map/dist/assets/js/map-vendors.js', array(), '1.0.0', true);

            // map app script
            wp_register_script( 'map_script', plugins_url() . '/wp-sbht-map/build/js/map-script.js', array('map_vendors'), '1.0.0', true );

        }

        // Enqueue map style
        function enqueue_map_styles_func(){
            wp_enqueue_style( 'map_style' );
        }
        // delay so that it loads after theme css
        add_action('wp_enqueue_scripts', 'enqueue_map_styles_func', 15);

        // Enqueue Angular and map scripts (dev/prod irrelevant)
        wp_enqueue_script('angular_route');
        wp_enqueue_script( 'map_script' );

    }

    add_shortcode( 'insert_map', 'insert_map_func' ); // will need to modify for dynamically pointing to kiosk stylesheet

?>