const passport = require('passport');
const User = require('../models/user');
const config =require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy  = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup Options for JWT Strategy

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret

};

//Create JWT Strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  //Verify this email and password, call done with the user.
    //if it is the correct username and password
    //otherwise, call done with false
    User.findOne({email: email}, function (err, user) {
      if (err) {return done(err);}
      if(!user) {return done(null, false);}

    //compare password - is 'password' equal to user.password
    user.comparePassword(password, function (err, isMatch) {
     if (err) {return done(err);}
     if(!isMatch) {return done(null, false);}

     return done(null, user);
    })
    });
});


//payload is the Decoded value of token , thats created in authentication.js
//& done is a callback
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    //See if the userID in the paylaod exists in our database
    //If it does, call 'done' with that object, otherwise, call
    //done without the user object
    User.findById(payload.sub, function (err, user) {
        //search failed to occur
        if (err) {return done(err, false);}

        //If search occured & user exists
        if(user){
            done(null, user);

        } //ifsearch occured &  user doesnt exist
         else {
            done(null, false);
        }
    })

});

//Tell Passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);