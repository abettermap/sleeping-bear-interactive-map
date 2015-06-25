module.exports = {

    ng: {
        options: {
            sourceMap: true,
            sourceMapStyle: 'link',
        },
        src: [
            'src/app/config/app-config.js',
            'src/app/map/*.js',
            'src/app/layers/*.js',
            'src/app/popups/*js',
            'src/app/ctrls/*.js',
            'src/app/panels/*.js',
            'src/assets/js/vendor/dirPagination.js',
        ],
        dest: 'src/app/map-app.js'
    },

};