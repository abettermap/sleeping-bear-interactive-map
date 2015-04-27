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
    },
    logos: {
        files: [{
            expand: true,
            cwd: 'src/assets/img/raster/logos/',
            src: [
                '*.svg'
            ],
            dest: 'src/assets/img/raster/logos/',
        }]
    }

}