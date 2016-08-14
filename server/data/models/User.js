var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

var requiredMessage = '{PATH} is required';

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: {type: String, index: { unique: true, sparse: true }},
        email: {type: String, index: { unique: true, sparse: true }},
        salt: String,
        hashPass: String,
        facebook: {
            id: {type: String},
            token: {type: String},
            email: {type: String},
            username: {type: String}
        }
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