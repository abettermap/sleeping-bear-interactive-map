module.exports = {

  default_options: {
    bsFiles: {
      src: [
        'src/assets/css/map-style.css',
        'src/assets/spatial/**/*.mss',
        '*.php',
        'src/app/map-app.js',
        'src/app/**/*.html'
      ]
    },
    options: {
      watchTask: true,
      proxy: 'sbht.dev',
      notify: true,
      ui: false,
      open: true,
      ghostMode: false,
      startPath: '/sbht-i-map'
    }
  }

};