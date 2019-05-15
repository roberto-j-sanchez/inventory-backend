const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../../models/user-model');

passport.use(
  new LocalStrategy(
    {
      // use email as the username
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, next) => {
      User.findOne({ email })
        .then(userFromDB => {
          if (!userFromDB) {
            return next(null, false, { message: 'Invalid email' });
          }
          if (userFromDB.encryptedPassword) {
            if (!bcrypt.compareSync(password, userFromDB.encryptedPassword)) {
              return next(null, false, { message: 'Invalid password.' });
            }
          }
          return next(null, userFromDB);
        })
        .catch(err => next(err));
    }
  )
);
