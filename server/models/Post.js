const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isVisible: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', postSchema);