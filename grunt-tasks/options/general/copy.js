module.exports = {

    plugin: {
        expand: true,
        src: 'index.php',
        dest: 'build'
    },
    getImages: {
        expand: true,
        src: 'get-images.php',
        dest: 'build'
    },
    fastClick: {
        expand: true,
        src: 'src/assets/js/vendor/fastclick.js',
        dest: 'build'
    },
    // html: {
    //     expand: true,
    //     cwd: 'src/',
    //     // flatten: true,
    //     // src: 'src/app/config/map.html',
    //     filter: 'isFile',
    //     src: ['app/**/*.html'],
    //     dest: 'build/src'
    // },
    mss: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/spatial/carto-css/*.mss'],
        expand: true,
        dest: 'build/src/assets/spatial/carto-css/'
    },
    // logos: {
    //     cwd: 'src/',
    //     filter: 'isFile',
    //     flatten: true,
    //     src: ['assets/img/raster/*.png'],
    //     expand: true,
    //     dest: 'assets/img/raster/'
    // },
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