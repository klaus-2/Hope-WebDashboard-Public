const express = require("express"),
    { var: { findOrCreate } } = require("../helpers"),
    router = express.Router();

router.get("/v/:vanityURL", async (req, res, next) => {
    try {
        const vanityUrlDB = await findOrCreate(req.params.vanityURL, 'GuildSettings-1');
        if (vanityUrlDB == null) return res.send('Invalid url provided...')

        // vanityUrlDB.clicks++
        // vanityUrlDB.save()

        res.redirect("https://discord.gg/" + vanityUrlDB.vanityRedirect)
    } catch (error) {
        next(error)
    }
});

module.exports = router;