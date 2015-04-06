<?php

	// To enable WP functions
	// include $_SERVER['DOCUMENT_ROOT'].'/wp-load.php';

	// Base path to all images + subpath (via request)
 	// $img_path = WP_CONTENT_DIR . '/sbht-i-map/img-prod/' . $_GET['dir'];
 	$img_path = $_SERVER['DOCUMENT_ROOT'] . '/sbht-i-map/img_prod/' . $_GET['dir'];
 	// $img_path = 'img-prod/' . $_GET['dir'];
    // echo $img_path;
 	// Just the pics
	$img_dir = $img_path . '*.{JPG,jpg,jpeg,PNG,gif,png}';

	// Ignore subdirs and desktop.ini
	$files = array_diff( scandir($img_path), array(".", "..", "desktop.ini") );

	$result = json_encode($files);

	print_r($result);

?>