module.exports = {

    options: {
        sourceMap: true,
        includePaths: [
          'bower_components/foundation/scss'//,
          // 'bower_components/compass-mixins/lib'
        ]
    },
    src: {
        files: {
            'css/app.css': 'scss/app.scss'
        }
    }

}