<!doctype html>
<html ng-app="mapApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0">
        <title ng-bind="$root.metaInfo.title"></title>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Average+Sans|Brawler">

        <meta name="description" ng-attr-content="An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country." />
        <meta property="og:image" content="src/assets/img/raster/logos/sbht-logo.jpg" />
        <meta property="og:description" content="An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country." />
        <meta property="og:type" content="website" />
        <meta name="twitter:description" content="An interactive map of the Sleeping Bear Heritage Trail, Northwest Michigan's most popular pathway running through the heart of dune country." />
        <meta name="twitter:title" content="Sleeping Bear Heritage Trail - Interactive Map" />

        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

        <style type="text/css">
            .map {
              bottom: 3.5rem;
              position: absolute;
              top: 0;
              width: 100%;
            }
            .controls__label {
              background: #7caad4;
              border-radius: 100%;
              height: 47.5px;
              position: absolute;
              text-align: center;
              width: 47.5px;
              z-index: 2;
            }
            .never-show {
              display: none;
            }
            .panel__toggle {
              background-color: #7caad4;
              border-left: solid #5591c8 1px;
              color: #f9f9f9;
              font-size: 1.3rem;
              padding: 0;
              text-align: center;
              text-decoration: none;
              text-shadow: 1px 1px 5px #222;
              width: 25%;
              -webkit-align-items: center;
              -ms-flex-align: center;
              align-items: center;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-justify-content: center;
              -ms-flex-pack: center;
              justify-content: center;
            }
        </style>

        <!-- build:css src/assets/css/map-style.css -->
        <link rel="stylesheet" href="./src/assets/css/map-style.css">
        <!-- endbuild -->

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="152x152" href="src/assets/img/raster/apple-icons/apple-touch-icon-152x152.png" />

        <script type="text/javascript" src="src/assets/js/vendor/fastclick.js" async></script>
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
        <div id="fb-root"></div>
        <script>
          window.fbAsyncInit = function() {
            FB.init({
              appId      : '1440362136274547',
              xfbml      : true,
              version    : 'v2.3'
            });
          };

          (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "http://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
           }(document, 'script', 'facebook-jssdk'));
        </script>
        <div id="map-wrapper" class="map-wrapper">
          <interactive-map></interactive-map>
          <panels></panels>
          <map-controls></map-controls>
          <div ui-view></div>
        </div>
        <?php
            $contents = file_get_contents( 'src/assets/img/svg/project/defs/fosb-svg-defs.svg' );
            echo '<span class="never-show">' . $contents . '</span>';
            $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-trail_condition.mss');
            echo '<span id="mss-trail_condition" class="never-show">' . $contents . '</span>';
            $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-features.mss');
            echo '<span id="mss-features" class="never-show">' . $contents . '</span>';
            $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-commercial.mss');
            echo '<span id="mss-commercial" class="never-show">' . $contents . '</span>';
            $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-trail.mss');
            echo '<span id="mss-lines" class="never-show">' . $contents . '</span>';
            $contents = file_get_contents( 'src/assets/img/svg/project/defs/fosb-svg-defs.svg');
            echo '<span class="never-show">' . $contents . '</span>';
            $contents = file_get_contents( 'src/assets/img/svg/project/defs/gooey.svg');
            echo '<span class="never-show">' . $contents . '</span>';
        ?>
        <script type="text/javascript" src="//cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.12/cartodb.js"></script>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js"></script>

        <!-- build:js src/assets/js/map-vendors.js -->
        <script type="text/javascript" src="./src/assets/js/vendor/angular-animate.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/angular-ui-router.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/esri-leaflet-basemaps.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/leaflet-history-src.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/leaflet-gps.js"></script>
        <!-- endbuild -->

        <!-- build:js src/app/map-app.js -->
        <script type="text/javascript" src="./src/app/map-app.js"></script>
        <!-- endbuild -->

    </body>
</html>