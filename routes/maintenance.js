const express = require("express"),
    config = require("../config"),
    router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.render("maintenance", {
            translate: req.translate,
            domain: req.hostname,
            user: req.session.user,
            currentURL: `${config.baseURL}/${req.originalUrl}`
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;