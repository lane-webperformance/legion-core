'use strict';

const Services = require('./Services');
const UserStorage = require('./UserStorage');

const metrics = require('legion-metrics');
const control = require('legion-control');

const uuid = require('uuid');

module.exports.globalService = function(services) {
  services = Services.create(services)
    .withMetricsTarget(metrics.Target.create(metrics.merge))
    .withProjectKey(uuid.v4())
    .initProblemCounter()
    .withController(control.clients.local.create());

  return Promise.resolve(services);
};

module.exports.userService = function(services) {
  const userid = uuid.v4();

  services = Services.create(services)
    .withUserUniqueId(userid)
    .withUserStorage(UserStorage.create().key('user').key(userid));

  return Promise.resolve(services);
};
