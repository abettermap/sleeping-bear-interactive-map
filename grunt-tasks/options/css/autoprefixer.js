module.exports = {

    options: {
      browsers: ['last 2 versions']
    },
    build: {
      src: 'build/src/assets/css/map-style.css',
      dest: 'build/src/assets/css/map-style.css'
    },
    kiosk: {
      src: 'build/src/assets/css/map-style-kiosk.css',
      dest: 'build/src/assets/css/map-style-kiosk.css'
    },
    dev: {
      src: 'src/assets/css/map-style.css',
      dest: 'src/assets/css/map-style.css'
    }

}