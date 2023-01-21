const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/autonick", checkAuth, async (req, res, next) => {
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

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Moderation/autonick", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            settings: settings,
            ch: ch,
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/autonick", checkAuth, async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findGuild(req, res);
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
        if (!guild) return res.redirect("/dashboard");

        // Find User
        const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
        if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

        // Check user permissions
        if (await getPermissions(req) === true) return res.status(200).redirect("/dashboard");

        // Connect to Guild Settings Database
        const settings = await findOrCreate(req, 'GuildSettings');

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { prenick, AutoNickAddon } = req.body;
        let nickname = prenick;

        if (prenick.length < 1) nickname = "CHANGE TO YOUR NAME";
        if (!prenick) {
            nickname = "CHANGE TO YOUR NAME"
        } else {
            settings.AutoNickName = nickname;
        }

        if (AutoNickAddon) {
            settings.AutoNickToggle = true;
            // Create a Action Log
            await createLog(req, 'Enabled Auto-Nick');
        } else {
            settings.AutoNickToggle = false;
            // Create a Action Log
            await createLog(req, 'Disabled Auto-Nick');
        }

        await settings.save().catch(() => { });

        // Create a Action Log
        await createLog(req, 'Updated Auto-Nick');

        res.render("Dashboard/Moderation/autonick", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            settings: settings,
            ch: '',
            rr: '',
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;