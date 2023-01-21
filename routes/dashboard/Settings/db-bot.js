const express = require("express"),
    { var: { createLog, getChannels, findGuild, getUserFromGuild, getPermissions, findOrCreate, updateSettings } } = require("../../../helpers"),
    moment = require('moment'),
    { fetch } = require('undici'),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/bot", checkAuth, async (req, res, next) => {
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

        res.render("Dashboard/settings/bot", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            moment: moment,
            premium: premium,
            member: member,
            ch: ch,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/bot", checkAuth, async (req, res, next) => {
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

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { updch, nickname } = req.body;
        console.log(req.body)

        if (updch) {
            // Updates Channel
            settings.updatesChannel = req.body.updch ?? ch.system.id;
            await settings.save().catch(() => { })

            return res.render("Dashboard/settings/bot", {
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                moment: moment,
                premium: premium,
                member: member,
                ch: ch,
                success: '',
                error: '',
            });
        }

        if (nickname) {
            let newNick = nickname ?? 'Hope';
            let response = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/${req.params.guildID}/update-botname/${newNick}?token=${process.env.API_TOKEN}`, { method: "POST", headers: { "Content-Type": "application/json" } }).then(res => res.json()).catch(e => {
                if (e.code === 'ETIMEDOUT') {
                    return res.redirect("/dashboard");
                }
            });

            if (response.message === undefined) {
                return res.render("Dashboard/settings/bot", {
                    req: req,
                    user: req.session.user,
                    guild: guild,
                    settings: settings,
                    moment: moment,
                    premium: premium,
                    member: member,
                    ch: ch,
                    success: '',
                    error: 'Uh-oh! Some problem happened, please try again (Error code: 4000).',
                });
            }

            // Code 4001 == Guild in Cooldown
            if (response.message === '4001') {
                return res.render("Dashboard/settings/bot", {
                    req: req,
                    user: req.session.user,
                    guild: guild,
                    settings: settings,
                    moment: moment,
                    premium: premium,
                    member: member,
                    ch: ch,
                    success: '',
                    error: 'You\'re doing it too fast, try again in a few seconds!',
                });
            } else
                // Code 4002 == Nick length < 1
                if (response.message === '4002') {
                    return res.render("Dashboard/settings/bot", {
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        settings: settings,
                        moment: moment,
                        premium: premium,
                        member: member,
                        ch: ch,
                        success: '',
                        error: 'Uh-oh! Nick cannot be less than 2 characters.',
                    });
                }

            return res.redirect(`/dashboard/${req.params.guildID}/bot`);
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'prefix')) {
            // Prefix
            try {
                let prefix = req.body.prefix.replace(/ /g, "");
                if (!prefix) prefix = settings.prefix;
                settings.prefix = prefix;
                await settings.save().catch(() => { })


                return res.render("Dashboard/settings/bot", {
                    req: req,
                    user: req.session.user,
                    guild: guild,
                    settings: settings,
                    moment: moment,
                    premium: premium,
                    member: member,
                    ch: ch,
                    success: '',
                    error: '',
                });
            } catch (err) {
                console.log(err);
                // send webhook error to support server
            }
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'lang')) {
            // Language
            if (req.body.lang) {
                const languages = ["en-US", "pt-BR", "fr-FR", "th-TH", "it-IT", "de-DE", "es-ES", "ru-RU", "zh-CN", "ko-KO", "pl-PL", "ja-JA", "nl-NL"];
                const language = req.body.lang;
                if (!language) language = "en-US";
                if (!languages.includes(language)) language = "en-US";

                settings.Language = language;
                await settings.save().catch(() => { })

                return res.render("Dashboard/settings/bot", {
                    req: req,
                    user: req.session.user,
                    guild: guild,
                    settings: settings,
                    moment: moment,
                    premium: premium,
                    member: member,
                    ch: ch,
                    success: '',
                    error: '',
                });
            }
        }

        // Update guilds settings
        await updateSettings(req);

        // Create a Action Log
        await createLog(req, 'Updated bot settings');

        return res.render("Dashboard/settings/bot", {
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            moment: moment,
            premium: premium,
            member: member,
            ch: ch,
            success: '',
            error: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/bot/antipollution", checkAuth, async (req, res, next) => {
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

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // ANTI POLLUTION
        if (req.body.data[0] === "ad" && req.body.data[1] === "true") {
            // console.log('Auto delete commands', req.body.data[0])
            settings.ModerationClearToggle = true;
            await settings.save().catch(() => { })

            return res.render("Dashboard/settings/bot", {
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                moment: moment,
                premium: premium,
                member: member,
                ch: ch,
                success: '',
                error: '',
            });
        } else if (req.body.data[0] === "ad" && req.body.data[1] === "false") {
            // console.log('Auto delete commands', req.body.data[0])
            settings.ModerationClearToggle = false;
            await settings.save().catch(() => { })

            return res.render("Dashboard/settings/bot", {
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                moment: moment,
                premium: premium,
                member: member,
                ch: ch,
                success: '',
                error: '',
            });
        }

        if (req.body.data[0] === "adr" && req.body.data[1] === "true") {
            // console.log('Auto delete replys', req.body.data[0])
            settings.ModerationClearReplyToggle = true;
            await settings.save().catch(() => { })

            return res.render("Dashboard/settings/bot", {
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                moment: moment,
                premium: premium,
                member: member,
                ch: ch,
                success: '',
                error: '',
            });
        } else if (req.body.data[0] === "adr" && req.body.data[1] === "false") {
            // console.log('Auto delete replys', req.body.data[0])
            settings.ModerationClearReplyToggle = false;
            await settings.save().catch(() => { })

            return res.render("Dashboard/settings/bot", {
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                moment: moment,
                premium: premium,
                member: member,
                ch: ch,
                success: '',
                error: '',
            });
        }

        // Update guilds settings
        await updateSettings(req);

        // Create a Action Log
        await createLog(req, 'Updated bot settings');

        return res.render("Dashboard/settings/bot", {
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            moment: moment,
            premium: premium,
            member: member,
            ch: ch,
            success: '',
            error: '',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;