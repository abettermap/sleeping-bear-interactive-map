<!doctype html>
<html class="no-js" lang="" ng-app="mapApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">

        <!-- <title ng-bind="$root.metaInfo.title"></title> -->
        <title>Sleeping Bear Heritage Trail - Interactive Map</title>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Average+Sans|Brawler">

        <!-- <meta name="description" ng-attr-content="{{$root.metaInfo.description}}" /> -->

        <meta name="description" ng-attr-content="An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country." />

        <meta property="og:image" content="http://friendsofsleepingbear.org/wp-content/uploads/2012/06/SBHT-Logo-300x300-192x192.jpg" />

        <meta property="og:description" content="An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country." />
        <meta property="og:type" content="website" />

        <meta name="twitter:description" content="An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country." />
        <meta name="twitter:title" content="Sleeping Bear Heritage Trail - Interactive Map" />

        <meta name="viewport" content="width=device-width, initial-scale=1">


        <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="src/assets/css/map-style.css">
        <!-- <script src="js/vendor/modernizr-2.8.3.min.js"></script> -->

        <!-- // Fastclick needs to load before other stuff -->
        <script type="text/javascript" src="src/assets/js/vendor/fastclick.js"></script>
        <script type="text/javascript">

          var _gaq = _gaq || [];
          _gaq.push(['_setAccount', 'UA-41881011-18']);
          _gaq.push(['_trackPageview']);

          (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
          })();

        </script>
    </head>
    <body>
        <span class="never-show">
          <?php include('src/assets/img/svg/project/defs/fosb-svg-defs.svg'); ?>
        </span>
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
          <div id="map-wrapper" class="map-wrapper">
            <interactive-map></interactive-map>
            <panels></panels>
            <map-controls></map-controls>
            <div ui-view></div>
          </div>
          <!-- <playground></playground> -->
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
        <!-- <script type="text/javascript" src="src/assets/js/vendor/cartodb.uncompressed.js"></script> -->

        <!-- Vendor scripts UNminified: leaflet BUILD, cartodb build?, leaflet-directive, fastclick, fancybox, picturefill, bindonce, others? -->
        <script type="text/javascript" src="src/assets/js/vendor/map-vendors.js"></script>

        <!-- Map App -->
        <script type="text/javascript" src="src/app/map-app.js"></script>


    </body>
</html>