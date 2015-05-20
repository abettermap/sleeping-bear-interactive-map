module.exports = {

    php: {
        files: [
            {expand: true, src: ['*.php'], dest: 'build/', filter: 'isFile'},
        ]
    },
    fastClick: {
        expand: true,
        src: 'src/assets/js/vendor/fastclick.js',
        dest: 'build'
    },
    mss: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/spatial/carto-css/*.mss'],
        expand: true,
        dest: 'build/src/assets/spatial/carto-css/'
    },
    logos: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/img/raster/logos/*.png',
        'assets/img/raster/logos/*.svg',
        'assets/img/raster/logos/*.jpg'],
        expand: true,
        dest: 'build/src/assets/img/raster/logos/'
    },
    help: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/img/raster/help-pics/*.jpg'],
        expand: true,
        dest: 'build/src/assets/img/raster/help-pics/'
    },
    svgDefs: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/img/svg/project/defs/*.svg'],
        expand: true,
        dest: 'build/src/assets/img/svg/project/defs/'
    },
    svgMin: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/img/svg/project/min/*.svg'],
        expand: true,
        dest: 'build/src/assets/img/svg/project/min/'
    }

}