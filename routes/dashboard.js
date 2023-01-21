const express = require("express"),
    { discordAPI: { getData, getUserGuild } } = require("../helpers"),
    config = require("../config"),
    { logger } = require("../utils"),
    { PermissionsBitField } = require("discord.js"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard", checkAuth, async (req, res, next) => {
    try {
        let userInfo = await getData(req.user.id, config.token);
        // const response = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/852237113071894618?token=${process.env.API_TOKEN}`).then(res => res.json());

        /* let ndb = new Array();
        for (const guild of req.session.user.guilds) {
            let getData = await getUserGuild(guild.id, config.token);
            ndb.push(getData);
        }
        console.log(ndb); */

        // OBTEM LISTA DE ROLES DO SERVIDOR
        /* let rr = await getUserGuild('852237113071894618', config.token);
        console.log(rr);
        console.log(rr.roles)
        for (const a of rr.roles) { 
            console.log(a.name)
        } */

        // OBTEM A LISTA DE CANAIS DO SERVIDOR (TYPES ID https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
        /* let ch = await getGuildChannels('852237113071894618', config.token);
        console.log(ch) */

        res.render("servers", {
            translate: req.translate,
            PermissionsBitField: PermissionsBitField,
            userExists: userInfo,
            req: req,
            user: req.session.user,
            getUserGuild: getUserGuild,
            token: config.token,
            domain: config.baseURL,
        });
    } catch (error) {
        logger.error(error);
        res.redirect('/maintenance');
    }
});

module.exports = router;