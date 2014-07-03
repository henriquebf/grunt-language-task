# Grunt Language Validation

## Installation

    npm install grunt-language-task
    
... or Clone this repository

    git clone git@github.com:henriquebf/grunt-language-task.git
    
## Settings

    language_task: {
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
    }
    
## Executing

    grunt language_task
    
## Tests

    grunt test