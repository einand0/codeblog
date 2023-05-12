const mongoose = require('../db/conn')
const { Schema } = mongoose

const Post = mongoose.model(
    'Post',
    new Schema({
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: Object,
    }, { timestamps: true }),
)

module.exports = Post