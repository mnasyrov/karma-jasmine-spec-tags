module.exports = function (config) {
    config.set({
        plugins: ['karma-jasmine', 'karma-jsdom-launcher', require('./index')],
        frameworks: ['jasmine', 'jasmine-spec-tags'],
        browsers: ['jsdom'],
        files: [
            'test-karma/*.js'
        ]
    });
};
