module.exports = {

    options: {
      // separator: ';'
    },
    angularDev: {
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
      dest: 'build/js/map-script.js'
    },
    angularProd: {
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
      dest: 'build/js/map-script.js'
    },
    vendorDev: {
      src: [
        'src/assets/js/vendor/bower_components/cartodb.js/dist/_cartodb_nojquery.js',
        'src/assets/js/vendor/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        'src/assets/js/vendor/bower_components/carto/dist/carto.js',
        'src/assets/js/vendor/bower_components/cartodb.js/dist/cartodb.mod.torque.uncompressed.js'
      ],
      dest: 'src/assets/js/vendor/map-vendors.js'
    }

}