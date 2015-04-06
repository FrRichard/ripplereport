var mongoose = require('../managers/MongoManager.js').mongoose;

var dashboardSchema = new mongoose.Schema({
    created: Date,
    widgets: {
        any: mongoose.Schema.Types.Mixed
    },
    _owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    name: {
        type: String,
        index: true
    }
}, {
    strict: false
});

// dashboardSchema.statics.getByAuthEmail = function(email, cb) {
//     this.findOne({
//         "auth.email": email
//     }, cb);
// };

module.exports = mongoose.model('Dashboard', dashboardSchema);