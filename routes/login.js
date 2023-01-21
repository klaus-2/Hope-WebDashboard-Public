const express = require("express"),
    passport = require("passport"),
    router = express.Router();

router.get("/login", async (req, res, next) => {
    if (req.session.backURL) {
        req.session.backURL = req.session.backURL;

    } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
            req.session.backURL = parsed.path;
        }
    } else {
        req.session.backURL = "/";
    }
    // Forward the request to the passport middleware.
    next();
},
    passport.authenticate("discord"));

module.exports = router;