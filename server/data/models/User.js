var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

var requiredMessage = '{PATH} is required';

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username:{type: String, require: requiredMessage,unique: true},
        email: {type: String, require: requiredMessage,unique: true},
        salt: String,
        hashPass: String
    });

    userSchema.method({
        authenticate: function (password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);
};