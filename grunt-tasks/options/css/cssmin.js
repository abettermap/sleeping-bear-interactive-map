module.exports = {

    build: {
      options: {
        report: 'min'
      },
      files: {
        'build/src/assets/css/map-style.css': ['src/assets/css/tidy.css']
      }
    },
    kiosk: {
      options: {
        report: 'min'
      },
      files: {
        'build/src/assets/css/map-style-kiosk.css': ['build/src/assets/css/map-style-kiosk.css']
      }
    }

}