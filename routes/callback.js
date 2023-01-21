const express = require("express"),
    passport = require("passport"),
    DiscordStrategy = require('passport-discord').Strategy,
    Discord = require("discord.js"),
    config = require("../config"),
    router = express.Router();

router.get('/login', passport.authenticate('discord'));
router.get('/callback', passport.authenticate('discord', {
    failureRedirect: '/?error=oauth-login-failed'
}), function (req, res) {
    const url = req.session.backURL;
    req.session.backURL = null;
    res.redirect("/") // Successful auth
});

module.exports = router;