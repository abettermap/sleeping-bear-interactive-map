module.exports = {

  default_options: {
    bsFiles: {
      src: [
        'src/assets/css/*.css',
        'src/assets/spatial/**/*.mss',
        '*.php',
        'src/app/**/*.js',
        'src/app/**/*.html'
        // "assets/img/services/*.svg"
      ]
    },
    options: {
      watchTask: true,
      proxy: 'wpmulti.dev', // might need full path to map??
      notify: false,
      open: true,
      ghostMode: false,
      startPath: '/sbht-i-map'
    }
  }

}