//
// grunt-language-task
// https://github.com/henriquebf/grunt-language-task
//
// by Henrique Ferreira
//

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    language_task: {
      default_options: {
        options: {
          languages: [
            "de",
            "en",
            "pt"
          ]
        },
        files: {
          src: ['test/fixtures/*.json']
        }
      },
      test_options: {
        options: {
          languages: [
            "de",
            "en",
            "pt"
          ],
          continue_on_error: true
        },
        files: {
          src: ['test/error/*.json']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'language_task', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
