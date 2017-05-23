'use strict';

const ProblemCounter = {};

module.exports.create = () => Object.assign(Object.create(ProblemCounter), { _count: 0 });
module.exports.prototype = ProblemCounter;

ProblemCounter.increment = function() {
  this._count++;
};

ProblemCounter.get = function() {
  return this._count;
};
