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
            cwd: 'src/assets/img/svg/project/src/',
            src: [
                '*.svg'
            ],
            dest: 'src/assets/img/svg/project/min/'
        }]
    }

}