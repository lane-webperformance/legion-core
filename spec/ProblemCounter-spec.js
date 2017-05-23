'use strict';

const ProblemCounter = require('../src/ProblemCounter');

describe('The ProblemCounter', function() {
  it('counts problems', function() {
    const pc = ProblemCounter.create();

    expect(pc.get()).toBe(0);
    pc.increment();
    expect(pc.get()).toBe(1);
    pc.increment();
    expect(pc.get()).toBe(2);
  });
});
