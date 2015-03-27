<?php

	// To enable WP functions
	include $_SERVER['DOCUMENT_ROOT'].'/wp-load.php';

	// Base path to all images + subpath (via request)
 	$img_path = WP_CONTENT_DIR . '/sbht-i-map/img-prod/' . $_GET['dir'];

 	// Just the pics
	$img_dir = $img_path . '*.{JPG,jpg,jpeg,PNG,gif,png}';

	// Loop throuhg
	// foreach (glob($img_dir, GLOB_BRACE) as $filename) {
		// print_r(basename($filename . ','));
	// }

	$files = array_diff( scandir($img_path), array(".", "..") );

	// $total = count($files);
	$result = json_encode($files);


	// if ($total = 0){
	// 	print_r('more than 0' . json_encode($files));
	// } else {
	// 	print_r($total);
	// }

	print_r($result);

?>