module.exports = {

    options: {
      // separator: ';'
    },
    ngDev: {
      src: [
        'app/js/src/_map-config.js',
        'app/js/services/*.js',
        'app/js/constants/*.js',
        'app/js/values/*.js',
        // 'app/js/routes/*.js',
        'app/js/controllers/*.js',
        'app/js/directives/*.js'
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
        'src/assets/js/vendor/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        // Picturefill
        'src/assets/js/vendor/bower_components/picturefill/dist/picturefill.js',
        // Lightbox
        'src/assets/js/vendor/bower_components/lightbox2/js/lightbox.js'

      ],
      dest: 'src/assets/js/vendor/map-vendors.js'
    }

}