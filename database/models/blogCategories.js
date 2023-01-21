const { Schema, model } = require('mongoose');

const blogCategoriesSchema = Schema({
    _id: { type: String, default: 'Hope' },
    categories: Array,
    tags: Array,
});

module.exports = model('blogCategories', blogCategoriesSchema);