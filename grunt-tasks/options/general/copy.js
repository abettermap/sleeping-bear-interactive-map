module.exports = {

    plugin: {
        expand: true,
        // flatten: true,
        // src: 'wp-fosb-map.php',
        src: 'index.php',
        dest: 'build'
        // filter: 'isFile'
    },
    getImages: {
        expand: true,
        // flatten: true,
        src: 'get-images.php',
        dest: 'build'
        // filter: 'isFile'
    },
    // license: {
    //     expand: true,
    //     // flatten: true,
    //     src: 'license.txt',
    //     dest: 'build'
    //     // filter: 'isFile'
    // },
    html: {
        expand: true,
        cwd: 'src/',
        // flatten: true,
        // src: 'src/app/config/map.html',
        filter: 'isFile',
        src: ['app/**/*.html'],
        dest: 'build/src'
    },
    // template: {
    //     // expand: true,
    //     // flatten: true,
    //     src: 'src/app/popups/templates/mapPopup.html',
    //     dest: 'build/src/app/popups/templates/mapPopup.html'
    // },
    mss: {
        cwd: 'src/',
        filter: 'isFile',
        flatten: true,
        src: ['assets/spatial/carto-css/*.mss'],
        expand: true,
        dest: 'build/src/assets/spatial/carto-css/'
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
    }//,
    // fastclick: {
    //     src: 'src/assets/js/vendor/fastclick.js',
    //     dest: 'build/src/assets/js/vendor/fastclick.js'
    // }
    // svgToPhp: {
    //   files: [
    //       {
    //           expand: true,
    //           cwd: 'assets/img/services/build/',
    //           src: ['**/*.svg'],
    //           dest: 'assets/img/services/build/',
    //           rename: function(dest, src) {
    //               return dest + 'inline-' + src.substring(0, src.indexOf('/')) + src + '.php';
    //           }
    //       },{
    //           expand: true,
    //           cwd: 'assets/img/about/build/',
    //           src: ['**/*.svg'],
    //           dest: 'assets/img/about/build/',
    //           rename: function(dest, src) {
    //               return dest + 'inline-' + src.substring(0, src.indexOf('/')) + src + '.php';
    //           }
    //       }
    //   ]
    // }

}