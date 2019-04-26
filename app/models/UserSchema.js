const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    accessLevel: String,
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return !!password && password.length > 6;
            },
            'Password must be greater than 6 characters'
        ]
    },
    twoFactPass: {
        type: String
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        default: 'local'
        //required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64');
};

UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    const _this = this;
    const possibleUsername = username + (suffix || '');

    _this.findOne({username: possibleUsername}, function (error, user) {
            if (!error) {
                if (!user) callback(possibleUsername);
                else return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
            else callback(null);
        });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);