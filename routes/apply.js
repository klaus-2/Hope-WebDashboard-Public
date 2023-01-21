const express = require("express"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = '/apply';
    res.redirect("/login");
}

router.get("/", checkAuth, async (req, res, next) => {
    try {
        res.render("apply", {
            user: req.session.user,
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;