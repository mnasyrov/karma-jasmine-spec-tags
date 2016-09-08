'use strict';

(function (window) {
    var DEFAULT_TAG_PREFIX = '#';

    var karma = window.__karma__;
    var jasmineEnv = jasmine.getEnv();

    var tagPrefix = karma.config.tagPrefix || DEFAULT_TAG_PREFIX;
    var tags = parseTags(karma.config.tags);
    var skipTags = parseTags(karma.config.skipTags);

    // skipTags must not contain tags values.
    if (Array.isArray(tags) && Array.isArray(skipTags)) {
        skipTags = skipTags.filter(function (tag) {
            return tags.indexOf(tag) === -1;
        });
    }

    var specFilterFnDelegate = jasmineEnv.specFilter;
    jasmineEnv.specFilter = customSpecFilter;

    function parseTags(tags) {
        tags = tags || [];
        if (tags) {
            if (!Array.isArray(tags)) {
                if (typeof tags === 'string') {
                    tags = tags.split(',')
                } else if (tags === true) {
                    // Enables "any tag" mode.
                    return true;
                } else {
                    tags = [];
                }
            }
            tags = tags.map(function (tag) {
                return tag && tag.trim()
            }).filter(function (tag) {
                return !!tag;
            }).map(function (tag) {
                return tagPrefix + tag;
            })
        }
        return tags;
    }

    function customSpecFilter(spec) {
        var result = true;
        if (specFilterFnDelegate) {
            result = specFilterFnDelegate.apply(this, arguments);
        }
        if (result) {
            var specName = spec.getFullName();
            if (tags === true) {
                if (!hasSomeTags(specName)) {
                    return false;
                }
            } else if (tags.length > 0) {
                if (!matchTags(specName, tags)) {
                    return false;
                }
            }

            if (skipTags === true) {
                if (hasSomeTags(specName)) {
                    return false;
                }
            } else if (matchTags(specName, skipTags)) {
                return false;
            }
        }
        return result;
    }

    function matchTags(name, tags) {
        if (!name) {
            return false;
        }
        for (var i = 0; i < tags.length; i++) {
            if (name.indexOf(tags[i]) >= 0) {
                return true;
            }
        }
        return false;
    }

    function hasSomeTags(name) {
        if (!name) {
            return false;
        }
        return name.indexOf(tagPrefix) >= 0;
    }
}(typeof window !== 'undefined' ? window : global));

