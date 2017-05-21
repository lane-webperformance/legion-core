'use strict';

const UserStorage = {};

module.exports.prototype = UserStorage;

function create() {
  return Object.assign(Object.create(UserStorage), {
    _key: '',
    _storage: {}
  });
}

module.exports.create = create;

UserStorage.load = function() {
  return Promise.resolve().then(() => {
    if( this._storage[this._key] )
      return JSON.parse(this._storage[this._key].value);

    throw new Error('UserStorage.load: "' + this._key + '" not found');
  });
};

UserStorage.store = function(value) {
  value = JSON.stringify(value);

  return Promise.resolve().then(() => {
    if( this._key in this._storage )
      throw new Error('UserStorage is write-once: the key "' + this._key + '" cannot be overwritten.');

    this._storage[this._key] = {
      value: value,
      timestamp: Date.now()
    };

    return undefined;
  });
};

UserStorage.key = function(key) {
  if( typeof key !== 'string' )
    throw new Error('UserStorage.key: key must be a string');

  if( key.indexOf('.') >= 0 )
    throw new Error('UserStorage.key: key must not contain "." character.');

  return Object.assign(Object.create(UserStorage), {
    _key: [this._key, key].filter(s => s.length > 0).join('.'),
    _storage : this._storage
  });
};

UserStorage.getLog = function() {
  return Promise.resolve().then(() => {
    const results = [];

    for( const key in this._storage )
      results.push({ key: key, value: JSON.parse(this._storage[key].value), timestamp: this._storage[key].timestamp });

    results.sort((a,b) => a.timestamp-b.timestamp);

    return results;
  });
};
