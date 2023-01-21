const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate, createMessage, updateSettings } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/verification", checkAuth, async (req, res, next) => {
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

        res.render("Dashboard/Moderation/verification", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            settings: settings,
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

router.post("/dashboard/:guildID/verification", checkAuth, async (req, res, next) => {
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

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        const { modo, VFChannel, VFRole } = req.body;

        // custom message
        if (modo === "0") {
            settings.Verificar = false;
            settings.VerificarOpção = modo;
        } else if (modo === "1") {
            settings.Verificar = false;
            settings.VerificarOpção = modo;
        } else if (modo === "2") {
            settings.Verificar = false;
            settings.VerificarOpção = modo;
        } else if (modo === "3") {
            settings.Verificar = true;
            settings.VerificarOpção = modo;

            const embed = {
                color: 6919935,
                title: "Verification system",
                description: "Click on the __button__ below to **verify** and gain access to this server.",
                image: {
                    url: 'https://i.pinimg.com/originals/2e/58/3f/2e583f70f4aae58a1b4577fb0f3ef7ae.gif',
                },
                footer: {
                    text: 'Powered by hopebot.top',
                    icon_url: null,
                },
            };

            /* ENVIA A MSG */
            let datamsg = {
                "content": null,
                "tts": false,
                "embeds": [embed],
                "components": [
                    {
                        "type": 1,
                        "components": [{
                            "type": 2,
                            "label": "Verfiy",
                            "style": 1,
                            "custom_id": 'verify',
                            "emoji": {
                                "id": '823003905821769749',
                                "name": 'verified'
                            }
                        }]
                    }
                ]
            };

            let msg = await createMessage(VFChannel, process.env.TOKEN, datamsg);
        }

        // Auto Message Channel
        if (VFChannel) {
            settings.VerificarCanal = VFChannel;
        } else {
            settings.VerificarCanal = null;
        }

        if (VFRole) {
            settings.VerificarCargo = VFRole;
        } else {
            settings.VerificarCargo = null;
        }

        await settings.save().catch(() => { });

        await updateSettings(req);

        // Create a Action Log
        await createLog(req, 'Updated Verification');

        res.render("Dashboard/Moderation/verification", {
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

module.exports = router;