const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate, createMessage } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/sticky", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            stickyDB: stickyDB,
            member: member,
            ch: ch,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/channel", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { channel } = req.body;

        if (channel) {
            stickyDB.channelID = channel;
            stickyDB.enabled = "true";
        } else {
            stickyDB.channelID = '00';
            stickyDB.enabled = "false";
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Channel');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });

        /* if (Object.prototype.hasOwnProperty.call(req.body, 'inEmbedUpdate')) {
            let authorIcon = req.body.leave_author_icon;
            if (authorIcon) {
                stickyDB.embed.author.icon = authorIcon;
                await stickyDB.save().catch(() => { });
            }
    
            let authorName = req.body.leave_author_name;
            if (authorName) {
                stickyDB.embed.author.name = authorName;
                await stickyDB.save().catch(() => { });
            }
    
            let authorURL = req.body.leave_author_url;
            if (authorURL) {
                stickyDB.embed.author.url = authorURL;
                await stickyDB.save().catch(() => { });
            }
    
            let title = req.body.leave_embedTitle;
            if (title) {
                stickyDB.embed.title = title;
                await stickyDB.save().catch(() => { });
            }
    
            let titleURL = req.body.leave_embedTitleURL;
            if (titleURL) {
                stickyDB.embed.titleURL = titleURL;
                await stickyDB.save().catch(() => { });
            }
    
            let description = req.body.leave_embedDescription;
            if (description) {
                stickyDB.embed.description = description;
                await stickyDB.save().catch(() => { });
            }
    
            let thumbnail = req.body.leave_embedThumbnail;
            if (thumbnail) {
                stickyDB.embed.thumbnail = thumbnail;
                await stickyDB.save().catch(() => { });
            }
    
            let footer = req.body.leave_embedFooter;
            if (footer) {
                stickyDB.embed.footer = footer;
                await stickyDB.save().catch(() => { });
            }
    
            let footerIcon = req.body.leave_embedFooterIcon;
            if (footerIcon) {
                stickyDB.embed.footerIcon = footerIcon;
                await stickyDB.save().catch(() => { });
            }
    
            let image = req.body.leave_embedImage;
            if (image) {
                stickyDB.embed.image = image;
                await stickyDB.save().catch(() => { });
            }
    
            let timestamp = req.body.leave_timestamp;
            if (timestamp) {
                stickyDB.embed.timestamp = true;
                await stickyDB.save().catch(() => { });
            } else {
                stickyDB.embed.timestamp = false;
                await stickyDB.save().catch(() => { });
            }
    
            let color = req.body.leave_embedColor;
            if (color) {
                stickyDB.embed.color = color;
                await stickyDB.save().catch(() => { });
            }
    
            // Create a Action Log
            await createLog(req, 'Updated Sticky Embed');
    
            res.render("Dashboard/Utilities/sticky", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                premium: premium,
                member: member,
                stickyDB: stickyDB,
                ch: ch,
                error: '',
                success: 'Saved Settings',
            });
        } */
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/count", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { GiveawayRange } = req.body;

        if (GiveawayRange) {
            stickyDB.msgCount = GiveawayRange;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/author-icon", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { author_icon } = req.body;

        if (author_icon) {
            stickyDB.embed.author.icon = author_icon;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/author-name", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { author_name } = req.body;

        if (author_name) {
            stickyDB.embed.author.name = author_name;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/author-url", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { author_url } = req.body;

        if (author_url) {
            stickyDB.embed.author.url = author_url;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/title", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { embedTitle } = req.body;

        if (embedTitle) {
            stickyDB.embed.title = embedTitle;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/title-url", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { embedTitleURL } = req.body;

        if (embedTitleURL) {
            stickyDB.embed.titleURL = embedTitleURL;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/description", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { embedDescription } = req.body;

        if (embedDescription) {
            stickyDB.embed.description = embedDescription;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/thumbnail", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { embedThumbnail } = req.body;

        if (embedThumbnail) {
            stickyDB.embed.thumbnail = embedThumbnail;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/footer-icon", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { embedFooterIcon } = req.body;

        if (embedFooterIcon) {
            stickyDB.embed.footerURL = embedFooterIcon;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/footer", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { embedFooter } = req.body;

        if (embedFooter) {
            stickyDB.embed.footer = embedFooter;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/image", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { embedImage } = req.body;

        if (embedImage) {
            stickyDB.embed.image = embedImage;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/timestamp", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { timestamp } = req.body;

        if (timestamp) {
            stickyDB.embed.timestamp = timestamp;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/sticky/color", checkAuth, async (req, res, next) => {
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
        const stickyDB = await findOrCreate(req, 'Sticky');
        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { embedColor } = req.body;

        if (embedColor) {
            stickyDB.embed.color = embedColor;
        }

        await stickyDB.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Sticky Count');

        res.render("Dashboard/Utilities/sticky", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            stickyDB: stickyDB,
            ch: ch,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;