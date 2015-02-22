module.exports = {

    dev: {
        options: {
            sourceMap: true,
            omitSourceMapUrl: false,
            includePaths: [
              // 'bower_components/foundation/scss'//,
              // 'bower_components/compass-mixins/lib'
            ]
        },
        files: {
            'src/assets/css/map-style.css': 'src/assets/scss/map-style.scss'
        }
    },
    // kiosk: {
    //     files: {
    //         'src/assets/css/map-style-kiosk.css': 'src/assets/scss/base/map-style-kiosk.scss'
    //     }
    // }

};