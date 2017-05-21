'use strict';

const Services = {};

module.exports.prototype = Services;

function create(copy) {
  return Object.assign(Object.create(Services), copy || {});
}

module.exports.create = create;

Services.getService = function(key) {
  return this[key];
};

Services.withService = function(key, value) {
  const changes = {};
  changes[key] = value;

  return Object.assign(create(this), changes);
};

Services.getMetricsTarget = function() {
  return this.getService('metrics_target');
};

Services.withMetricsTarget = function(metrics_target) {
  return this.withService('metrics_target', metrics_target)
             .withService('metrics_receiver', metrics_target.receiver());
};

Services.getMetricsReceiver = function() {
  return this.getService('metrics_receiver');
};

Services.withMetricsReceiver = function(metrics_receiver) {
  return this.withService('metrics_receiver', metrics_receiver);
};

Services.tag = function() {
  const receiver = this.getMetricsReceiver();
  return this.withMetricsReceiver(receiver.tag.apply(receiver, arguments));
};

Services.receive = function() {
  const receiver = this.getMetricsReceiver();
  return receiver.receive.apply(receiver, arguments);
};

Services.getProjectKey = function() {
  return this.getService('project_key');
};

Services.withProjectKey = function(project_key) {
  return this.withService('project_key', project_key);
};

Services.getController = function() {
  return this.getService('controller');
};

Services.withController = function(controller) {
  return this.withService('controller', controller);
};

Services.getUserUniqueID = function() {
  return this.getService('user_unique_id');
};

Services.withUserUniqueID = function(user_unique_id) {
  return this.withService('user_unique_id', user_unique_id);
};

Services.getUserStorage = function() {
  return this.getService('user_storage');
};

Services.withUserStorage = function(user_storage) {
  return this.withService('user_storage', user_storage);
};

Services.key = function() {
  return this.withUserStorage(this.getUserStorage().key.apply(this.getUserStorage(), arguments));
};

Services.load = function() {
  return this.getUserStorage().load.apply(this.getUserStorage(), arguments);
};

Services.store = function() {
  return this.getUserStorage().store.apply(this.getUserStorage(), arguments);
};

Services.getLog = function() {
  return this.getUserStorage().getLog.apply(this.getUserStorage(), arguments);
};
