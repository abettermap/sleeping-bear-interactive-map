module.exports = {

    options: {
      report: 'min'
    },
    vendor: {
      files: {
        'build/assets/js/vendor/map-vendors.js': ['src/assets/js/vendor/map-vendors.js']
      }
    },
    app: {
      files: {
        'build/app/map-app.js': ['src/app/map-app.js']
      }
    }

}