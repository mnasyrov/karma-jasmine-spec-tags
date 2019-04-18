describe('Example test', () => {
    it('should be a #smoke test', () => {
        console.log('#smoke test')
    });

    it('#slow test', () => {
        console.log('#slow test')
    });
});

describe('Performance test suite #bench', () => {
    it('#fast #smoke test', () => {
        console.log('#fast #smoke test of #bench suite')
    });

    it('#slow test', () => {
        console.log('#slow test of #bench suite')
    });
});

describe('Custom tag prefix', () => {
    it('test scope:critical', () => {
        console.log('test scope:critical')
    });

    it('test scope:minor', () => {
        console.log('test scope:minor')
    });
});
