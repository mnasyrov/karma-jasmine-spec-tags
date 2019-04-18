# karma-jasmine-spec-tags

[![npm version](https://badge.fury.io/js/karma-jasmine-spec-tags.svg)](https://www.npmjs.com/karma-jasmine-spec-tags)
[![build Status](https://travis-ci.org/mnasyrov/karma-jasmine-spec-tags.svg?branch=master)](https://travis-ci.org/mnasyrov/karma-jasmine-spec-tags)


A plugin for `karma-jasmine` which helps to filter tests (specs) by tags. 

Usage example:

    $ karma start --tags smoke
    $ karma start --skip-tags slow,bench
    $ karma start --tags bench --skip-tags slow
    $ karma start --tag-prefix 'scope:' --tags critical
    
Where tags are defined in spec names:

    describe('Example test', () => {
        it('should be a #smoke test', () => {
            // ...
        });
        
        it('#slow test', () => {
            // ...
        });
    })
        
    describe('Performance test suite #bench', () => {
        it('#fast #smoke test', () => {
            // ...
        });
        
        it('#slow test', () => {
            // ...
        });
    })
    
    describe('Custom tag prefix', () => {
        it('test scope:critical', () => {
            // ...
        });
    })


## Installation

Install the package using `npm`:

    $ npm install karma-jasmine-spec-tags --save-dev

**Note:** [`karma-jasmine`](https://github.com/karma-runner/karma-jasmine) adapter is required to be installed.


Add `jasmine-spec-tags` to the `frameworks` array in Karma configuration after `jasmine`:

    module.exports = function(config) {
        config.set({
            frameworks: ['jasmine', 'jasmine-spec-tags']
        });
    }
    
    
## Command line options

Following options can be passed to `karma`:

* `--tag-prefix <prefix>` - defines a prefix for a tag name. `#` is used by default.
* `--tags [names]` - defines a comma-separated list of tag names. 

  * If `names` is defined then specs which match to tags will be executed.
  * If `names` is not defined then all specs with a tag will be executed.
   
* `--skip-tags [names]` - defines a comma-separated list of tag names. 

  * If `names` is defined then specs which match to tags will be skipped.
  * If `names` is not defined then all specs with a tag will be skipped.


## Configuration

Default values can be configured using `client` map in Karma configuration:

    module.exports = function(config) {
        config.set({
            frameworks: ['jasmine', 'jasmine-spec-tags'],
            
            client: {
                tagPrefix: '@',
                tags: 'smoke',
                skipTags: 'slow'
            }
        });
    }

Where `tagPrefix`, `tags` and `skipTags` fields mean the same as the command line options.

Values of `tags` and `skipTags` fields can be either a comma-separated list of tag names or an array of strings.
Boolean `true` can be passed to them to include/exclude all tagged specs.


## License

[MIT](LICENSE)
