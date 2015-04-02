<?php

	// To enable WP functions
	// include $_SERVER['DOCUMENT_ROOT'].'/wp-load.php';

	// Base path to all images + subpath (via request)
 	// $img_path = WP_CONTENT_DIR . '/sbht-i-map/img-prod/' . $_GET['dir'];
 	$img_path = $_SERVER['DOCUMENT_ROOT'] . '/sbht-i-map/img-prod/' . $_GET['dir'];
 	// $img_path = 'img-prod/' . $_GET['dir'];

 	// Just the pics
	$img_dir = $img_path . '*.{JPG,jpg,jpeg,PNG,gif,png}';

	// Loop throuhg
	// foreach (glob($img_dir, GLOB_BRACE) as $filename) {
		// print_r(basename($filename . ','));
	// }

	$files = array_diff( scandir($img_path), array(".", "..") );

	$result = json_encode($files);

	print_r($result);

?>