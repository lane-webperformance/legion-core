'use strict';

const Services = require('../src/Services');

describe('The Services object', function() {
  it("Is immutable and can get and modify it's members", function() {
    const services = Services.create();
    expect(services.getService('foo')).toBe(undefined);
    expect(services.withService('foo',7).getService('foo')).toBe(7);
    expect(services.getService('foo')).toBe(undefined);
  });
});
