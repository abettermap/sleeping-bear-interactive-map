module.exports = {

    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      },
      files: [{
          expand: true,
          cwd: 'src/app',
          src: '**/*.html',
          dest: 'build/src/app'
      }]
    },

};