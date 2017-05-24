'use strict';

const Io = require('legion-io');

module.exports.Services = require('./Services');
module.exports.UserStorage = require('./UserStorage');
module.exports._legion_hooks = require('./hooks');

module.exports.load = (key) => Io.get().chain(services => services.getUserStorage().key(key).load());
module.exports.store = (key,value) => Io.get().chain(services => services.getUserStorage().key(key).store(value));

module.exports.receive = (sample) => Io.get().chain(services => services.receive(sample));
module.exports.tag = (tags, action) => Io.local(services => services.tag().apply(services, tags), action);

module.exports.getUserUniqueId = () => Io.get().chain(services => services.getUserUniqueId());
module.exports.getProjectKey = () => Io.get().chain(services => services.getProjectKey());

module.exports.incrementProblems = () => Io.get().chain(services => {
  services.getProblemCounter().increment();
  return undefined;
});
