const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/reputation", checkAuth, async (req, res, next) => {
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
        // Connect to Guild Settings Database
        const dbReputation = await findOrCreate(req, 'Rank_de_Reputações');

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Utilities/reputation", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            dbReputation: dbReputation,
            member: member,
            ch: ch,
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/reputation", checkAuth, async (req, res, next) => {
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
        // Connect to Guild Settings Database
        const dbReputation = await findOrCreate(req, 'Rank_de_Reputações');

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        if (Object.prototype.hasOwnProperty.call(req.body, "repch")) {

            // Auto Message Channel
            let AutoMessageChannel = await guild.channels.cache.find((ch) => `#${ch.name}` === req.body.repch);

            if (AutoMessageChannel) {
                const novamsg = await AutoMessageChannel.send({ content: client.translate('Addons/reputação:REP', {}, client.guilds.cache.get(guild.id).settings.Language) });

                dbReputation.channelId = guild.channels.cache.find((ch) => `#${ch.name}` === req.body.repch).id;
                dbReputation.enabled = true;
                dbReputation.msgID = novamsg.id;

                await dbReputation.save().catch(() => { });
            } else {
                dbReputation.channelId = null;
                dbReputation.enabled = false;
                dbReputation.msgID = null;

                await dbReputation.save().catch(() => { });
            }
        }

        // Create a Action Log
        await createLog(req, 'Updated Reputation');

        res.render("Dashboard/Utilities/reputation", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            dbReputation: dbReputation,
            ch: ch,
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;