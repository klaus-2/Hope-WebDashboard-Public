const express = require("express"),
    config = require("../config"),
    { var: { findOrCreate } } = require("../helpers"),
    { blog } = require("../database/models"),
    moment = require('moment'),
    markdown = require('markdown-it')({
        html: true,        // Enable HTML tags in source
        xhtmlOut: false,        // Use '/' to close single tags (<br />).
        // This is only for full CommonMark compatibility.
        breaks: true,        // Convert '\n' in paragraphs into <br>
        langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
        // useful for external highlighters.
        linkify: false,        // Autoconvert URL-like text to links

        // Enable some language-neutral replacement + quotes beautification
        // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
        typographer: false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '“”‘’',

        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externally.
        // If result starts with <pre... internal wrapper is skipped.
        highlight: function (/*str, lang*/) { return ''; }
    }),
    router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const db = await blog.find({}).sort([
            ['posted', 'descending'],
        ])

        res.render("blog", {
            user: req.session.user,
            markdown: markdown,
            db: db,
            splitMessage: splitMessage,
            moment: moment,
        });
    } catch (error) {
        next(error)
    }
});

function splitMessage(text, maxLength) {
    const splitText = text.match(new RegExp(`(.|[\r

]){1,${maxLength}}`, 'g'));
    return splitText;
}

module.exports = router;