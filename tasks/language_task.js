//
// grunt-language-task
// https://github.com/henriquebf/grunt-language-task
//
// by Henrique Ferreira
//

'use strict';

// Tasks Class Constructor

function Tasks () {

  // Default Options
  this.default_options = {
    languages: [
      "de",
      "en"
    ]
  };

  // Bootstrap variables
  this.content = {};
  this.arrayErrors = [];

}

// Validate language Objects

Tasks.prototype.validate = function (arrayLanguages) {

  var self = this;
  var isValid = true;

  // Rotate languages to make sure we will check all keys in all languages
  for (var activeIndex=0; activeIndex<arrayLanguages.length; activeIndex++) {

    arrayLanguages = self.rotateArray(arrayLanguages);

    // Check if language JSON file is present
    for (var i=1; i<arrayLanguages.length; i++) {
      var locale = arrayLanguages[i];
      if (!self.content[locale]) {
        isValid = false;
        self.arrayErrors.push('Missing file ' + locale + '.json.');
      }
    }

    // Iterate First Object (and check if the others also have content)
    for (var key_first in self.content[arrayLanguages[0]]) {
      for (var key_second in self.content[arrayLanguages[0]][key_first]) {      
        for (var j=1; j<arrayLanguages.length; j++) {
          if(self.content[arrayLanguages[j]][key_first][key_second] === undefined) {
            isValid = false;
            self.arrayErrors.push('Missing content for "' + key_first + ' : ' + key_second + '" for locale "' + arrayLanguages[j] + '".');
          }
        }
      }
    }

  }

  // Remove duplicated error messages
  self.arrayErrors = self.removeDuplicatedElements(self.arrayErrors);

  return isValid;

};

// Rotate Language Array [en,de,pt] -> [de,pt,en]

Tasks.prototype.rotateArray = function (arrayLanguages) {
  var newArray = [];
  for (var i=0; i<arrayLanguages.length; i++) {
    if (i>0) {
      newArray[i-1] = arrayLanguages[i];
    } else {
      newArray[arrayLanguages.length-1] = arrayLanguages[i];
    }
  }
  return newArray;
};

// Remove duplicated elements from Array

Tasks.prototype.removeDuplicatedElements = function (arrayLanguages) {
  var newArray = [];
  var tempObject = {};
  for (var i=0; i<arrayLanguages.length; i++) {
    tempObject[arrayLanguages[i]] = arrayLanguages[i];
  }
  for (var key in tempObject) {
    newArray.push(key);
  }
  return newArray;
};

// Get filename without extension from fullpath

Tasks.prototype.getLocaleFromFilepath = function (filepath) {
  return filepath.replace(/^.*[\\\/]/, '').replace('.json', '');
};

// Grunt Task

module.exports = function (grunt) {

  var LanguageTask = new Tasks();

  grunt.registerMultiTask('language_task', 'An amazing Grunt Module to verify language JSON files before deployment', function () {

    // Set default settings if not specified on Gruntfile.js
    var options = this.options(LanguageTask.default_options);

    // Iterate all language JSON files and place in the 'content' Object
    this.files.forEach(function (file) {

      // Read/Parse JSON files
      var src = file.src.map(function (filepath) {
        LanguageTask.content[LanguageTask.getLocaleFromFilepath(filepath)] = grunt.file.readJSON(filepath);
        return true;
      });

      // Feedback the user with success message or error list
      if(LanguageTask.validate(options.languages)) {
        grunt.log.writeln('Language Task Complete!');
      } else {
        LanguageTask.arrayErrors.forEach(function (message) {
          grunt.log.warn(message);
        });
        grunt.fail.warn("Validation Failed!");
      }

    });

  });

};
