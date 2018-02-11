'use strict';

const UserStorage = require('../src/UserStorage');

describe('The UserStorage mechanism', function() {
  it('stores and load values', function(done) {
    const storage = UserStorage.create();

    Promise.resolve()
      .then(() => storage.key('foo').store(7))
      .then(() => storage.key('foo').load())
      .then(seven => expect(seven).toBe(7))
      .then(done).catch(done.fail);
  });

  it('requires keys to be strings', function(done) {
    const storage = UserStorage.create();

    Promise.resolve()
      .then(() => storage.key(7).store(7))
      .then(done.fail).catch(() => done());
  });

  it('does not allow keys to contain periods', function(done) {
    const storage = UserStorage.create();

    Promise.resolve()
      .then(() => storage.key('number.seven').store(7))
      .then(done.fail).catch(() => done());
  });

  it('throws an exception if a key cannot be found', function(done) {
    const storage = UserStorage.create();

    Promise.resolve()
      .then(() => storage.key('seven').load())
      .then(done.fail).catch(() => done());
  });

  it('throws an exception if the same key is written twice', function(done) {
    const storage = UserStorage.create();

    Promise.resolve()
      .then(() => storage.key('seven').store('foo'))
      .then(() => storage.key('seven').store('bar'))
      .then(done.fail).catch(() => done());
  });

  it('resists sneaky editing of stored values', function(done) {
    const storage = UserStorage.create();
    const value = { seven: 7 };

    Promise.resolve()
      .then(() => storage.key('foo').store(value))
      .then(() => { value.seven = 9; })
      .then(() => storage.key('foo').load())
      .then(seven => expect(seven.seven).toBe(7))
      .then(seven => expect(seven).not.toBe(value))
      .then(done).catch(done.fail);
  });

  it('produces a log of all store events', function(done) {
    const storage = UserStorage.create();
    const seven = { seven: 7 };
    const nine = { nine: 9 };
    const start_time = Date.now();

    Promise.resolve()
      .then(() => storage.key('seven').store(seven))
      .then(() => storage.key('nine').store(nine))
      .then(() => storage.getLog())
      .then(log => {
        expect(log[0].key).toBe('seven');
        expect(log[0].value).toEqual(seven);
        expect(log[0].value).not.toBe(seven);
        expect(log[0].timestamp).not.toBeLessThan(start_time);
        expect(log[0].timestamp).not.toBeGreaterThan(Date.now());
        expect(log[1].key).toBe('nine');
        expect(log[1].value).toEqual(nine);
        expect(log[1].value).not.toBe(nine);
        expect(log[1].timestamp).not.toBeLessThan(start_time);
        expect(log[1].timestamp).not.toBeGreaterThan(Date.now());
      }).then(done).catch(done.fail);
  });
});
