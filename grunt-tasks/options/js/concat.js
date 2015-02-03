module.exports = {

    options: {
      separator: ';'
    },
    dist: {
      src: [
        // Foundation core
        'bower_components/foundation/js/foundation/foundation.js',

        // Pick the componenets you need in your project
        'bower_components/foundation/js/foundation/foundation.accordion.js',
        'bower_components/foundation/js/foundation/foundation.clearing.js',
        'bower_components/foundation/js/foundation/foundation.dropdown.js',
        'bower_components/foundation/js/foundation/foundation.offcanvas.js',
        'bower_components/foundation/js/foundation/foundation.reveal.js',
        'bower_components/foundation/js/foundation/foundation.topbar.js',
        // 'js/foundation/js/foundation.min.js',
        'js/custom/init-foundation.js',
        'js/fastclick/lib/fastclick.js',
        'js/picturefill/dist/picturefill.min.js', // For polyfill/srcset
        'js/custom/smoothscroll.js' // Coyer's method
      ],
      dest: 'js/app.js'
    }

}