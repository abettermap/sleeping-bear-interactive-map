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
            cwd: 'src/assets/img/svg/src/icons/',
            src: [
                '*.svg'
            ],
            dest: 'src/assets/img/svg/min/'
        }]
    }

}