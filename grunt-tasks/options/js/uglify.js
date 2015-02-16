module.exports = {

    options: {
      report: 'min'
    },
    vendor: {
      files: {
        'build/src/assets/js/vendor/map-vendors.js': ['src/assets/js/vendor/map-vendors.js']
      }
    },
    app: {
      files: {
        'build/src/app/map-app.js': ['src/app/map-app.js']
      }
    }//,
    // kiosk: {
    //   files: {
    //     'build/src/app/map-app-kiosk.js': ['build/src/app/map-app-kiosk.js']
    //   }
    // }

}