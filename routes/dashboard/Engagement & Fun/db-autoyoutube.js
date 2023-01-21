const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate, findAndDelete } } = require("../../../helpers"),
    Parser = require('rss-parser'),
    parser = new Parser(),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/auto-youtube", checkAuth, async (req, res, next) => {
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
        const dbYoutube = await findOrCreate(req, 'AutoYoutube');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Engagement & Fun/auto-youtube", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            dbYoutube: dbYoutube,
            ch: ch,
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/auto-youtube", checkAuth, async (req, res, next) => {
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
        const dbYoutube = await findOrCreate(req, 'AutoYoutube');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        if (Object.prototype.hasOwnProperty.call(req.body, 'ytchanneltopost') && Object.prototype.hasOwnProperty.call(req.body, 'ytname') && Object.prototype.hasOwnProperty.call(req.body, 'YTcustomMessageAdd') || Object.prototype.hasOwnProperty.call(req.body, 'removeyt')) {
            const checkCustomMessage = req.body.YTcustomMessageAdd;
            if (!checkCustomMessage) {
                dbYoutube.customMsg = null
            } else {
                dbYoutube.customMsg = req.body.YTcustomMessageAdd;
            }

            let YoutubeChannel = req.body.ytchanneltopost;

            if (YoutubeChannel) {
                dbYoutube.channelID = req.body.ytchanneltopost;
            } else {
                dbYoutube.channelID = null;
            }

            let ytch = req.body.ytname;
            if (ytch) {
                if (ytch.startsWith('UC')) {
                    let feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${ytch}`);
                    if (feed) {
                        if (settings.isPremium === "false" && dbYoutube.canais.length >= 10) {
                            // msg error?
                        } else {
                            const canais = dbYoutube.canais;
                            if (canais.includes(ytch)) {
                                // msg canal ja add
                            } else {
                                dbYoutube.canais.push(ytch)
                                dbYoutube.lastVideoID.push(feed.items[0].id)
                                // msg canal add com sucesso
                            }
                        }
                    }
                } else if (!ytch.startsWith('UC')) {
                    let feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?user=${ytch}`);
                    if (feed) {
                        if (settings.isPremium === "false" && dbYoutube.canais.length >= 10) {
                            // msg nao premium
                        } else {
                            const canais = dbYoutube.canais;
                            if (canais.includes(ytch)) {
                                // msg canal ja add
                            } else {
                                dbYoutube.canais.push(ytch)
                                dbYoutube.lastVideoID.push(feed.items[0].id)
                                // msg canal add com sucesso
                            }
                        }
                    } else {
                        // msg error?
                    }
                }
            }
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'removeyt')) {
            const checkRR = req.body.removeyt;
            console.log(checkRR)
            const array = dbYoutube.canais;
            console.log(array)

            if (checkRR) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === checkRR) {
                        array.splice(i, 1);
                    }
                }
                await dbYoutube.save().catch(() => { })
            }
        }

        // Create a Action Log
        await createLog(req, 'Updated Auto-Youtube');

        await dbYoutube.save().catch(() => { })

        return res.render("Dashboard/Engagement & Fun/auto-youtube", {
            req: req,
            user: req.session.user,
            guild: guild,
            isPremium: isPremium,
            premium: premium,
            member: member,
            dbYoutube: dbYoutube,
            ch: ch,
            rr: rr,
            error: 'Saved changes',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;