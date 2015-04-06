var mongoose = require('../managers/MongoManager.js').mongoose;
// var findOrCreate = require('mongoose-findorcreate');
var Dashboard = require('./DashboardSchema');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true
    },
    auth: {
        email: {
            type: String,
            unique: true,
            index: true
        },
        password: String
    },
    infos: {
        any: mongoose.Schema.Types.Mixed
    },
    created: {
        type: Date
    },
    updated: {
        type: Date,
        default: Date.now
    },
    dashboards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dashboard'
    }]
}, {
    strict: false
});

// userSchema.plugin(findOrCreate);

userSchema.statics.getByAuthEmail = function(email, cb) {
    this.findOne({
        "auth.email": email
    }, cb);
};

userSchema.statics.getById = function(id, cb) {
    this.findOne({
        "_id": id
    }, cb);
};


module.exports = mongoose.model('User', userSchema);