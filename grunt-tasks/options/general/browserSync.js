module.exports = {

  default_options: {
    bsFiles: {
      src: [
        // 'src/assets/scss/**/*.scss',
        'src/assets/css/map-style.css',
        'src/assets/spatial/**/*.mss',
        '*.php',
        'src/app/map-app.js',
        'src/app/**/*.html'
        // "assets/img/services/*.svg"
      ]
    },
    options: {
      watchTask: true,
      proxy: 'sbht.dev', // might need full path to map??
      notify: true,
      ui: false,
      open: true,
      ghostMode: false,
      startPath: '/sbht-i-map'
    }
  }

}