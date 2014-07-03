# Grunt Language Validation

Grunt Task for validating multiple JSON language files. It will throw an exception and display the Object and the following language that's missing content.

## Installation

    git clone git@github.com:henriquebf/grunt-language-task.git
    
or

    npm install grunt-language-task    
    
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

    grunt language_task:default_options
    
## Tests

It will run JSHint and Nodeunit tests

    grunt