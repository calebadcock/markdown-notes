// require('dotenv').config({ silent: true });

export const ENV = process.env.NODE_ENV || 'development';

export const DB_TYPE = 'POSTGRES';

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;

export const google = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
};


export const SESSION_SECRET = process.env.SESSION_SECRET;
/* To make sure everything referencing the session ID knows what it is called */
export const SESSION_ID = 'sid';
