'use strict';

const metrics = require('legion-metrics');
const Services = require('../src/Services');

describe('The Services object', function() {
  it("Is immutable and can get and modify it's members", function() {
    const services = Services.create();
    expect(services.getService('foo')).toBe(undefined);
    expect(services.withService('foo',7).getService('foo')).toBe(7);
    expect(services.getService('foo')).toBe(undefined);
  });

  it('Can count problems', function() {
    const services = Services.create()
      .withMetricsTarget(metrics.Target.create(metrics.merge))
      .initProblemCounter();

    services.incrementProblems();
    services.incrementProblems();
    services.incrementProblems();
    services.incrementProblems();
    services.incrementProblems();

    expect(services.getMetricsTarget().getProblemCount()).toBe(5);
    expect(services.getProblemCounter().get()).toBe(5);
  });
});
