const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pageSchema = new Schema({
    name: {
        type: String
    },
    content: {
        type: Schema.Types.Mixed
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Page', pageSchema);