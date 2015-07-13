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
      ghostMode: false,
      // host: '192.168.56.1',
      // host: '10.1.248.111',
      notify: true,
      open: true,
      proxy: 'sbht.dev',
      startPath: '/sbht-i-map',
      ui: false,
      watchTask: true,
    }
  }

};