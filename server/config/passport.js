var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('mongoose').model('User'),
    constants = require('../common/constants');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {

        User.findOne({ username: username }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user && user.authenticate(password)) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));

    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });

    passport.use(new FacebookStrategy({
            clientID: constants.facebookAuth.appID,
            clientSecret: constants.facebookAuth.appSecret,
            callbackURL: constants.facebookAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({'facebook.id': profile.id}).exec(function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, user);
                }
                else {
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    if(profile.email){
                        newUser.facebook.email = profile.email;
                    }

                    newUser.facebook.username = profile.displayName;

                    newUser.save(function(err){
                        if(err){
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        }
    ));
};