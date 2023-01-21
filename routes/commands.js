const express = require("express"),
    config = require("../config"),
    { var: { getCommands } } = require("../helpers"),
    router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        let get = await getCommands();
        if (!get) return res.redirect('/maintenance');

        res.render("commands", {
            translate: req.translate,
            domain: req.hostname,
            user: req.session.user,
            cmd: await getCommands(),
            currentURL: `${config.baseURL}/${req.originalUrl}`
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;