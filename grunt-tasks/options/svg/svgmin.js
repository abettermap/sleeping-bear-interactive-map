module.exports = {

    options: {
        plugins: [
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false }
        ]
    },
    icons: {
        files: [{
            expand: true,
            cwd: 'assets/img/svg/src/icons/',
            src: [
                '*.svg'
            ],
            dest: '/Users/travelampel/Google_Drive/web-projects/abm-website/web/wordpress/wp-content/uploads/svg/min/'
        }]
    }

}