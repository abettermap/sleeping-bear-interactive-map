module.exports = {

  default_options: {
    bsFiles: {
      src: [
        "css/*.css",
        "**/*.php",
        // "assets/pages/*.php",
        // "parts/*.php",
        "assets/img/services/*.svg"
      ]
    },
    options: {
      watchTask: true,
      proxy: 'abettermap.dev',
      notify: true,
      open: false
    }
  }

}