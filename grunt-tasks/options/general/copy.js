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
    staticPage: {
        expand: true,
        src: 'static-page.php',
        dest: 'build'
    },
    htaccess: {
        expand: true,
        src: '.htaccess',
        dest: 'build'
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
    appleIcons: {
        cwd: 'src/assets/img/raster/apple-icons/',
        filter: 'isFile',
        flatten: true,
        src: ['*.png'],
        expand: true,
        dest: 'build/src/assets/img/raster/apple-icons/'
    },
    rasterLogos: {
        cwd: 'src/assets/img/raster/logos/',
        filter: 'isFile',
        flatten: true,
        src: ['*.png', '*.jpg'],
        expand: true,
        dest: 'build/src/assets/img/raster/logos/'
    },
    sandyBackground: {
        cwd: 'src/assets/img/raster/',
        filter: 'isFile',
        flatten: true,
        src: ['*.jpg'],
        expand: true,
        dest: 'build/src/assets/img/raster/'
    },
    miscSvg: {
        cwd: 'src/assets/img/svg/project/',
        filter: 'isFile',
        flatten: true,
        src: ['*.svg',],
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
    },
    softwareCredits: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/img/svg/project/credits/*.svg'],
        expand: true,
        dest: 'build/src/assets/img/svg/project/credits/'
    },
    iconmonstr: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/img/raster/credits/*.jpg'],
        expand: true,
        dest: 'build/src/assets/img/raster/credits/'
    }
};