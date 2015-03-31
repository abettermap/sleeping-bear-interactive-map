<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Sleeping Bear Heritage Trail - Interactive Map</title>
        <!-- <meta name="description" content=""> -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
        <!-- Place favicon.ico in the root directory -->

        <!-- <link rel="stylesheet" href="css/normalize.css"> -->
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Average+Sans">
        <link rel="stylesheet" href="src/assets/css/map-style.css">
        <!-- <script src="js/vendor/modernizr-2.8.3.min.js"></script> -->

        <!-- // Fastclick needs to load before other stuff -->
        <script type="text/javascript" src="src/assets/js/vendor/fastclick.js"></script>
    </head>
    <body>
        <?php include('src/assets/img/svg/project/defs/fosb-svg-defs.svg'); ?>
        <div ng-app="mapApp">
          <span id="mss-features" class="never-show">
              <?php
                $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-features.mss');
                echo $contents;
              ?>
          </span>
          <span id="mss-lines" class="never-show">
              <?php
                $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-trail.mss');
                echo $contents;
              ?>
          </span>
          <div class="never-show" ng-include="src/assets/img/svg/project/defs/fosb-svg-defs.svg"></div>
        <!--     <header id="page-header" class="page-header">
              <h1>Sleeping Bear Heritage Trail</h1>
              <p>Interactive Map Explorer</p>
            </header> -->
            <div id="map-wrapper" class="map-wrapper">
              <interactive-map></interactive-map>
              <panels></panels>
              <div ui-view></div>
              <map-controls></map-controls>
            </div>  <!-- </div> -->
            <!-- <playground></playground> -->
        </div>
        <svg class="never-show" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="shadowed-goo">
                  <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                  <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                  <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                  <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                  <feComposite in2="shadow" in="goo" result="goo" />
                  <feComposite in2="goo" in="SourceGraphic" result="mix" />
              </filter>
              <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                  <feComposite in2="goo" in="SourceGraphic" result="mix" />
              </filter>
            </defs>
        </svg>
        <!-- AngularJS -->
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.js"></script>

        <!-- Angular ui.router -->
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js"></script>

        <!-- Angular animate -->
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-animate.min.js"></script>

        <!-- CartoDB CDN -->
        <script type="text/javascript" src="//cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.12/cartodb.js"></script>

        <!-- Vendor scripts UNminified: leaflet BUILD, cartodb build?, leaflet-directive, fastclick, fancybox, picturefill, bindonce, others? -->
        <script type="text/javascript" src="src/assets/js/vendor/map-vendors.js"></script>

        <!-- Map App -->
        <script type="text/javascript" src="src/app/map-app.js"></script>


    </body>
</html>