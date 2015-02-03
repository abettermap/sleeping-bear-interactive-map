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
    Copyright 2015 Jason Lampel (email : jason at abettermap.com)

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

// Insert html/php
// function insert_map_html( $atts ) {
function insert_map_html_func() {

    // $html_file = shortcode_atts( array(
    //     'filename' => 'home'
    // ), $atts );
	$htmlPath = plugin_dir_path(__FILE__) . 'src/app/html/views/map.html';
	include_once $htmlPath;

}
add_shortcode( 'insert_map_html', 'insert_map_html_func' );

function enqueue_map_styles_func(){

	// Leaflet
	wp_register_style( 'leaflet', 'http://cdn.leafletjs.com/leaflet-0.7/leaflet.css' );

	// map app styles
	wp_register_style( 'map_style', plugins_url() . '/wp-interactive-map/app/css/map-style.css' );

	// CAN'T DO THIS GHETTO SHIT DURING GAME TIME; MIGHT COULD LOOK INTO AN ADMIN CHECKBOX THAT WILL ACCOMPLISH
	// THIS BECAUSE THROWING IT INTO THE SHORTCODE MAKES IT LOAD IN THE BODY, NOT THE HEAD
	if ( is_page( 'project-explorer' ) ) {
		wp_enqueue_style( 'leaflet' );
		wp_enqueue_style( 'map_style' );
	}

}

add_action('wp_enqueue_scripts', 'enqueue_map_styles_func', 15);


function enqueue_map_scripts_func() {

	// Angular
	wp_register_script( 'angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js', array(), '1.0.0', true);

	// Angular route
	wp_register_script( 'angular_route', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min.js', array('angular'), '1.0.0', true);

	// cartodb, angular leaflet directive, carto.js, torque
	wp_register_script( 'map_vendors', plugins_url() . '/wp-interactive-map/app/js/vendor/map-vendors.js', array(), '1.0.0', true );

	// map app script
	wp_register_script( 'map_script', plugins_url() . '/wp-interactive-map/build/js/map-script.js', array('map_vendors'), '1.0.0', true );

	wp_enqueue_script('angular_route');
	wp_enqueue_script( 'map_script' );

}

add_shortcode( 'enqueue_map_resources', 'enqueue_map_scripts_func' );

?>