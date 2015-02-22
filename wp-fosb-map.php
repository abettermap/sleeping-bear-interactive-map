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

    function customfield_scripts_styles(){

        if ( is_singular() ) {
            $post = get_post();
            if ( is_a( $post, 'WP_Post' ) ) {

                // $custom_scripts = get_post_meta( $post->ID, 'custom_scripts', false );
                // $queue_id = 0;
                // foreach ( (array) $custom_scripts as $custom_script ) {
                //     wp_enqueue_script( 'custom-script-'.$post->ID.'-'.$queue_id, $custom_script );
                //     $queue_id++;
                // }

                $custom_styles = get_post_meta( $post->ID, 'enqueue-map-style', true );
                $queue_id = 0;
                foreach ( (array) $custom_styles as $custom_style ) {
                    // wp_enqueue_style( 'custom-style-'.$post->ID.'-'.$queue_id, $custom_style );
                        $file_path = plugins_url() . '/wp-fosb-map/src/assets/css/' . $custom_style . '.css';
                        wp_register_style( 'map_style', $file_path );
                        wp_enqueue_style( 'map_style' );
                        $queue_id++;
                }
            }
        }
    }
    add_action( 'wp_enqueue_scripts', 'customfield_scripts_styles');

    function insert_map_html_func() {

        // Get the Angular ball rolling, likely change later w/better understanding
        $htmlPath = plugin_dir_path(__FILE__) . 'src/app/config/map.html';
        include_once $htmlPath;
        enqueue_map_resources_func();

    }
    add_shortcode( 'insert_map_html', 'insert_map_html_func' );

    function enqueue_map_resources_func() {

        //// ENQUEUE FILES \\\\

        // use this instead of messing with custom fields? probably.
        // $localConfig = $_SERVER['DOCUMENT_ROOT'] .'/wp-content/plugins/wp-fosb-map/wp-local-config.php';

        // if (file_exists($localConfig)) {    // DEVELOPMENT

            ////// DEREGISTER JQUERY?? \\\\\\
        // Fastclick needs to load before other stuff
        wp_register_script( 'fastclick', plugins_url() . '/wp-fosb-map/src/assets/js/vendor/fastclick.js', array(), '1.0.0', false );

        // Angular
        wp_register_script( 'angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js', array(), '1.0.0', true);

        // Angular route
        // wp_register_script( 'angular_route', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.js', array('angular'), '1.0.0', true);

        // Angular ui.router
        wp_register_script( 'ng_ui_router', '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js', array('angular'), '1.0.0', true);

        // Vendor scripts UNminified: leaflet BUILD, cartodb build?, leaflet-directive, fastclick, fancybox, picturefill, bindonce, others?
        wp_register_script( 'map_vendors', plugins_url() . '/wp-fosb-map/src/assets/js/vendor/map-vendors.js', array(), '1.0.0', true );

        // map app script
        wp_register_script( 'map_script', plugins_url() . '/wp-fosb-map/src/app/map-app.js', array('map_vendors'), '1.0.0', true );

        // Enqueue Angular and map scripts (dev/prod irrelevant)
        wp_enqueue_script('fastclick');
        wp_enqueue_script('ng_ui_router');
        wp_enqueue_script( 'map_script' );

    }

?>