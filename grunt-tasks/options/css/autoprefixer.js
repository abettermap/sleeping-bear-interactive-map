module.exports = {

    build: {
      options: {
        browsers: ['last 2 versions'],
      },
      files: [
        {
          cwd: 'build/src/assets/css/',
          src: ['*.css'],
          dest: 'build/src/assets/css/',
          filter: 'isFile',
          expand: true,
          flatten: true,
      }],
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

};