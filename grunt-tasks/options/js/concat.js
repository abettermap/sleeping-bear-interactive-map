module.exports = {

    options: {
      // separator: ';'
    },
    kioskStyle: {
        src: [
            'src/assets/css/map-style.css',
            'src/assets/css/map-style-kiosk.css'
        ],
        dest: 'build/src/assets/css/map-style-kiosk.css'
    },
    kioskScript: {
        src: [
            'src/app/map-app.js',
            'src/app/kiosk/map-kiosk.js'
        ],
        dest: 'build/src/app/map-app-kiosk.js'
    },
    ng: {
      src: [
        'src/app/config/map-app-config.js',
        'src/app/config/mapValues.js',
        'src/app/config/mapFactory.js',
        'src/app/config/mapCtrl.js',
        // 'src/app/config/mapService.js'
        // 'app/js/services/*.js',
        // 'app/js/constants/*.js',
        // 'app/js/values/*.js',
        // 'app/js/routes/*.js',
        // 'app/js/controllers/*.js',
        // 'app/js/directives/*.js'
        // 'app/js/src/_map-styles.js',
        // 'app/js/src/_map-layers.js',
      ],
      dest: 'src/app/map-app.js'
    },
    vendor: {
      src: [
        // CartoDB, no jQuery, unminified
        'src/assets/js/vendor/bower_components/cartodb.js/dist/_cartodb_nojquery.js',
        // Leaflet directive, unminified
        // 'src/assets/js/vendor/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        // Picturefill
        'src/assets/js/vendor/bower_components/picturefill/dist/picturefill.js',
        // Bindonce
        // 'src/assets/js/vendor/bower_components/bindonce/bindonce.js',
        // Lightbox
        'src/assets/js/vendor/bower_components/lightbox2/js/lightbox.js'

      ],
      dest: 'src/assets/js/vendor/map-vendors.js'
    }

}