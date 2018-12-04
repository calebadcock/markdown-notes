import { Models, sequelize } from '../models';

const User = Models.User;

const createUserWithToken = (email, googleId, done) => {
  return sequelize.transaction((transaction) =>
    User.create({
      email,
      googleId,
    }, { transaction }).then((user) =>
      done(null, user)
    )
  );
};

export default (email, googleId, done) =>
  User.findOne({
    where: { email, googleId }
  }).then((existingUser) => {
    if (existingUser) return done(null, existingUser);
    else return createUserWithToken(email, googleId, done);
  }).catch((err) => {
    console.log(err);
    return done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
