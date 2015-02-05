module.exports = {

    plugin: {
        expand: true,
        // flatten: true,
        src: 'wp-fosb-map.php',
        dest: 'build'
        // filter: 'isFile'
    },
    license: {
        expand: true,
        // flatten: true,
        src: 'license.txt',
        dest: 'build'
        // filter: 'isFile'
    },
    svgToPhp: {
      files: [
          {
              expand: true,
              cwd: 'assets/img/services/build/',
              src: ['**/*.svg'],
              dest: 'assets/img/services/build/',
              rename: function(dest, src) {
                  return dest + 'inline-' + src.substring(0, src.indexOf('/')) + src + '.php';
              }
          },{
              expand: true,
              cwd: 'assets/img/about/build/',
              src: ['**/*.svg'],
              dest: 'assets/img/about/build/',
              rename: function(dest, src) {
                  return dest + 'inline-' + src.substring(0, src.indexOf('/')) + src + '.php';
              }
          }
      ]
    }

}