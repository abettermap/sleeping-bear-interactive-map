module.exports = {

    dev: {
        options: {
            outputStyle: 'nested',
            outFile: 'src/assets/css/map-style.css',
            sourceMap: true, // or an absolute or relative (to outFile) path
            omitSourceMapUrl: true,
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