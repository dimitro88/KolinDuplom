const _ = require('lodash');
const api = _.merge(
  require('./swagger/user.json'),
  require('./swagger/base.json'),
  require('./swagger/company.json'),
  require('./swagger/informer.json'),
  require('./swagger/task.json'),
  require('./swagger/category.json'),
);

module.exports = api;
