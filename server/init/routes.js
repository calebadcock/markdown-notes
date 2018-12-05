/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import { buildApiResponse } from './helpers';

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

    app.get('/user/notes', async (req, res) => {
            const notes = await usersController.getNotes(req.user.id);
            return buildApiResponse(req, res, 200, notes);
    });

    app.put('/user/notes', async (req, res) => {
            const note = await usersController.updateNote(req.body.id, req.body.text);
            return buildApiResponse(req, res, 200, note);
    });

    app.post('/user/notes', async (req, res) => {
            const note = await usersController.newNote(req.user.id, req.body.text);
            return buildApiResponse(req, res, 200, note);
    });
  }
};
