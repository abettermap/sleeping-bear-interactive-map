<?php

	include $_SERVER['DOCUMENT_ROOT'].'/wp-load.php';
	$img_path = WP_CONTENT_DIR . '/sbht-i-map/img-src/' . $_GET['dir'];
	$files = scandir($img_path);
	$j = json_encode($files);

	print_r($j);

?>