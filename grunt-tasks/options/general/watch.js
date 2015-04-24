module.exports = {

    options: {
        spawn: false,
        debounceDelay: 1000,
        // livereload: true
    },
    // html: {
    //     files: 'src/app/**/*.html'
    // },
    sass: {
        files: ['src/assets/scss/**/*.scss',
                '!src/assets/scss/vendor/**/*.scss',
                'src/assets/scss/vendor/_ngDialog.scss',
                'src/assets/scss/vendor/_vendors.scss',
                'src/assets/scss/vendor/_leaflet-gps.scss'
                ],
        tasks: ['sass', 'autoprefixer:dev']
    },
    scripts: {
        options: {
            // debounceDelay: 1000
        },
        // files: 'src/app/**/*.js',
        files: [
            'src/app/config/app-config.js', // should work as long as app-config comes first
            'src/app/map/*.js',
            'src/app/layers/*.js',
            'src/app/popups/*js',
            'src/app/ctrls/*.js',
            'src/app/panels/*.js',
        ],
        tasks: ['concat:ng']
    }

};
