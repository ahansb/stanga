var passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                res.redirect('/error-login');
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                res.redirect('/');
            })
        });

       auth(req,res,next);
    },
    facebookLogin:function(req,res,next){
        var auth = passport.authenticate('facebook',{scope: 'public_profile,email'});
        auth(req,res,next);
    },
    facebookRedirect: function(req,res,next){
        var auth = passport.authenticate('facebook', { successRedirect: '/',
            failureRedirect: '/login' })  ;
        auth(req,res,next);
    },
    logout: function (req, res, next) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/error-auth');
        }
        else {
            next();
        }
    }
};