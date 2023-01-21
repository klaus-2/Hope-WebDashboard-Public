const { Schema, model } = require('mongoose');

const blogSchema = Schema({
    title: { type: String, default: null },
    thumbnail: { type: String, default: null },
    content: { type: String, default: null },
    shortDesc: { type: String, default: null },
    author: { type: String, default: null },
    authorID: { type: String, default: null },
    posted: { type: Date, default: null },
    lastEdit: { type: Date, default: null },
    categories: { type: Array, default: null },
    tags: { type: Array, default: null },
    postURL: { type: String, default: null },
    listingPrivacy: { type: String, default: null }
});

module.exports = model('blog', blogSchema);