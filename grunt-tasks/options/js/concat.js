module.exports = {

    ng: {
        options: {
            sourceMap: true,
            sourceMapStyle: 'link',
        },
        src: [
            'src/app/config/app-config.js', // should work as long as app-config comes first
            'src/app/map/*.js',
            '!src/app/map/betaDisclaimerCtrl.js',
            'src/app/layers/*.js',
            'src/app/popups/*js',
            '!src/app/popups/dynamicMetaCtrl.js',
            'src/app/ctrls/*.js',
            'src/app/panels/*.js',
            'src/assets/js/vendor/dirPagination.js',
        ],
        dest: 'src/app/map-app.js'
    },

}