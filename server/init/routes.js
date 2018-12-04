/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/sessions', usersController.login);
    app.delete('/sessions', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    app.get('/auth/google',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );

    app.get('/user/notes', (req, res) => {
        try {
            res.send([{ text: 'test', user: 1 }]);
        } catch (err) {

        }
    });
  }
};
