const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, findUser, getChannels, getPermissions, findOrCreate, updateSettings, getGuildData } } = require("../../../helpers"),
    { fetch } = require('undici'),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/guild", checkAuth, async (req, res, next) => {
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

        let vanity_in_use = false;

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let publicDB = await findOrCreate(req, 'publicServers-5');

        res.render("Dashboard/settings/guild", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            ch: ch,
            settings: settings,
            publicDB: publicDB,
            premium: premium,
            member: member,
            vanity_in_use: vanity_in_use,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/guild", checkAuth, async (req, res, next) => {
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

        let publicDB = await findOrCreate(req, 'publicServers-5');

        // Check Guild Premium Status
        let premium;
        if (settings.isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        let vanity_in_use = false;

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        const gdata = await getGuildData(req.params.guildID, process.env.TOKEN);

        console.log(req.body)

        if (Object.prototype.hasOwnProperty.call(req.body, 'updateVanity')) {
            let check = await findOrCreate(req.body.vanityURL, 'GuildSettings-1');
            if (check) {
                let vanity_in_use = true;

                return res.render("Dashboard/settings/guild", {
                    translate: req.translate,
                    req: req,
                    user: req.session.user,
                    guild: guild,
                    ch: ch,
                    premium: premium,
                    publicDB: publicDB,
                    member: member,
                    error: 'Uh-oh! That VanityURL is already in use!',
                    success: '',
                    settings: settings,
                    vanity_in_use: vanity_in_use,
                });
            } else {
                if (req.body.vanityURL) {
                    if (!check) {
                        publicDB.vanityURL = req.body.vanityURL;
                    } else {
                        publicDB.vanityURL = null;
                    }

                    publicDB.updates.push({ action: 'Changed VanityURL', date: Date.now() });
                    // Salvando dados no banco de dados
                    await publicDB.save().catch(() => { });

                    return res.render("Dashboard/settings/guild", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        ch: ch,
                        premium: premium,
                        member: member,
                        error: '',
                        success: 'Settings saved successfully!',
                        settings: settings,
                        publicDB: publicDB,
                        vanity_in_use: vanity_in_use,
                    });
                }

                return res.redirect(`/dashboard/${req.params.guildID}/guild`);
            }
        }


        if (Object.prototype.hasOwnProperty.call(req.body, 'vanityRedirect')) {

            if (req.body.vanityRedirect) {
                publicDB.vanityRedirect = req.body.vanityRedirect;
            }
            publicDB.updates.push({ action: 'Changed Vanity Redirect', date: Date.now() });
            // Salvando dados no banco de dados
            await publicDB.save().catch(() => { });

            res.render("Dashboard/settings/guild", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                ch: ch,
                premium: premium,
                publicDB: publicDB,
                member: member,
                error: '',
                success: '',
                settings: settings,
                vanity_in_use: vanity_in_use,
            });
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'toggle') || Object.prototype.hasOwnProperty.call(req.body, 'description') || Object.prototype.hasOwnProperty.call(req.body, 'inviteURL') || Object.prototype.hasOwnProperty.call(req.body, 'defaultInviteChannel') || Object.prototype.hasOwnProperty.call(req.body, 'mainServerLanguage') || Object.prototype.hasOwnProperty.call(req.body, 'youtubeURL') || Object.prototype.hasOwnProperty.call(req.body, 'twitchURL') || Object.prototype.hasOwnProperty.call(req.body, 'twitterURL') || Object.prototype.hasOwnProperty.call(req.body, 'redditURL')) {

            const { description, inviteURL, defaultInviteChannel, mainServerLanguage, categories, tags, youtubeURL, twitchURL, twitterURL, redditURL } = req.body;
            let firstime = [false, req.params.guildID, description, inviteURL, defaultInviteChannel, mainServerLanguage, categories, tags, youtubeURL, twitchURL, twitterURL, redditURL];
            let publicDB = await findOrCreate(firstime, 'publicServers-4');

            publicDB.guildID = req.params.guildID;
            if (description) {
                publicDB.description = description;
                publicDB.updates.push({ action: 'Updated Guild Description', date: Date.now() });
            }
            if (inviteURL) publicDB.inviteURL = inviteURL;
            if (defaultInviteChannel) publicDB.defaultInviteChannel = defaultInviteChannel;
            if (mainServerLanguage) publicDB.mainServerLanguage = mainServerLanguage;
            // if (categories) publicDB.categories = categories;
            // if (tags) publicDB.tags = tags;
            if (youtubeURL) {
                if (youtubeURL.startsWith('https://') || youtubeURL.startsWith('http://')) {
                    let regexYoutube = /(www\.)?youtube\.com\/(channel\/UC[\w-]{21}[AQgw]|(c\/|user\/)?[\w-]+)$/gm;
                    if (youtubeURL.match(regexYoutube)) publicDB.youtubeURL = youtubeURL;
                } else {
                    let regexYoutube = /(www\.)?youtube\.com\/(channel\/UC[\w-]{21}[AQgw]|(c\/|user\/)?[\w-]+)$/gm;
                    if (youtubeURL.match(regexYoutube)) publicDB.youtubeURL = 'https://' + youtubeURL;
                }
            }

            if (twitchURL) {
                if (twitchURL.startsWith('https://') || twitchURL.startsWith('http://')) {
                    let regexTwitch = /^(?:https?:\/\/)?(?:www\.)?(?:twitch\.tv\/)([a-zA-Z0-9_]+)$/;
                    if (twitchURL.match(regexTwitch)) publicDB.twitchURL = twitchURL;
                } else {
                    let regexTwitch = /^(?:https?:\/\/)?(?:www\.)?(?:twitch\.tv\/)([a-zA-Z0-9_]+)$/;
                    if (twitchURL.match(regexTwitch)) publicDB.twitchURL = 'https://' + twitchURL;
                }
            }

            if (twitterURL) {
                if (twitterURL.startsWith('https://') || twitterURL.startsWith('http://')) {
                    let regexTwitter = /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
                    if (twitterURL.match(regexTwitter)) publicDB.twitterURL = twitterURL;
                } else {
                    let regexTwitter = /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
                    if (twitterURL.match(regexTwitter)) publicDB.twitterURL = 'https://' + twitterURL;
                }
            }

            if (redditURL) {
                if (redditURL.startsWith('https://') || redditURL.startsWith('http://')) {
                    publicDB.redditURL = redditURL;
                } else {
                    publicDB.redditURL = 'https://' + redditURL;
                }
            }

            // Salvando dados no banco de dados
            await publicDB.save().catch(() => { });

            res.render("Dashboard/settings/guild", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                publicDB: publicDB,
                ch: ch,
                premium: premium,
                member: member,
                error: '',
                success: '',
                settings: settings,
                vanity_in_use: vanity_in_use,
            });
        }

        publicDB.guildIcon = guild.guild.icon;
        publicDB.guildName = guild.guild.name;
        publicDB.guildCreated = guild.guild.createdTimestamp;
        publicDB.guildMembers = gdata.approximate_member_count;
        await publicDB.save().catch(() => { });

        // Update guilds settings
        await updateSettings(req);

        // Create a Action Log
        await createLog(req, 'Updated guild settings');
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/guild/toggle", checkAuth, async (req, res, next) => {
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

        let publicDB = await findOrCreate(req, 'publicServers-5');

        // Check Guild Premium Status
        let premium;
        if (settings.isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        let vanity_in_use = false;

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        if (req.body.data[0] === "toggle" && req.body.data[1] === "true") {
            publicDB.enabled = true;

            // Salvando dados no banco de dados
            await publicDB.save().catch(() => { });

            res.render("Dashboard/settings/guild", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                publicDB: publicDB,
                ch: ch,
                premium: premium,
                member: member,
                error: '',
                success: '',
                settings: settings,
                vanity_in_use: vanity_in_use,
            });
        } else if (req.body.data[0] === "toggle" && req.body.data[1] === "false") {
            publicDB.enabled = false;

            // Salvando dados no banco de dados
            await publicDB.save().catch(() => { });

            res.render("Dashboard/settings/guild", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                publicDB: publicDB,
                ch: ch,
                premium: premium,
                member: member,
                error: '',
                success: '',
                settings: settings,
                vanity_in_use: vanity_in_use,
            });
        }

        publicDB.guildIcon = guild.guild.icon;
        publicDB.guildName = guild.guild.name;
        publicDB.guildCreated = guild.guild.createdTimestamp;
        await publicDB.save().catch(() => { });

        // Update guilds settings
        await updateSettings(req);

        // Create a Action Log
        await createLog(req, 'Updated guild settings');
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/guild/tags", checkAuth, async (req, res, next) => {
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

        let publicDB = await findOrCreate(req, 'publicServers-5');

        // Check Guild Premium Status
        let premium;
        if (settings.isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        let vanity_in_use = false;

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let tags = Object.keys(req.body);

        if (tags.length === 1) {
            publicDB.tags = Array;

            for (const tag of tags[0].split(',')) {
                publicDB.tags.push(tag);
            }
        } else if (tags.length === 0) {
            publicDB.tags = Array;
        }

        publicDB.guildIcon = guild.guild.icon;
        publicDB.guildName = guild.guild.name;
        publicDB.guildCreated = guild.guild.createdTimestamp;
        await publicDB.save().catch(() => { });

        // Update guilds settings
        await updateSettings(req);

        // Create a Action Log
        await createLog(req, 'Updated guild settings');

        res.render("Dashboard/settings/guild", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            publicDB: publicDB,
            ch: ch,
            premium: premium,
            member: member,
            error: '',
            success: '',
            settings: settings,
            vanity_in_use: vanity_in_use,
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/guild/categories", checkAuth, async (req, res, next) => {
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

        let publicDB = await findOrCreate(req, 'publicServers-5');

        // Check Guild Premium Status
        let premium;
        if (settings.isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        let vanity_in_use = false;

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        if (req.body) {
            publicDB.categories = req.body.categories;
        } else {
            publicDB.categories = Array;
        }

        publicDB.guildIcon = guild.guild.icon;
        publicDB.guildName = guild.guild.name;
        publicDB.guildCreated = guild.guild.createdTimestamp;
        await publicDB.save().catch(() => { });

        // Update guilds settings
        await updateSettings(req);

        // Create a Action Log
        await createLog(req, 'Updated guild settings');

        res.render("Dashboard/settings/guild", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            publicDB: publicDB,
            ch: ch,
            premium: premium,
            member: member,
            error: '',
            success: '',
            settings: settings,
            vanity_in_use: vanity_in_use,
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/guild/sublangs", checkAuth, async (req, res, next) => {
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

        let publicDB = await findOrCreate(req, 'publicServers-5');

        // Check Guild Premium Status
        let premium;
        if (settings.isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        let vanity_in_use = false;

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        if (req.body) {
            publicDB.languages = req.body.sublangs;
        } else {
            publicDB.languages = Array;
        }

        publicDB.guildIcon = guild.guild.icon;
        publicDB.guildName = guild.guild.name;
        publicDB.guildCreated = guild.guild.createdTimestamp;
        await publicDB.save().catch(() => { });

        // Update guilds settings
        await updateSettings(req);

        // Create a Action Log
        await createLog(req, 'Updated guild settings');

        res.render("Dashboard/settings/guild", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            publicDB: publicDB,
            ch: ch,
            premium: premium,
            member: member,
            error: '',
            success: '',
            settings: settings,
            vanity_in_use: vanity_in_use,
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;