module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt,{
        useminPrepare: 'grunt-usemin',
        buildcontrol: 'grunt-build-control',
    });

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
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/html/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/js/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/raster/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/sass/'));
    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/svg/'));

    // Initialize
    grunt.initConfig(config);
    grunt.loadTasks('grunt-tasks');

    /// REGISTER TASKS \\\

    // VECTOR \\
    grunt.registerTask('combine-svg', ['newer:svgmin', 'newer:svgstore']); // Change subtask as needed

    // BUILD
    grunt.registerTask('build', [
        'clean:css',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'cssmin:generated',
        'filerev',
        'newer:copy',
        'newer:svgmin',
        'newer:svgstore',
        'usemin',
        'autoprefixer:build',
        // 'cssmin',
        'htmlmin',
        // 'shell',
    ]);

    // DEFAULT ()
    grunt.registerTask('default', [
        'browserSync',
        'watch'
    ]);

};