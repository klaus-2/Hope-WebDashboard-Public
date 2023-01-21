const express = require("express"),
    config = require("../config"),
    router = express.Router();

router.get("/", async (req, res) => {

    res.render("privacy-policy", {
        translate: req.translate,
        domain: req.hostname,
        user: req.session.user,
        currentURL: `${config.baseURL}/${req.originalUrl}`
    });
});

module.exports = router;