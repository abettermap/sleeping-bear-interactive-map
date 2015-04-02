module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    // Utility to load the different option files based on name
    function loadConfig(path) {
      var glob = require('glob');
      var object = {};
      var key;

      glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
      });

      return object;
    }

    // Initial config
    var config = {};

    // Load all the tasks options in tasks/options base on the name:
    // Include subfolders to satisfy OCD
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/css/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/general/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/js/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/raster/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/sass/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/svg/'));

    // Initialize
    grunt.initConfig(config);
    grunt.loadTasks('grunt-tasks');

    /// REGISTER TASKS \\\

    // DESIGN \\
    grunt.registerTask('design', ['browserSync', 'watch']);
    grunt.registerTask('build-css', ['sass', 'uncss', 'cssmin']);

    // DEVELOP \\
    grunt.registerTask('build-scripts', ['concat:ng']);
    grunt.registerTask('copy-html', ['copy:html']);
    grunt.registerTask('copy-svg', ['copy:svg']);
    // grunt.registerTask('concat-vendor-dev', ['newer:concat:vendorDev']);

    // RASTER \\
    grunt.registerTask('image-opt', ['responsive_images', 'imageoptim']);
    grunt.registerTask('image-deep', ['image']);
    grunt.registerTask('yahoo', ['smushit']);
    grunt.registerTask('ug', ['newer:uglify']);

    // VECTOR \\
    grunt.registerTask('combine-svg', ['svgmin', 'svgstore']); // Change subtask as needed

    // BUILD
    grunt.registerTask('build', [
        'newer:svgmin',
        'newer:svgstore',
        'newer:copy',
        // HTML MINIFY
        // 'concat:kioskScript',
        'uglify',
        // 'concat:kioskStyle',
        'cssmin',
        'autoprefixer:build'
    ]);

    // DEFAULT ()
    grunt.registerTask('default', [
        'newer:concat:vendorScripts',
        'browserSync',
        'watch'
    ]);

};