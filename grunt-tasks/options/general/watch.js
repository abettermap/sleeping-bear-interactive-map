module.exports = {

    options: {
        spawn: false,
        // livereload: true
    },
    html: {
        files: 'src/app/**/*.html'
    },
    sass: {
        files: ['src/assets/scss/**/*.scss','!src/assets/scss/vendor/**/*.scss' ],
        tasks: ['sass', 'autoprefixer:dev']
    },
    scripts: {
        files: 'src/app/**/*.js',
        tasks: ['concat:ng']
    }

}