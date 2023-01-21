const express = require("express"),
    { var: { findGuild, getUserFromGuild, getPermissions, findOrCreate } } = require("../../helpers"),
    { fetch } = require('undici'),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/leaderboard", checkAuth, async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findGuild(req, res);
        // if (guild && guild.code === 'ETIMEDOUT') return res.redirect("/dashboard"); 
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
        if (!guild) return res.redirect("/dashboard");

        // Find User
        const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
        if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

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

        // Retrieve Rank from databse
        const dbRank = await findOrCreate(req, 'RankSchema');

        const dbRankGlobal = await findOrCreate(null, 'RankSchema');

        let arrLocal = new Array();
        for (const dbl of dbRank) {
            const duser = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/users/${dbl.userID}?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
                if (e.code === 'ETIMEDOUT') {
                    return;
                }
            });
            arrLocal.push({ data: { id: dbl.userID, avatar: duser.user.displayAvatarURL, username: duser.user.username, xp: dbl.Xp, level: dbl.Level } });
            if (duser && duser.error === "Missing user ID") return;
        }

        let arrGlobal = new Array();
        for (const dbl of dbRankGlobal) {
            const duser = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/users/${dbl.userID}?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
                if (e.code === 'ETIMEDOUT') {
                    return;
                }
            });
            arrGlobal.push({ data: { id: dbl.userID, avatar: duser.user.displayAvatarURL, username: duser.user.username, xp: dbl.Xp, level: dbl.Level } });
            if (duser && duser.error === "Missing user ID") return;
        }

        res.render("Dashboard/leaderboard", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            dbRank: arrLocal,
            dbRankGlobal: arrGlobal,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;