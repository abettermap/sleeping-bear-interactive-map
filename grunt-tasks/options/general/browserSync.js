module.exports = {

  default_options: {
    bsFiles: {
      src: [
        'src/assets/css/*.css',
        '**/*.php',
        'src/app/**/*.js',
        'src/app/**/*.html'
        // "assets/img/services/*.svg"
      ]
    },
    options: {
      watchTask: true,
      proxy: 'wpmulti.dev', // might need full path to map??
      notify: true,
      open: false
    }
  }

}