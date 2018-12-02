const debug = require('debug')('merkdown-notes:db:sequelize');

require('babel-polyfill');
require('babel-register')({
  presets: ['es2015', 'stage-0']
});

const env = require('../../../config/env');
module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_URL,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_URL,
    dialect: 'postgres',
    logging: false
  }
};
