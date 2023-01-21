const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/autorole", checkAuth, async (req, res, next) => {
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
        const { isPremium } = await findOrCreate(req, 'GuildSettings');

        // Check Guild Premium Status
        let premium;
        if (isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Connect to Auto-Animes Database
        const settings = await findOrCreate(req, 'GuildSettings');
        // Connect to Auto-Animes Database
        const stickySettings = await findOrCreate(req, 'stickyRole');

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Server Management/autorole", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            stickySettings: stickySettings,
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/autorole", checkAuth, async (req, res, next) => {
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
        const { isPremium } = await findOrCreate(req, 'GuildSettings');

        // Check Guild Premium Status
        let premium;
        if (isPremium === true) {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Connect to Auto-Animes Database
        const settings = await findOrCreate(req, 'GuildSettings');
        // Connect to Auto-Animes Database
        const stickySettings = await findOrCreate(req, 'stickyRole');

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        if (req.body) {
            settings.autoroleToggle = true;
            settings.autoroleID = req.body.xd1;
        } else {
            settings.autoroleToggle = false;
            settings.autoroleID = Array;
        }

        // Salvando dados no banco de dados
        await settings.save().catch(() => { })

        // Create a Action Log
        await createLog(req, 'Updated Auto-Role');

        res.render("Dashboard/Server Management/autorole", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: '',
            premium: premium,
            member: member,
            stickySettings: '',
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/stickyrole", checkAuth, async (req, res, next) => {
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
        const { isPremium } = await findOrCreate(req, 'GuildSettings');

        // Check Guild Premium Status
        let premium;
        if (isPremium === true) {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Connect to Auto-Animes Database
        const settings = await findOrCreate(req, 'GuildSettings');
        // Connect to Auto-Animes Database
        const stickySettings = await findOrCreate(req, 'stickyRole');

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        if (req.body) {
            stickySettings.stickyroleToggle = true;
            stickySettings.stickyroleID = req.body.xd2;
        } else {
            stickySettings.stickyroleToggle = false;
            stickySettings.stickyroleID = Array;
        }

        // Salvando dados no banco de dados
        await stickySettings.save().catch(() => { })

        // Create a Action Log
        await createLog(req, 'Updated Sticky-Role');

        res.render("Dashboard/Server Management/autorole", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: '',
            premium: premium,
            member: member,
            stickySettings: '',
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;