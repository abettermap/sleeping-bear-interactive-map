module.exports = {

    options: {
      browsers: ['last 2 versions']
    },
    build: {
      src: 'build/src/assets/css/map-style.css',
      dest: 'build/src/assets/css/map-style.css'
    },
    dev: {
      options: {
          map: true
      },
      files: {
        'src/assets/css/map-style.css': 'src/assets/css/map-style.css'
      }
    }

}