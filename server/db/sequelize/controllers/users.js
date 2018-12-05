import passport from 'passport';
import { Models } from '../models';

const User = Models.User;
const Note = Models.Note;

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      return res.sendStatus(200);
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  req.logout();
  res.sendStatus(200);
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  User.findOne({ where: { email: req.body.email } }).then((existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    const user = User.build({
      email: req.body.email,
      password: req.body.password
    });

    return user.save().then(() => {
      req.logIn(user, (err) => {
        if (err) return res.sendStatus(401);
        return res.sendStatus(200);
      });
    });
  }).catch(err =>
    next(err)
  );
}

export const getNotes = async (userId) => {
    return await Note.findAll({ where: { userId } });
};

export const updateNote = async (id, text) => {
    await Note.update({ text }, { where: { id } });
    return await Note.find({where: {id}});
};

export const newNote = async (userId, text) => {
    // TODO: possibly change to find or create
    return await Note.create({ userId, text });
};

export default {
  login,
  logout,
  signUp,
  getNotes,
  updateNote,
  newNote
};
