# Grunt Language Validation

## Installation

    npm install grunt-language-task
    
... or Clone this repository

    git clone git@github.com:henriquebf/grunt-language-task.git
    
## Settings

You must input the language locales that are required to be checked and the source path where the files are localed.

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
      }
    }
    
## Executing

It will output the missing fields for each language and stop the grunt flow.

    grunt language_task
    
## Tests

    grunt test