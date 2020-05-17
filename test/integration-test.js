const nixt = require('nixt');

describe('Karma integration test', function () {
    it('Karma output must not contain deprecation messages', function (done) {
        nixt({colors: false})
            .run('karma start --single-run')
            .expect(result => {
                expect(result.code).toBe(0);
                expect(result.stdout).not.toContain('DEPRECATION:');
            })
            .end(done);
    });

    it('Karma should run tagged tests', function (done) {
        nixt({colors: false})
            .run('karma start --single-run --tags smoke')
            .expect(result => {
                expect(result.code).toBe(0);

                const lines = parseKarmaLogOutput(result.stdout);
                expect(lines.length).toBe(2);
                expect(lines).toContain("LOG: '#smoke test'");
                expect(lines).toContain("LOG: '#fast #smoke test of #bench suite'");
            })
            .end(done);
    });

    it('Karma should run without tagged tests', function (done) {
        nixt({colors: false})
            .run('karma start --single-run --skip-tags slow,bench')
            .expect(result => {
                expect(result.code).toBe(0);

                const lines = parseKarmaLogOutput(result.stdout);
                expect(lines.length).toBe(3);
                expect(lines).toContain("LOG: '#smoke test'");
                expect(lines).toContain("LOG: 'test scope:critical'");
                expect(lines).toContain("LOG: 'test scope:minor'");
            })
            .end(done);
    });

    it('Karma should run tagged test suite without excluded tests', function (done) {
        nixt({colors: false})
            .run('karma start --single-run --tags bench --skip-tags slow')
            .expect(result => {
                expect(result.code).toBe(0);

                const lines = parseKarmaLogOutput(result.stdout);
                expect(lines.length).toBe(1);
                expect(lines).toContain("LOG: '#fast #smoke test of #bench suite'");
            })
            .end(done);
    });

    it('Karma should pick tests using a custom tag prefix', function (done) {
        nixt({colors: false})
            .run("karma start --single-run --tag-prefix 'scope:' --tags critical")
            .expect(result => {
                expect(result.code).toBe(0);

                const lines = parseKarmaLogOutput(result.stdout);
                expect(lines.length).toBe(1);
                expect(lines).toContain("LOG: 'test scope:critical'");
            })
            .end(done);
    });
});

function parseKarmaLogOutput(output) {
    console.log('KARMA OUTPUT', output);

    return output.match(/LOG: .+$/gm);
}
