const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate, findAndDelete } } = require("../../../helpers"),
    { discordAPI: { getKey } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/auto-twitch", checkAuth, async (req, res, next) => {
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
        const dbTwitch = await findOrCreate(req, 'AutoTwitch');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Engagement & Fun/auto-twitch", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            isPremium: isPremium,
            premium: premium,
            member: member,
            dbTwitch: dbTwitch,
            ch: ch,
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/auto-twitch", checkAuth, async (req, res, next) => {
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
        const dbTwitch = await findOrCreate(req, 'AutoTwitch');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        for (var i = 0; i < 999; i++) {
            if (Object.prototype.hasOwnProperty.call(req.body, 'update' + [i])) {
                let canal = req.body[`${[i]}channel`];
                let message = req.body[`${[i]}msg`];
                let discord = req.body[`${[i]}dsc`];
                let role = req.body[`${[i]}role`];
                let find = req.body[[i]];

                // conectando ao banco de dados
                const dbTwitch1 = await findOrCreate(req.params.guildID, 'AutoTwitch-Find', find);

                // Streamer Channel
                if (canal) {
                    dbTwitch1.ChannelToPost = canal;
                    dbTwitch1.enabled = "true";
                } else {
                    dbTwitch1.enabled = "false";
                    dbTwitch1.ChannelToPost = null;
                }

                // custom message
                if (message) {
                    dbTwitch1.customMsg = message;
                } else {
                    dbTwitch1.customMsg = null;
                }

                // Discord Server
                if (discord) {
                    dbTwitch1.DiscordServer = discord;
                } else {
                    dbTwitch1.DiscordServer = null;
                }

                // Role Notify
                const checkRole = role;
                if (checkRole) {
                    dbTwitch1.roleNotify = role;
                } else {
                    dbTwitch1.roleNotify = null;
                }

                // Salvando dados no banco de dados
                await dbTwitch1.save().catch(() => { })
                res.redirect(`/dashboard/${req.params.guildID}/auto-twitch`)
            }
        }

        for (var i = 0; i < 999; i++) {
            if (Object.prototype.hasOwnProperty.call(req.body, 'del' + [i])) {
                let find = req.body[[i]];

                if (find) {
                    await findAndDelete(req, 'AutoTwitch', find);
                }

                res.redirect(`/dashboard/${req.params.guildID}/auto-twitch`)
            }
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'addstreamer')) {

            if (!req.body.streamername) {
                res.render("Dashboard/Engagement & Fun/auto-twitch", {
                    translate: req.translate,
                    req: req,
                    user: req.session.user,
                    guild: guild,
                    isPremium: isPremium,
                    premium: premium,
                    member: member,
                    dbTwitch: dbTwitch,
                    ch: ch,
                    rr: rr,
                    error: 'Please, it is necessary to inform the Streamer name!',
                    success: '',
                });
                return;
            }

            // custom message
            const checkCustomMessage = req.body.customMessageAdd;
            let msg;
            if (checkCustomMessage) {
                msg = req.body.customMessageAdd;
            } else {
                msg = null;
            }

            // Discord Server
            const checkDiscord = req.body.dscserveradd;
            let dsc;
            if (checkDiscord) {
                dsc = req.body.dscserveradd;
            } else {
                dsc = null;
            }

            // Role Notify
            const checkRole = req.body.rolenotifyAdd;
            let rn;
            if (checkRole) {
                if (checkRole === 'none') {
                    rn = null;
                } else {
                    rn = req.body.rolenotifyAdd;
                }
            } else {
                rn = null;
            }

            // Twitch Channel
            let channel;
            const TwitchChannel = req.body.channeltopost;
            if (TwitchChannel) {
                channel = TwitchChannel;
            }

            // Streamers
            const igStreamer = req.body.streamername;
            let chan;
            if (igStreamer) {
                chan = req.body.streamername;
            } else {
                chan = null;
            }

            if (isPremium === false) {
                if (dbTwitch.length > 10) {
                    return res.render("Dashboard/Engagement & Fun/auto-twitch", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        isPremium: isPremium,
                        premium: premium,
                        member: member,
                        dbTwitch: dbTwitch,
                        ch: ch,
                        rr: rr,
                        error: 'Streamers length exceeds 10',
                        success: '',
                    });
                }

            } else if (isPremium === true) {
                if (dbTwitch !== null && dbTwitch.length > 50) {
                    return res.render("Dashboard/Engagement & Fun/auto-twitch", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        isPremium: isPremium,
                        premium: premium,
                        member: member,
                        dbTwitch: dbTwitch,
                        ch: ch,
                        rr: rr,
                        error: 'Streamers length exceeds 50',
                        success: '',
                    });
                }
            }

            if (igStreamer) {
                chan = req.body.streamername;
            } else {
                chan = null;
            }

            //get the auth key
            const authKey = await getKey(process.env.API_TWITCH_CLIENT_ID, process.env.API_TWITCH_SECRECT_ID);
            if (!authKey) return;

            let data = [req.params.guildID, chan, dsc, channel, authKey, msg, rn];
            await findOrCreate(data, 'AutoTwitch-New');
            res.redirect(`/dashboard/${req.params.guildID}/auto-twitch`);
        }

        // Create a Action Log
        await createLog(req, 'Updated Auto-Twitch');
    } catch (error) {
        next(error)
    }
});

module.exports = router;