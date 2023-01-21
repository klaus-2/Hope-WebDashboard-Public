const express = require("express"),
    { var: { findGuild, getUserFromGuild, findLogs, getPermissions, findOrCreate } } = require("../../helpers"),
    moment = require('moment'),
    { fetch } = require('undici'),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/home", checkAuth, async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findGuild(req, res);
        // if (guild && guild.code === 'ETIMEDOUT') return res.redirect("/dashboard"); 
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
        if (!guild) return res.redirect("/dashboard");

        // Find User
        const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
        if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

        // Find Logs
        const logs = await findLogs(req, res);
        if (logs && logs.error === "Guild not found!") return res.redirect("/maintenance");
        if (!logs) return res.redirect("/maintenance");

        // Check user permissions
        if (await getPermissions(req) === true) return res.status(200).redirect("/dashboard");

        // Connect to Guild Settings Database
        const settings = await findOrCreate(req, 'GuildSettings');

        // Check Guild Premium Status
        let premium;
        if (settings.isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const actionLogs = await findOrCreate(req, 'actionLog');

        let news = await findOrCreate(req, 'newsDB');

        /* let getData = await getUserGuild(req.params.guildID, config.token);
        settings.approximate_member_count = getData.approximate_member_count;
        settings.approximate_presence_count = getData.approximate_presence_count;
        settings.region = getData.region;
        settings.preferred_locale = getData.preferred_locale;
        await settings.save().catch(() => { }); */

        let arr = new Array();
        for (const dbl of actionLogs) {
            const duser = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/users/${dbl.userID}?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
                if (e.code === 'ETIMEDOUT') {
                    return;
                }
            });
            arr.push({ data: { ID: dbl.userID, avatar: duser.user.displayAvatarURL, action: dbl.action, tag: dbl.userTag, date: dbl.data } });
            if (duser && duser.error === "Missing user ID") return;
        }

        res.render("Dashboard/index", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            logs: logs,
            settings: settings,
            avatar: arr,
            newsDB: news,
            moment: moment,
            premium: premium,
            member: member,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;