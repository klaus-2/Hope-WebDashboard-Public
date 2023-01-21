const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/giveaway", checkAuth, async (req, res, next) => {
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

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Server Management/giveaway", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
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

router.post("/dashboard/:guildID/giveaway", checkAuth, async (req, res, next) => {
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
        const ticketSettings = await findOrCreate(req, 'ticketEmbedSchema');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        if (Object.prototype.hasOwnProperty.call(req.body, "GiveawaySend")) {
            // Giveaway Channel

            let GiveawayChannel = req.body.GiveawayChannel;

            const GiveawayData = new Date(req.body.Giveawaytime);
            const time = GiveawayData.getTime();

            // Inicia o sorteio
            client.giveawaysManager.start(GiveawayChannel, {
                time: time,
                prize: req.body.GiveawayTitle,
                winnerCount: req.body.GiveawayRange,
                hostedBy: req.user.user,
                messages: {
                    giveaway: client.translate('Sorteio/criarsorteio:giveaway', {}, client.guilds.cache.get(guild.id).settings.Language),
                    giveawayEnded: client.translate('Sorteio/criarsorteio:giveawayEnded', {}, client.guilds.cache.get(guild.id).settings.Language),
                    timeRemaining: client.translate('Sorteio/criarsorteio:timeRemaining', {}, client.guilds.cache.get(guild.id).settings.Language),
                    inviteToParticipate: client.translate('Sorteio/criarsorteio:inviteToParticipate', {}, client.guilds.cache.get(guild.id).settings.Language),
                    winMessage: client.translate('Sorteio/criarsorteio:winMessage', {}, client.guilds.cache.get(guild.id).settings.Language),
                    embedFooter: client.translate('Sorteio/criarsorteio:FOOTER', {}, client.guilds.cache.get(guild.id).settings.Language),
                    noWinner: client.translate('Sorteio/criarsorteio:noWinner', {}, client.guilds.cache.get(guild.id).settings.Language),
                    winners: client.translate('Sorteio/criarsorteio:winners', {}, client.guilds.cache.get(guild.id).settings.Language),
                    endedAt: client.translate('Sorteio/criarsorteio:endedAt', {}, client.guilds.cache.get(guild.id).settings.Language),
                    hostedBy: client.translate('Sorteio/criarsorteio:hostedBy', {}, client.guilds.cache.get(guild.id).settings.Language),
                    units: {
                        seconds: client.translate('time:SECONDS', { amount: '' }, client.guilds.cache.get(guild.id).settings.Language).trim(),
                        minutes: client.translate('time:MINUTES', { amount: '' }, client.guilds.cache.get(guild.id).settings.Language).trim(),
                        hours: client.translate('time:HOURS', { amount: '' }, client.guilds.cache.get(guild.id).settings.Language).trim(),
                        days: client.translate('time:DAYS', { amount: '' }, client.guilds.cache.get(guild.id).settings.Language).trim(),
                    },
                },
            }).then(() => {
                console.log(`${req.user.tag} começou um sorteio no servidor: [${guild.id}].`);
            });
        }
        // Create a Action Log
        await createLog(req, 'Created Giveaway');

        res.render("Dashboard/Server Management/giveaway", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            ch: ch,
            rr: rr,
            error: '',
            success: 'Giveaway successfully started',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;