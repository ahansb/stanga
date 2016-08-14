var encryption = require('../utilities/encryption'),
    users = require('../data/users');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegistered: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/register');
    },
    postRegister: function (req, res, next) {
        var newUserData = req.body;

        if (newUserData.password != newUserData.confirmPassword) {
            res.redirect('/register');
        }
        else {
            newUserData.username = newUserData.email;
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function (err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.render('error', {reason: err.toString()});
                    }
                    else{
                        res.redirect('/');
                    }
                })
            });
        }
    },
    getLogin: function(req,res,next){
        res.render(CONTROLLER_NAME+'/login');
    }
};