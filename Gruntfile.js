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
    grunt.registerTask('build-scripts', ['concat', 'uglify']);

    // RASTER \\
    grunt.registerTask('image-opt', ['responsive_images', 'imageoptim' ]);;
    grunt.registerTask('image-deep', ['image' ]);;
    grunt.registerTask('yahoo', ['smushit']);

    // VECTOR \\
    grunt.registerTask('combine-svg', ['svgmin', 'svgstore']); // Change subtask as needed
    grunt.registerTask('test', ['copy:svgToPhp']);

}