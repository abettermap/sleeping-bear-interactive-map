module.exports = {

    options: {
        spawn: false
    },
    sass: {
        files: 'src/assets/scss/**/*.scss',
        tasks: ['sass']
    },
    scripts: {
        files: 'src/app/**/*.js',
        tasks: ['concat:ng']
    }

}