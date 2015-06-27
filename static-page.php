<?php

    // Run CartoDB query
    $jsonData = getData();

    // Create the temp "page"
    makePage($jsonData);

    function getData() {

        $id = ctype_digit($_GET['id']) ? $_GET['id'] : 1;
        $table = $_GET['table'];

        // Set CDB query
        $columns = ' cartodb_id, filepath, \'' . $table . '\' as table,
            ROUND(ST_X("' . $table . '"."the_geom")::numeric, 5) AS lon,
            ROUND(ST_Y("' . $table . '"."the_geom")::numeric, 5) AS lat';

        if ($table === 'commercial' || $table === 'features'){
            $columns = $columns .
            ', name, (SELECT "narrative" FROM "narratives" WHERE "' . $table . '"."filepath" = "narratives"."filepath")';
        }

        $url = 'http://remcaninch.cartodb.com/api/v2/sql?q=SELECT' . urlencode($columns . ' FROM ' . $table . ' WHERE cartodb_id = ' . $id . ' LIMIT 1');

        // Get results, decode JSON, return result
        $rawData = file_get_contents($url);
        $ez = json_decode($rawData);
        return $ez->rows[0];

    }

    function makePage($data) {

        // Set description and name
        $default_description = 'An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan\'s most popular pathway running through the heart of dune country.';
        $name;
        $description;

        if (property_exists($data, 'narrative')){
            if ($data->narrative !== ''){
                $description = $data->narrative;
                $description = strip_tags($description);
                $description = str_replace(array("\n"), " - ", $description);
            } else {
                $description = $default_description;
            }
            $name = $data->name;
            $img_suffix = $data->filepath . 'image00001.jpg';
        } else {
            $img_suffix = $data->filepath;
            $description = $default_description;
            if ($data->table === 'trail_pix') {
                $name = 'Trail Photo';
            } elseif ($data->table === 'trail_pix') {
                $name = 'X/C Ski Conditions';
            } else {
                $name = 'Faces Along the Trail';
            }
        }

        // Set URL and title
        $pageUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/sbht-i-map/test/popup/' . $data->table . '/' . $data->cartodb_id;
        $pageTitle = $name . ' | Sleeping Bear Heritage Trail Interactive Map';

        // Set image path
        $img_path = 'http://friendsofsleepingbear.org/sbht-i-map/img_prod/' . $data->table . '/mid_size' . $img_suffix;
        $size = getimagesize($img_path);

        ?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $pageTitle; ?></title>
        <meta name="description" content="<?php echo strip_tags($description); ?>" />
        <!-- Open Graph metadata -->
        <meta property="og:title" content="<?php echo $pageTitle; ?>" />
        <meta property="og:description" content="<?php echo $description; ?>" />
        <meta property="og:site_name" content="Sleeping Bear Heritage Trail Interactive Map" />

        <?php
            /*** Add image ***/
            echo '<meta property="og:image" content="' . $img_path . '" />' . "\r\n";
            echo '<meta property="og:image:type" content="image/jpeg" />';
            echo '<meta property="og:image:width" content="' . $size[0] . '" />' . "\r\n";
            echo '<meta property="og:image:height" content="' . $size[1] . '" />' . "\r\n";

            // Pinterest location experiment
            if ($_SERVER['HTTP_USER_AGENT'] !== 'Pinterest/0.1 +http://pinterest.com/') {
            } else {
                echo '<meta property="og:type" content="place" />';
                echo '<meta property="place:location:latitude" content="' . $data->lat . '" />';
                echo '<meta property="place:location:longitude" content="' . $data->lon . '" />';
            }
        ?>
        <!-- Twitter summary card metadata -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="<?php echo $pageTitle; ?>" />
        <meta property="twitter:description" content="<?php echo strip_tags($description); ?>" />
        <meta property="twitter:image" content="<?php echo $img_path; ?>" />

    </head>
    <body>
        <h1><?php echo $name; ?></h1>
        <p>$pageUrl: <?php echo $pageUrl; ?></p>
        <!-- Show image for Pinterest -->
        <?php echo '<img src="' . $img_path . '">'; ?>
        <p><?php echo strip_tags($description); ?></p>
    </body>
</html><?php
    }
?>