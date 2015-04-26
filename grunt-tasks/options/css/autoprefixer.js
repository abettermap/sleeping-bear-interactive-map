module.exports = {

    build: {
      options: {
        browsers: ['last 2 versions'],
      },
      src: 'build/src/assets/css/map-style.css',
      dest: 'build/src/assets/css/map-style.css'
    },
    dev: {
      options: {
        browsers: ['last 2 versions'],
        map: true
      },
      files: {
        'src/assets/css/map-style.css': 'src/assets/css/map-style.css'
      }
    }

}