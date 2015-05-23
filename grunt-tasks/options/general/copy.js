module.exports = {

    index: {
        files: [
            {expand: true, src: ['*.php'], dest: 'build/', filter: 'isFile'},
        ]
    },
    kiosk: {
        files: [
            {
                cwd: 'build/',
                src: ['index.php'],
                expand: true,
                dest: 'build/',
                rename: function(dest, src) {
                  return dest + src.replace(/^index/, "kiosk");
                }
            }
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
    rasterLogos: {
        cwd: 'src/assets/img/raster/logos/',
        filter: 'isFile',
        flatten: true,
        src: ['*.png', '*.jpg'],
        expand: true,
        dest: 'build/src/assets/img/raster/logos/'
    },
    abmLogo: {
        cwd: 'src/assets/img/svg/project/',
        filter: 'isFile',
        flatten: true,
        src: ['abm-logo.svg',],
        expand: true,
        dest: 'build/src/assets/img/svg/project/'
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