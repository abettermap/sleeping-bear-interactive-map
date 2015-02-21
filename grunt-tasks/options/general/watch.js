module.exports = {

    options: {
        spawn: false
    },
    sass: {
        files: 'src/assets/scss/**/*.scss',
        tasks: ['sass', 'autoprefixer:dev']
    },
    scripts: {
        files: 'src/app/**/*.js',
        tasks: ['concat:ng']
    }

}