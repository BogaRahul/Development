const db = require('monk')('localhost/users');

module.exports = db;