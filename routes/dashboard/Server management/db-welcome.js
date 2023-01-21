const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate, findAndDelete } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/welcome", checkAuth, async (req, res, next) => {
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
        // const welcomeSettings = await findOrCreate(req, 'welcomeDB');
        const welcomeAddon = await findOrCreate(req, 'welcome');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Server Management/welcome", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            welcome: welcomeAddon,
            ch: ch,
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/welcome", checkAuth, async (req, res, next) => {
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
        // const welcomeSettings = await findOrCreate(req, 'welcomeDB');
        const welcomeAddon = await findOrCreate(req, 'welcome');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        const { welcomeChannel, leaveChannel } = req.body;

        // WELCOME CHANNEL
        if (Object.prototype.hasOwnProperty.call(req.body, 'welcomeChannel')) {
            if (welcomeChannel) {
                welcomeAddon.welcomeChannel = welcomeChannel;
                await welcomeAddon.save().catch(() => { });
            }

            // Create a Action Log
            await createLog(req, 'Updated Welcome channel');

            res.render("Dashboard/Server Management/welcome", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                premium: premium,
                member: member,
                welcome: welcomeAddon,
                ch: ch,
                rr: rr,
                error: '',
                success: 'Saved Settings',
            });
        }

        // LEAVE CHANNEL
        if (Object.prototype.hasOwnProperty.call(req.body, 'leaveChannel')) {
            if (leaveChannel) {
                welcomeAddon.leaveChannel = leaveChannel;
                await welcomeAddon.save().catch(() => { });
            }

            // Create a Action Log
            await createLog(req, 'Updated Leave channel');

            res.render("Dashboard/Server Management/welcome", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                premium: premium,
                member: member,
                welcome: welcomeAddon,
                ch: ch,
                rr: rr,
                error: '',
                success: 'Saved Settings',
            });
        }

        // WELCOME MESSAGE SETTINGS
        if (Object.prototype.hasOwnProperty.call(req.body, 'inTextUpdate')) {
            let textMessage = req.body.inText;
            if (textMessage) {
                welcomeAddon.welcomeMessageText = textMessage;
                welcomeAddon.messageType = "message";
                await welcomeAddon.save().catch(() => { });
            }


            // Create a Action Log
            await createLog(req, 'Updated Welcome Text Messag');

            res.render("Dashboard/Server Management/welcome", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                premium: premium,
                member: member,
                welcome: welcomeAddon,
                ch: ch,
                rr: rr,
                error: '',
                success: 'Saved Settings',
            });
        }

        // WELCOME EMBED SETTINGS
        if (Object.prototype.hasOwnProperty.call(req.body, 'inEmbedUpdate')) {
            // Define o modo
            welcomeAddon.messageType = "embed";
            await welcomeAddon.save().catch(() => { });

            let authorIcon = req.body.leave_author_icon;
            if (authorIcon) {
                welcomeAddon.welcomeEmbed.author.icon = authorIcon;
                await welcomeAddon.save().catch(() => { });
            }

            let authorName = req.body.leave_author_name;
            if (authorName) {
                welcomeAddon.welcomeEmbed.author.name = authorName;
                await welcomeAddon.save().catch(() => { });
            }

            let authorURL = req.body.leave_author_url;
            if (authorURL) {
                welcomeAddon.welcomeEmbed.author.url = authorURL;
                await welcomeAddon.save().catch(() => { });
            }

            let title = req.body.leave_embedTitle;
            if (title) {
                welcomeAddon.welcomeEmbed.title = title;
                await welcomeAddon.save().catch(() => { });
            }

            let titleURL = req.body.leave_embedTitleURL;
            if (titleURL) {
                welcomeAddon.welcomeEmbed.titleURL = titleURL;
                await welcomeAddon.save().catch(() => { });
            }

            let description = req.body.leave_embedDescription;
            if (description) {
                welcomeAddon.welcomeEmbed.description = description;
                await welcomeAddon.save().catch(() => { });
            }

            let thumbnail = req.body.leave_embedThumbnail;
            if (thumbnail) {
                welcomeAddon.welcomeEmbed.thumbnail = thumbnail;
                await welcomeAddon.save().catch(() => { });
            }

            let footer = req.body.leave_embedFooter;
            if (footer) {
                welcomeAddon.welcomeEmbed.footer = footer;
                await welcomeAddon.save().catch(() => { });
            }

            let footerIcon = req.body.leave_embedFooterIcon;
            if (footerIcon) {
                welcomeAddon.welcomeEmbed.footerIcon = footerIcon;
                await welcomeAddon.save().catch(() => { });
            }

            let image = req.body.leave_embedImage;
            if (image) {
                welcomeAddon.welcomeEmbed.image = image;
                await welcomeAddon.save().catch(() => { });
            }

            let timestamp = req.body.leave_timestamp;
            if (timestamp) {
                welcomeAddon.welcomeEmbed.timestamp = true;
                await welcomeAddon.save().catch(() => { });
            } else {
                welcomeAddon.welcomeEmbed.timestamp = false;
                await welcomeAddon.save().catch(() => { });
            }

            let color = req.body.leave_embedColor;
            if (color) {
                welcomeAddon.welcomeEmbed.color = color;
                await welcomeAddon.save().catch(() => { });
            }


            // Create a Action Log
            await createLog(req, 'Updated Welcome Embed Message');

            res.render("Dashboard/Server Management/welcome", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                premium: premium,
                member: member,
                welcome: welcomeAddon,
                ch: ch,
                rr: rr,
                error: '',
                success: 'Saved Settings',
            });
        }

        // WELCOME IMAGE SETTINGS
        if (Object.prototype.hasOwnProperty.call(req.body, 'inImageUpdate')) {
            // Define o modo
            welcomeAddon.messageType = "image";
            await welcomeAddon.save().catch(() => { });

            let imageTitle = req.body.inImageTitle;
            if (imageTitle) {
                welcomeAddon.welcomeImageTitle = imageTitle;
                await welcomeAddon.save().catch(() => { });
            }

            let imageSub = req.body.inImageSub;
            if (imageSub) {
                welcomeAddon.welcomeImageSub = imageSub;
                await welcomeAddon.save().catch(() => { });
            }

            let imageTextColor = req.body.welcomeImageTextColor;
            if (imageTextColor) {
                welcomeAddon.welcomeImageTextColor = imageTextColor;
                await welcomeAddon.save().catch(() => { });
            }

            let cardColor = req.body.card;
            if (cardColor) {
                welcomeAddon.welcomeImageColor = `../../cards/${cardColor}.png`;
                await welcomeAddon.save().catch(() => { });
            }

            function validateURL(url) {
                //URL starting with http://, https://, or www.
                var regex = /^((https?:\/\/(www\.)?|www\.)[a-zA-Z0-9][\w+\d+&@\-#\/%?=~_|!:,.;+]*)$/gi;
                return regex.test(url);
            }

            let CustomBG = req.body.inImageCustomBG;
            if (CustomBG) {
                if (validateURL(CustomBG) && CustomBG.endsWith(".jpeg") || CustomBG.endsWith(".jpg") || CustomBG.endsWith(".png") || CustomBG.endsWith(".gif") || CustomBG.endsWith(".webp")) {
                    welcomeAddon.welcomeImageColor = null;
                    welcomeAddon.welcomeImageModel = CustomBG;
                    await welcomeAddon.save().catch(() => { });
                } else {
                    welcomeAddon.welcomeImageModel = null;
                    await welcomeAddon.save().catch(() => { });

                    return res.render("Dashboard/Server Management/welcome", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        settings: settings,
                        premium: premium,
                        member: member,
                        welcome: welcomeAddon,
                        ch: ch,
                        rr: rr,
                        error: 'Oops! Link ou Formato da imagem invalido! Tente novamente ou contacte o suporte.',
                        success: '',
                    });
                }
            } else {
                welcomeAddon.welcomeImageModel = null;
                await welcomeAddon.save().catch(() => { });
            }

            // Create a Action Log
            await createLog(req, 'Updated Welcome Image Message');

            res.render("Dashboard/Server Management/welcome", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                premium: premium,
                member: member,
                welcome: welcomeAddon,
                ch: ch,
                rr: rr,
                error: '',
                success: 'Saved Settings',
            });
        }

        // WELCOME MESSAGE SETTINGS
        if (Object.prototype.hasOwnProperty.call(req.body, 'inTextUpdate2')) {
            // Define o modo
            welcomeAddon.leaveMessageType = "message";
            await welcomeAddon.save().catch(() => { });

            let textMessage = req.body.inText2;
            if (textMessage) {
                welcomeAddon.leaveMessageText = textMessage;
                await welcomeAddon.save().catch(() => { });
            }

            // Create a Action Log
            await createLog(req, 'Updated Leave Text Message');

            res.render("Dashboard/Server Management/welcome", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                premium: premium,
                member: member,
                welcome: welcomeAddon,
                ch: ch,
                rr: rr,
                error: '',
                success: 'Saved Settings',
            });
        }

        // WELCOME EMBED SETTINGS
        if (Object.prototype.hasOwnProperty.call(req.body, 'inEmbedUpdate2')) {
            // Define o modo
            welcomeAddon.leaveMessageType = "embed";
            await welcomeAddon.save().catch(() => { });

            let authorIcon = req.body.leave_author_icon2;
            if (authorIcon) {
                welcomeAddon.leaveEmbed.author.icon2 = authorIcon;
                await welcomeAddon.save().catch(() => { });
            }

            let authorName = req.body.leave_author_name2;
            if (authorName) {
                welcomeAddon.leaveEmbed.author.name = authorName;
                await welcomeAddon.save().catch(() => { });
            }

            let authorURL = req.body.leave_author_url2;
            if (authorURL) {
                welcomeAddon.leaveEmbed.author.url = authorURL;
                await welcomeAddon.save().catch(() => { });
            }

            let title = req.body.leave_embedTitle2;
            if (title) {
                welcomeAddon.leaveEmbed.title = title;
                await welcomeAddon.save().catch(() => { });
            }

            let titleURL = req.body.leave_embedTitleURL2;
            if (titleURL) {
                welcomeAddon.leaveEmbed.titleURL = titleURL;
                await welcomeAddon.save().catch(() => { });
            }

            let description = req.body.leave_embedDescription2;
            if (description) {
                welcomeAddon.leaveEmbed.description = description;
                await welcomeAddon.save().catch(() => { });
            }

            let thumbnail = req.body.leave_embedThumbnail2;
            if (thumbnail) {
                welcomeAddon.leaveEmbed.thumbnail = thumbnail;
                await welcomeAddon.save().catch(() => { });
            }

            let footer = req.body.leave_embedFooter2;
            if (footer) {
                welcomeAddon.leaveEmbed.footer = footer;
                await welcomeAddon.save().catch(() => { });
            }

            let footerIcon = req.body.leave_embedFooterIcon2;
            if (footerIcon) {
                welcomeAddon.leaveEmbed.footerIcon = footerIcon;
                await welcomeAddon.save().catch(() => { });
            }

            let image = req.body.leave_embedImage2;
            if (image) {
                welcomeAddon.leaveEmbed.image = image;
                await welcomeAddon.save().catch(() => { });
            }

            let timestamp = req.body.leave_timestamp2;
            if (timestamp) {
                welcomeAddon.leaveEmbed.timestamp = true;
                await welcomeAddon.save().catch(() => { });
            } else {
                welcomeAddon.leaveEmbed.timestamp = false;
                await welcomeAddon.save().catch(() => { });
            }

            let color = req.body.leave_embedColor2;
            if (color) {
                welcomeAddon.leaveEmbed.color = color;
                await welcomeAddon.save().catch(() => { });
            }

            // Create a Action Log
            await createLog(req, 'Updated Leave Embed Message');

            res.render("Dashboard/Server Management/welcome", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                premium: premium,
                member: member,
                welcome: welcomeAddon,
                ch: ch,
                rr: rr,
                error: '',
                success: 'Saved Settings',
            });
        }

        // WELCOME EMBED SETTINGS
        if (Object.prototype.hasOwnProperty.call(req.body, 'inImageUpdate2')) {
            // Define o modo
            welcomeAddon.leaveMessageType = "image";
            await welcomeAddon.save().catch(() => { });

            let imageTitle = req.body.inImageTitle2;
            if (imageTitle) {
                welcomeAddon.leaveImageTitle = imageTitle;
                await welcomeAddon.save().catch(() => { });
            }

            let imageSub = req.body.inImageSub2;
            if (imageSub) {
                welcomeAddon.leaveImageSub = imageSub;
                await welcomeAddon.save().catch(() => { });
            }

            let imageTextColor = req.body.leaveImageTextColor;
            if (imageTextColor) {
                welcomeAddon.leaveImageTextColor = imageTextColor;
                await welcomeAddon.save().catch(() => { });
            }

            let cardColor = req.body.card2;
            if (cardColor) {
                welcomeAddon.leaveImageColor = `../../cards/${cardColor}.png`;
                await welcomeAddon.save().catch(() => { });
            }

            function validateURL(url) {
                //URL starting with http://, https://, or www.
                var regex = /^((https?:\/\/(www\.)?|www\.)[a-zA-Z0-9][\w+\d+&@\-#\/%?=~_|!:,.;+]*)$/gi;
                return regex.test(url);
            }

            let CustomBG = req.body.inImageCustomBG2;
            if (CustomBG) {
                if (validateURL(CustomBG) && CustomBG.endsWith(".jpeg") || CustomBG.endsWith(".jpg") || CustomBG.endsWith(".png") || CustomBG.endsWith(".gif") || CustomBG.endsWith(".webp")) {
                    welcomeAddon.leaveImageColor = null;
                    welcomeAddon.leaveImageModel = CustomBG;
                    await welcomeAddon.save().catch(() => { });
                } else {
                    welcomeAddon.leaveImageModel = null;
                    await welcomeAddon.save().catch(() => { });

                    return res.render("Dashboard/Server Management/welcome", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        settings: settings,
                        premium: premium,
                        member: member,
                        welcome: welcomeAddon,
                        ch: ch,
                        rr: rr,
                        error: 'Oops! Link ou Formato da imagem invalido! Tente novamente ou contacte o suporte.',
                        success: '',
                    });
                }
            } else {
                welcomeAddon.leaveImageModel = null;
                await welcomeAddon.save().catch(() => { });
            }

            // Create a Action Log
            await createLog(req, 'Updated Leave Image Message');

            res.render("Dashboard/Server Management/welcome", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                settings: settings,
                premium: premium,
                member: member,
                welcome: welcomeAddon,
                ch: ch,
                rr: rr,
                error: '',
                success: 'Saved Settings',
            });
        }
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/welcome/private", checkAuth, async (req, res, next) => {
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
        // const welcomeSettings = await findOrCreate(req, 'welcomeDB');
        const welcomeAddon = await findOrCreate(req, 'welcome');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        // Welcome Settings
        if (req.body.welcomePrivate == 'on') {
            welcomeAddon.welcomePrivateToggle = true;
        } else {
            welcomeAddon.welcomePrivateToggle = false;
        }

        await welcomeAddon.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Welcome Settings');

        res.render("Dashboard/Server Management/welcome", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            welcome: welcomeAddon,
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/welcome/leave-private", checkAuth, async (req, res, next) => {
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
        // const welcomeSettings = await findOrCreate(req, 'welcomeDB');
        const welcomeAddon = await findOrCreate(req, 'welcome');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        // Welcome Settings
        if (req.body.leavePrivate == 'on') {
            welcomeAddon.leavePrivateToggle = true;
        } else {
            welcomeAddon.leavePrivateToggle = false;
        }

        await welcomeAddon.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Leave Settings');

        res.render("Dashboard/Server Management/welcome", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            welcome: welcomeAddon,
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/welcome/welcome-toggle", checkAuth, async (req, res, next) => {
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
        // const welcomeSettings = await findOrCreate(req, 'welcomeDB');
        const welcomeAddon = await findOrCreate(req, 'welcome');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        // Welcome Settings
        if (req.body.welcomeToggle) {
            welcomeAddon.welcomeToggle = true;
        } else {
            welcomeAddon.welcomeToggle = false;
        }

        await welcomeAddon.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Leave Settings');

        res.render("Dashboard/Server Management/welcome", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            welcome: welcomeAddon,
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/welcome/leave-toggle", checkAuth, async (req, res, next) => {
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
        // const welcomeSettings = await findOrCreate(req, 'welcomeDB');
        const welcomeAddon = await findOrCreate(req, 'welcome');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        // Welcome Settings
        if (req.body.leaveToggle) {
            welcomeAddon.leaveToggle = true;
        } else {
            welcomeAddon.leaveToggle = false;
        }

        await welcomeAddon.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Leave Settings');

        res.render("Dashboard/Server Management/welcome", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            welcome: welcomeAddon,
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/welcome/notify", checkAuth, async (req, res, next) => {
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
        // const welcomeSettings = await findOrCreate(req, 'welcomeDB');
        const welcomeAddon = await findOrCreate(req, 'welcome');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        // Welcome Settings
        if (req.body.notify) {
            welcomeAddon.welcomeNotifyMention = true;
        } else {
            welcomeAddon.welcomeNotifyMention = false;
        }

        await welcomeAddon.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Welcome Settings');

        res.render("Dashboard/Server Management/welcome", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            welcome: welcomeAddon,
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/welcome/leave-notify", checkAuth, async (req, res, next) => {
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
        // const welcomeSettings = await findOrCreate(req, 'welcomeDB');
        const welcomeAddon = await findOrCreate(req, 'welcome');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        // Welcome Settings
        if (req.body.leavenotify) {
            welcomeAddon.leaveNotifyMention = true;
        } else {
            welcomeAddon.leaveNotifyMention = false;
        }

        await welcomeAddon.save().catch(() => { });
        // Create a Action Log
        await createLog(req, 'Updated Leave Settings');

        res.render("Dashboard/Server Management/welcome", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            welcome: welcomeAddon,
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;