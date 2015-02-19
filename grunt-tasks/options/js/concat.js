module.exports = {

    options: {
      // separator: ';'
    },
    buildStyles: {
        src: [
            'src/assets/js/vendor/bower_components/cartodb.js/dist/themes/css/cartodb.css',
            'src/assets/css/map-style.css'
        ],
        dest: 'build/src/assets/css/map-style.css'
    },
    // kioskStyle: {
    //     src: [
    //         'src/assets/css/map-style.css',
    //         'src/assets/css/map-style-kiosk.css'
    //     ],
    //     dest: 'build/src/assets/css/map-style-kiosk.css'
    // },
    // kioskScript: {
    //     src: [
    //         'src/app/map-app.js',
    //         'src/app/kiosk/map-kiosk.js'
    //     ],
    //     dest: 'build/src/app/map-app-kiosk.js'
    // },
    ng: {
      src: [
        'src/app/config/app-config.js', // should work as long as app-config comes first
        'src/app/map/*.js',
        'src/app/popups/**/*.js',
        'src/app/ctrls/**/*.js',
        'src/app/panels/**/*.js'
      ],
      dest: 'src/app/map-app.js'
    },
    vendorScripts: {
      src: [
        // CartoDB, no jQuery, unminified
        'src/assets/js/vendor/bower_components/cartodb.js/dist/_cartodb_nojquery.js',
        // Picturefill
        'src/assets/js/vendor/bower_components/picturefill/dist/picturefill.js',
        // Lightbox
        'src/assets/js/vendor/bower_components/lightbox2/js/lightbox.js'
      ],
      dest: 'src/assets/js/vendor/map-vendors.js'
    }

}