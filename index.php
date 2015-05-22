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

        <style>
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

        <script type="text/javascript">
            function loadCSS(a,b,c,d){"use strict";var e=window.document.createElement("link"),f=b||window.document.getElementsByTagName("script")[0],g=window.document.styleSheets;return e.rel="stylesheet",e.href=a,e.media="only x",d&&(e.onload=d),f.parentNode.insertBefore(e,f),e.onloadcssdefined=function(b){for(var c,d=0;d<g.length;d++)g[d].href&&g[d].href.indexOf(a)>-1&&(c=!0);c?b():setTimeout(function(){e.onloadcssdefined(b)})},e.onloadcssdefined(function(){e.media=c||"all"}),e};
            loadCSS("src/assets/css/map-style.css");
        </script>

        <noscript>
            <!-- build:css src/assets/css/map-style.css -->
            <link id="map-style" rel="stylesheet" href="src/assets/css/map-style.css">
            <!-- endbuild -->
        </noscript>

        <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
        <!-- Place favicon.ico in the root directory -->

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
        <div id="fb-root"></div>
        <script>
          window.fbAsyncInit = function() {
            FB.init({
              // appId      : '1402814523372321',
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
        <span class="never-show">
          <?php include('src/assets/img/svg/project/defs/fosb-svg-defs.svg'); ?>
        </span>
        <span id="mss-trail_condition" class="never-show">
            <?php
              $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-trail_condition.mss');
              echo $contents;
            ?>
        </span>
        <span id="mss-features" class="never-show">
            <?php
              $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-features.mss');
              echo $contents;
            ?>
        </span>
        <span id="mss-commercial" class="never-show">
            <?php
              $contents = file_get_contents( 'src/assets/spatial/carto-css/sbht-commercial.mss');
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
        <div id="map-wrapper" class="map-wrapper">
          <interactive-map></interactive-map>
          <panels></panels>
          <map-controls></map-controls>
          <div ui-view></div>
        </div>
        <script type="text/javascript" src="//cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.12/cartodb.js"></script>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js"></script>

        <!-- <script type="text/javascript" src="./src/assets/js/vendor/ngDialog.js"></script> -->
        <!-- <script type="text/javascript" src="./src/assets/js/vendor/svg4everybody.ie8.js"></script> -->

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