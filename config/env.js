require('dotenv').config({ silent: true });

export const ENV = process.env.NODE_ENV || 'development';
const useTestDB = ENV === 'test';

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL;
export const DB_NAME = useTestDB ? `${process.env.DB_NAME}_test` : process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const google = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
};


export const SESSION_SECRET = process.env.SESSION_SECRET || 'not-secret';
/* To make sure everything referencing the session ID knows what it is called */
export const SESSION_ID = 'sid';
