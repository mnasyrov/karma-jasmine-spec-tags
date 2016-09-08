'use strict';

frameworkFactory.$inject = ['config'];

function frameworkFactory(config) {
    var lastKarmaJasmineFileIndex = -1;

    for (var i = 0; i < config.files.length; i++) {
        var file = config.files[i];
        var path = typeof file === 'string' ? file : file.pattern;
        if (path.indexOf('karma-jasmine') >= 0) {
            lastKarmaJasmineFileIndex = i;
        } else if (lastKarmaJasmineFileIndex >= 0) {
            break;
        }
    }

    if (lastKarmaJasmineFileIndex >= 0) {
        var clientFile = {
            pattern: __dirname + '/client.js',
            included: true,
            served: true,
            watched: false
        };
        config.files.splice(lastKarmaJasmineFileIndex + 1, 0, clientFile);
    }

    if (lastKarmaJasmineFileIndex === -1) {
        throw new Error(
            'Could not locate "karma-jasmine" entry in files. ' +
            'Make sure "karma-jasmine" is configured in "frameworks" section of karma\'s config.'
        );
    }

    // Pass 'tags', 'skipTags' and 'tagPrefix' params to client config.
    config.client = config.client || {};
    if (config.tags) {
        config.client.tags = config.tags;
    }
    if (config.skipTags) {
        config.client.skipTags = config.skipTags;
    }
    if (config.tagPrefix) {
        config.client.tagPrefix = config.tagPrefix;
    }
}

module.exports = frameworkFactory;
