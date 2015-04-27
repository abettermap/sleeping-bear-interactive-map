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

        <!-- <base href="/public_html/sbht-i-map/"> -->

        <style>
            img{border:0}.logos,.poi-subgroup-list,.poi-type-list{list-style-type:none}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}nav{display:block}a{background-color:transparent}b{font-weight:700}small{font-size:80%}svg:not(:root){overflow:hidden}input{color:inherit;font:inherit;margin:0}.btn{cursor:pointer}input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}*{box-sizing:border-box}.leaflet-layer,.leaflet-tile,.leaflet-tile-container{position:absolute;left:0;top:0}.leaflet-tile{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-container img{max-width:none!important}.leaflet-tile{-webkit-filter:inherit;filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-tile-pane{z-index:2}.leaflet-overlay-pane{z-index:4}.leaflet-shadow-pane{z-index:5}.leaflet-marker-pane{z-index:6}.leaflet-popup-pane{z-index:7}.leaflet-control{position:relative;z-index:7;pointer-events:auto;float:left;clear:both}.label--seasons svg,.leaflet-bottom,.leaflet-top,.no-hover{pointer-events:none}.leaflet-bottom,.leaflet-top{position:absolute;z-index:1000}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-left{left:0}.leaflet-right .leaflet-control{float:right;margin-right:10px}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-fade-anim .leaflet-tile{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-tile-loaded{opacity:1}.leaflet-container{overflow:hidden;-ms-touch-action:none;cursor:-webkit-grab;cursor:-moz-grab;background:#ddd;outline:0;font:12px/1.5 "Helvetica Neue",Arial,Helvetica,sans-serif}.leaflet-control,.leaflet-popup-pane{cursor:auto}.leaflet-container a{color:#0078A8}.leaflet-bar{box-shadow:0 1px 5px rgba(0,0,0,.65);border-radius:4px}.leaflet-container .leaflet-control-attribution{margin:0}.leaflet-control-attribution{padding:0 5px;color:#333}.leaflet-control-attribution a{text-decoration:none}a{text-decoration:underline}.leaflet-container .leaflet-control-attribution{font-size:11px}.leaflet-touch .leaflet-bar,.leaflet-touch .leaflet-control-attribution{box-shadow:none}.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.info-page--topic h5,h5{color:#38629c;font-weight:400}.leaflet-control-gps .gps-button{display:block;float:left;width:50px;height:50px;position:absolute;background:0 0;border-radius:100%}.leaflet-control-gps .gps-alert{position:absolute;left:26px;bottom:-1px;width:100px;padding:2px;line-height:.95em;color:#e00;border:1px solid #888;background-color:rgba(255,255,255,.75);border-radius:4px}.css-tooltip-right{position:absolute!important;display:none;text-decoration:none!important;z-index:2}.css-tooltip-right .tooltip{min-width:180px;font-family:arial,sans-serif!important;font-size:13px!important;line-height:normal!important;text-align:left!important;padding:10px 10px 12px!important;visibility:hidden;opacity:0;position:absolute;z-index:9999999!important;transition-duration:.25s;transition-timing-function:cubic-bezier(.35,0,.35,1);left:100%;transition-property:opacity,margin-left,visibility}.css-tooltip-right .tooltip:before{content:"";display:block;width:0;height:0;position:absolute;border-left:0!important;border-right:8px solid #000;border-top:8px solid transparent!important;border-bottom:8px solid transparent!important;top:11px;left:-8px}.never-show,.panel__header>.btn--left.btn.vis-hidden{opacity:0}.color-blue .tooltip{color:#fff!important;background:#31598a;background:linear-gradient(top,#37659d 0,#31598a 100%);border-radius:4px;text-shadow:0 1px 0 rgba(0,0,0,.4)}.color-blue .tooltip:before{border-color:#31598a}.color-blue .tooltip:after{content:"";display:block;border-top:1px solid #6591c3;position:absolute;left:0;top:1px;width:100%;height:10px;border-radius:4px}.panel{box-shadow:0 -5px 25px 0 grey;position:absolute;width:100%;z-index:1000001;overflow:auto;overflow-x:hidden}.panel input:not(:checked)+label{background-color:#e0e9ec;border-radius:10px;border:1px solid #b1c6cf;color:#a6a6a6}@media (min-width:64.0625em){.panel input:not(:checked)+label{transition:all 300ms ease}}.panel input:checked+label{background-color:#9ab6c2;border:1px solid #5d8799;border-radius:10px;color:#f9f9f9;text-shadow:1px 1px 1px #4d4d4d}.btn{background-color:#5591c8;color:#f9f9f9;border-radius:5px;padding:0 .2rem .2rem;border:1px solid #4687c3;text-decoration:none;transition:background-color 300ms ease}.btn.panel__close{float:right;margin-top:.05rem}.btn.panel__close svg{height:2.2rem;width:2.2rem}.btn.btn--left{float:left}.label--seasons,.panel--trail__label{-webkit-align-items:center;-ms-flex-align:center;align-items:center;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.no-hover{cursor:move}.panel .panel__header{background-color:#7caad4;color:#f9f9f9;font-size:1.5rem;height:3.3rem;left:0;margin:0;padding:.5rem .7rem;right:0;text-align:center;top:0;z-index:1}.panel .panel__header svg{fill:#f9f9f9;height:1.7rem;width:1.7rem;transition:fill 300ms ease;vertical-align:bottom}.panel__inner{bottom:0;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex:1;-ms-flex:1;flex:1;font-size:1rem;left:0;position:absolute;right:0;top:3.3rem;overflow-y:auto}.clearfix:after,.popup__header--inner{overflow:hidden}.map,.panel{bottom:3.5rem}.panel__inner::-webkit-scrollbar{width:1rem}.panel__inner::-webkit-scrollbar-thumb{border-radius:7px;border:1px solid rgba(128,128,128,.35);background-color:rgba(225,225,225,.9)}.panel__inner::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#eee}.panel__inner::-webkit-scrollbar-thumb{background:linear-gradient(to left,rgba(128,128,128,.15) 20%,rgba(124,170,212,0) 100%)}.panel__box{min-height:-webkit-min-content;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex:0 100%;-ms-flex:0 100%;flex:0 100%}.panel__row{padding:1.2rem;width:100%}.map{height:90%;height:calc(100% - 3.5rem);position:absolute;top:0;width:100%}.map-wrapper{height:100%;width:100%}.controls{box-shadow:2px 2px 5px grey;left:1.3333333333rem;position:absolute;top:1.3333333333rem}.panel{background:url(../img/raster/background.jpg);position:absolute;top:0}@media (min-width:46.25em){.panel{height:29rem;top:auto;width:375px}.panel:first-of-type{left:1%}.panel:nth-of-type(2){left:20%}.panel:nth-of-type(3){left:45%}.panel:nth-of-type(4){right:1%}}body,html{height:100%;width:100%}body{-webkit-backface-visibility:hidden;background-color:#edede3;margin:0;padding:0}.never-show,input{display:none}h3{color:#526b87;font-size:1.5rem;margin:0 0 .3rem}.info-page--topic h5{fill:#6483a0;font-family:Brawler,serif;font-size:1.4rem;margin:1rem auto .4rem;vertical-align:bottom}body,h5{font-family:'Average Sans',sans-serif}h5{font-size:1.2rem;margin:.6rem auto .2rem}h5+p{margin-top:0}a{color:#7caad4}.panel__toggle,.poi-subgroup-link,.poi-subgroup-link .poi-subgroup__preview{text-decoration:none}img{max-width:100%}label{cursor:pointer;display:block}p{font-size:.95rem;margin-top:.8rem}.leaflet-container .leaflet-control-attribution{background:rgba(255,255,255,.4);border-top-left-radius:5px;text-align:right;width:190px}.leaflet-bottom{bottom:7px}:focus{outline:0}.clearfix:after{clear:both;content:' ';display:block;font-size:0;height:0}html{overflow-x:hidden;font-size:14px}@media (min-width:46.25em){html{font-size:16px}}body{color:#4d4d4d}.controls__label,.controls__menu-item{background:#7caad4;border-radius:100%;position:absolute}.filter-container-x,.filter-container-y{filter:url(../img/svg/project/defs/gooey.svg#shadowed-goo);-webkit-filter:url(#shadowed-goo);position:absolute}.controls__checkbox{display:none}.controls__label{height:47.5px;text-align:center;transition:-webkit-transform 200ms cubic-bezier(.175,.885,.32,1.275);transition:transform 200ms cubic-bezier(.175,.885,.32,1.275);width:47.5px;z-index:2}@media (min-width:64.0625em){html{font-size:17px}}.controls__label .controls__icon{height:38px;left:5px;margin-top:10%;padding:2px;pointer-events:none;-webkit-transform:scale(1.1,1.1)translate3d(0,0,0);transform:scale(1.1,1.1)translate3d(0,0,0);transition:-webkit-transform 600ms ease;transition:transform 600ms ease;visibility:visible;width:38px}.controls__menu-item{height:50px;transition-duration:280ms;visibility:hidden;width:50px}.controls__icon{cursor:pointer;fill:#f9f9f9;height:50px;padding:9px;position:absolute;visibility:hidden;width:50px}#test{z-index:5}.back-disabled{fill:rgba(249,249,249,.5);cursor:not-allowed}.panel{background-color:#edede3}.panel .panel__header{position:fixed}.panel .panel__header .btn{transition:300ms ease-out;opacity:1}.panel .panel__header .btn.ng-hide{opacity:0}.panel__narrative{border-top:dashed gray 1px;margin-top:1rem}.panel__narrative:after{content:"";display:block;height:1rem}.panel__narrative h3+p{margin-top:.4rem}.panel__toggles{background-color:#7caad4;box-shadow:0 -2px 15px 0;display:box;display:-webkit-flex;display:-ms-flexbox;display:flex;bottom:0;left:0;right:1px;position:absolute;height:3.5rem}.panel__toggle{background-color:#7caad4;border-left:solid #5591c8 1px;color:#f9f9f9;text-align:center;text-shadow:1px 1px 5px #222;width:25%;font-size:1.3rem;padding:.6rem 0}.panel__toggle:first-of-type{border-left:0}.panel__toggle__label{display:none}.panel__toggle__icon{height:33.6px;height:2.1rem;width:33.6px;width:2.1rem;display:inline-block;fill:#f9f9f9;margin-right:5px;vertical-align:middle}@media (min-width:46.25em){.panel .panel__header{position:absolute}.panel__toggle{padding:.3rem 0}.panel__toggle__label{display:inline-block;vertical-align:middle}.panel__toggle__icon{padding:.25rem 0;height:44.8px;height:2.8rem;width:44.8px;width:2.8rem;fill:#2d5e8a}}.poi-page--home{opacity:1}.poi-page--poi{opacity:1}.poi-page--poi.ng-hide{opacity:0}.poi-subgroup+.poi-subgroup:before{content:"";display:block;height:.1rem}.poi-subgroup-list{margin-bottom:0;padding-left:.75rem;margin-top:.25rem}.poi-subgroup-list .poi-type__icon{margin-right:10px}.poi-subgroup-link{color:#4d4d4d;display:block;font-size:1.2rem;transition:all 300ms ease}.poi-subgroup__name{display:block;font-size:1rem;line-height:1;text-decoration:underline}@media (min-width:46.25em){.poi-subgroup+.poi-subgroup:before{height:.4rem}.poi-subgroup-list{margin-bottom:.5rem}.poi-subgroup__name{font-size:1.1rem}}.poi-subgroup__preview{color:grey;display:block;font-size:.8rem;line-height:1.5;text-decoration:none;overflow:hidden}.poi-type-list{-webkit-flex-flow:column;-ms-flex-flow:column;flex-flow:column;-webkit-justify-content:stretch;-ms-flex-pack:stretch;justify-content:stretch;margin:0;padding:0}.poi-type{-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-bottom:.4rem}.poi-type__label{background-color:green;-webkit-flex:0 100%;-ms-flex:0 100%;flex:0 100%;font-size:1.2rem;line-height:.8;padding:.3em .4em .2em}.poi-type__icon{border-width:2px;border-style:solid;border-radius:25px;display:inline;fill:#f9f9f9;float:left;height:2rem;margin-right:7px;padding:.2rem;width:2rem}@media (min-width:46.25em){.poi-type__icon{height:2.4rem;width:2.4rem}}.poi-type__icon--feat{background-color:#a7588e;border-color:#542c47}.poi-type__icon--comm{background-color:#f7892e;border-color:#9f4c06}.poi-type__desc{color:#9a9a9a;-webkit-flex:0 35%;-ms-flex:0 35%;flex:0 35%;font-size:.6em;line-height:.9;text-shadow:none}.panel--trail svg{display:inline;fill:#526b87;height:1.8rem;width:1.8rem}.panel--trail__label{-webkit-flex:0 48%;-ms-flex:0 48%;flex:0 48%;font-size:1.05rem;padding:.3rem 4px}.panel--trail__label.trail-cond{-ms-flex-item-align:center;-webkit-align-self:center;align-self:center;-webkit-flex:0 70%;-ms-flex:0 70%;flex:0 70%}.panel--trail__label svg{margin-right:5px}.panel--trail__label-cont{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.panel--trail__label-cont~h3{margin-top:.9rem}.panel--trail__label.space-around,.trail__label-cont--cond{-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.legend-line{-webkit-flex:0 30%;-ms-flex:0 30%;flex:0 30%;background-color:#f9f9f9;border-color:#4d4d4d;border-style:dashed;border-width:4px 0 0;height:4px;margin-left:5px;position:relative}.legend-line span{display:block;height:4px;opacity:.65;position:relative;top:-4px;width:100%}.line-overlay--sbht_grade{background-color:red}.line-overlay--sbht_caution{background-color:#ff0}svg.toggle__icon--trail-cond{background-color:#f9f9f9;border-radius:5px;border:1px solid #1b8ba1;fill:#43c5df;height:1.8rem;padding:.2rem;width:1.8rem}.label--seasons{border-radius:10px}.seasons-container{display:box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-flow:row wrap;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin:.85rem 0}.label--seasons{-webkit-flex-flow:column;-ms-flex-flow:column;flex-flow:column;-webkit-flex:0 28%;-ms-flex:0 28%;flex:0 28%;padding:.25rem .5rem}.label--seasons svg{transition:fill 300ms ease;height:3.7rem;width:3.7rem}.panel input:checked+.label--seasons{-webkit-flex:1 100%;-ms-flex:1 100%;flex:1 100%;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:.7rem;-webkit-order:4;-ms-flex-order:4;order:4;font-size:2rem;background-color:#c4d4db}.panel input:checked+.label--seasons svg{height:4rem;width:4rem;margin-right:.5rem}.panel input:checked+.label--seasons .summer{fill:#F9F766}.info-page--home{opacity:1}.info-page--topic{opacity:1}.info-page--topic.ng-hide{opacity:0}.info-page--topic p{white-space:pre-wrap}.logos{-webkit-align-items:center;-ms-flex-align:center;align-items:center;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;margin:.4rem 0 -.2rem;padding:0}.logos>li{-webkit-flex:0 22%;-ms-flex:0 22%;flex:0 22%}.credits{color:grey;display:block;font-size:.9rem;margin-top:.25rem;margin-bottom:.75rem}.info-topics-list li:last-of-type:after{content:"";display:block;height:1rem}.info-topics-link{font-size:1.1rem}.popup__header--inner{width:calc(100% - 5.1rem);display:block;float:left;margin:0 auto;white-space:nowrap;text-overflow:ellipsis}
        </style>

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
        <!-- <div id="fb-root"></div> -->
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

        <div id="map-wrapper" class="map-wrapper">
          <interactive-map></interactive-map>
          <panels></panels>
          <map-controls></map-controls>
          <div ui-view></div>
        </div>

        <span class="never-show">
          <?php include('src/assets/img/svg/project/defs/fosb-svg-defs.svg'); ?>
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
        <script type="text/javascript" src="//cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.12/cartodb.js"></script>
      <!-- <script type="text/javascript" src="src/assets/js/vendor/cartodb.uncompressed.js"></script> -->

        <script type="text/javascript">
            function loadCSS(a,b,c,d){"use strict";var e=window.document.createElement("link"),f=b||window.document.getElementsByTagName("script")[0],g=window.document.styleSheets;return e.rel="stylesheet",e.href=a,e.media="only x",d&&(e.onload=d),f.parentNode.insertBefore(e,f),e.onloadcssdefined=function(b){for(var c,d=0;d<g.length;d++)g[d].href&&g[d].href.indexOf(a)>-1&&(c=!0);c?b():setTimeout(function(){e.onloadcssdefined(b)})},e.onloadcssdefined(function(){e.media=c||"all"}),e};
            loadCSS("src/assets/css/map-style.css");
        </script>

        <noscript><link rel="stylesheet" href="src/assets/css/map-style.css"></noscript>

        <!-- build:js src/app/map-app.js -->
        <script type="text/javascript" src="./src/assets/js/vendor/angular.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/ngDialog.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/angular-animate.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/angular-ui-router.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/svg4everybody.ie8.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/esri-leaflet-basemaps.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/leaflet-history-src.js"></script>
        <script type="text/javascript" src="./src/assets/js/vendor/leaflet-gps.js"></script>
        <script type="text/javascript" src="./src/app/map-app.js"></script>
        <!-- endbuild -->
    </body>
</html>