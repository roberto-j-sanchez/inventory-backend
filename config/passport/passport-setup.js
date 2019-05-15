const passport = require('passport');

const User = require('../../models/user-model');

require('./local-strategy');

// serializeUser(): defines what data to save in the session
// ==> occurs when user logs in successfully
passport.serializeUser((userDoc, done) => {
  console.log('SERIALIZE (save user ID to session)');

  // call done() with null and the result if it is successful
  // ==> the result is the user's ID that we want to save to the session
  done(null, userDoc._id);
});

// deserializeUser(): defines how to retrieve the user information from the DB
// ==> this happens automatically on EVERY request AFTER user logs in
passport.deserializeUser((userIdFromSession, done) => {
  console.log('DESERIALIZE (retrieving user info from the DB');

  User.findById(userIdFromSession)
    .then(userDoc => {
      // call done() with null and the result if user log in is successful
      // ==> the result is the user document from the DB
      done(null, userDoc);
    })
    // call done() with the error object if user log in is unsuccessful
    .catch(err => done(err));
});

function passportBasicSetup(theApp) {
  theApp.use(passport.initialize()); // <== 'fires' the passport package
  theApp.use(passport.session()); // <== connects passport to the session
}

module.exports = passportBasicSetup;