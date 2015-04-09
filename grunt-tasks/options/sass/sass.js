module.exports = {

    dist: {
        options: {
            outputStyle: 'nested',
            sourceMap: true,
            // outFile: 'src/assets/css/map-style.css',
            // omitSourceMapUrl: false,
            // file: 'src/assets/scss/map-style.scss',
        },
        files: {
            'src/assets/css/map-style.css': 'src/assets/scss/map-style.scss'
        }

    }

};