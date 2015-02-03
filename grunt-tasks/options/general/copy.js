module.exports = {

    scripts: {
        expand: true,
        cwd: 'bower_components/',
        src: '**/*.js',
        dest: 'js'
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