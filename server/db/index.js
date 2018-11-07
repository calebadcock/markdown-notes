// const dbConfig = require('./postgres').default;
const dbConfig = require('./none').default;

export const connect = dbConfig.connect;
export const controllers = dbConfig.controllers;
export const passport = dbConfig.passport;
export const session = dbConfig.session;

