const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
    moment = require('moment'),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/embeds", checkAuth, async (req, res, next) => {
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

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/embeds", {
            req: req,
            guild: guild,
            ch: ch,
            alert: null,
            settings: settings,
        });
    } catch (error) {
        next(error)
    }
});

router.get("/dashboard/:guildID/embed-welcome", checkAuth, async (req, res, next) => {
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

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/embeds", {
            req: req,
            guild: guild,
            ch: ch,
            member: member,
            moment: moment,
            alert: null,
            settings: settings,
        });
    } catch (error) {
        next(error)
    }
});

router.get("/dashboard/:guildID/embed-rr", checkAuth, async (req, res, next) => {
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

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/embeds", {
            req: req,
            guild: guild,
            ch: ch,
            member: member,
            moment: moment,
            alert: null,
            settings: settings,
        });
    } catch (error) {
        next(error)
    }
});

router.get("/dashboard/:guildID/embed-ticket-welcome", checkAuth, async (req, res, next) => {
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

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/embeds", {
            req: req,
            guild: guild,
            ch: ch,
            member: member,
            moment: moment,
            alert: null,
            settings: settings,
        });
    } catch (error) {
        next(error)
    }
});

router.get("/dashboard/:guildID/embed-ticket-reaction", checkAuth, async (req, res, next) => {
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

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/embeds", {
            req: req,
            guild: guild,
            ch: ch,
            member: member,
            moment: moment,
            alert: null,
            settings: settings,
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/embeds", checkAuth, async (req, res, next) => {

    // Find Guild
    const guild = await findGuild(req, res);
    if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
    if (!guild) return res.redirect("/dashboard");

    // Find User
    const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
    if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

    // Check user permissions
    if (await getPermissions(req) === true) return res.status(200).redirect("/dashboard");

    const user = member
    try {
        if (req.body.type === 'embed') {

            let guild = client.guilds.cache.get(req.body.guild),
                channel = guild && guild.channels.cache.get(req.body.to),
                data = req.body.json.embed,
                content = req.body.json.content;
            if (!guild || !channel || !data) return res.status(400).send('Some data is missing');
            const fetchmember = await guild.members.fetch(user.id);
            if (!fetchmember || !fetchmember.permissions.has('ADMINISTRATOR')) return res.status(403).send("You don't have permission.");
            if (!channel.permissionsFor(channel.guild.client.user).has("SEND_MESSAGES")) return res.status(403).send("I'm missing 'send message' permissions");
            if (cooldownEmbed.has(guild.id)) return res.status(403).send("Slow Down!");
            try {
                await channel.send({ content: content, embeds: [data] });
                cooldownEmbed.add(guild.id);
                setTimeout(() => {
                    cooldownEmbed.delete(guild.id)
                }, 5000)
                return;
            } catch (err) {
                res.status(403).send(`403 - ${err}`)
                return;
            }
            res.send();


        } else if (req.body.type === 'customcommand') {


            let guild = client.guilds.cache.get(req.params.guildID),
                data = req.body.json,
                cmdname = req.body.command

            if (!guild || !data) return;

            const name = cmdname.toLowerCase()
            if (!name) return;
            const check = cmdname.toLowerCase()
            if (!check) return;
            if (client.commands.get(check) || client.aliases.get(check)) return;
            const content = JSON.stringify(data)
            if (!content) return;
            if (settings.isPremium === "false") {
                const conditional = {
                    guildID: guild.id
                }
                const results = await customCommandSchema.find(conditional)

                if (results.length >= 10) return;

            }
            customCommandSchema.findOne({
                guildID: guild.id,
                name
            }, async (err, data) => {
                if (!data) {
                    customCommandSchema.create({ guildID: guild.id, name, content, json: true });
                    return;
                }
                else {

                }
            })

        }
    } catch (err) {
        return res.end(
            JSON.stringify({ error: true, message: err.message })
        );
    }
});

module.exports = router;