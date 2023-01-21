const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getGuildData, getChannels, genID, getRoles, getPermissions, findOrCreate, createMessage, putEmoji, findEmoji } } = require("../../../helpers"),
    { ticketEmbedSchema } = require("../../../database/models"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/ticket", checkAuth, async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findGuild(req, res);
        // if (guild && guild.code === 'ETIMEDOUT') return res.redirect("/dashboard"); 
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild id=${req.params.guildID}`);
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
        const ticketSettings = await findOrCreate(req, 'ticketEmbedSchema');
        // Get Guild Data for emojis
        const data = await getGuildData(req.params.guildID, process.env.TOKEN);

        var lista = [];
        for (const emote of data.emojis) {
            lista.push({ data: 'data:ready', emoji: emote.name, label: emote.id, tags: ['servidor'], url: `https://cdn.discordapp.com/emojis/${emote.id}.webp?size=128&quality=lossless` });
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Server Management/ticket", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            ticket: ticketSettings,
            emotes: lista,
            ch: ch,
            rr: rr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/ticket", checkAuth, async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findGuild(req, res);
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild id=${req.params.guildID}`);
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
        const ticketSettings = await findOrCreate(req, 'ticketEmbedSchema');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        const { toggle, ticketLogsChannel, ticketCategory, ticketSupportRole, ticketLimit, nameType, ticketEveryone, ticketClose } = req.body;

        if (Object.prototype.hasOwnProperty.call(req.body, "resetTicket")) {

            await ticketSettings.deleteOne().catch(() => { })

            const newSettings = new ticketEmbedSchema({
                tembedsID: guild.id,
            });

            const newDB = await findOrCreate(req, 'ticketEmbedSchema');

            newDB.ticketType = "reaction";
            await newDB.save().catch(() => { });

            // Create a Action Log
            await createLog(req, "Wiped Ticket");

            res.render("Dashboard/Server Management/ticket", {
                req: req,
                user: req.session.user,
                guild: guild,
                premium: premium,
                member: member,
                ticket: ticketSettings,
                emotes: '',
                ch: ch,
                rr: rr,
                error: '',
                success: 'Database successfully reset',
            });
        } else {
            // TOGGLE
            if (toggle) {
                ticketSettings.ticketToggle = true;
                await ticketSettings.save().catch(() => { });
            } else {
                ticketSettings.ticketToggle = false;
                await ticketSettings.save().catch(() => { });
            }

            // LOGS CHANNEL
            if (ticketLogsChannel) {
                ticketSettings.ticketModlogID = ticketLogsChannel;
            } else {
                ticketSettings.ticketToggle = false;
                ticketSettings.ticketModlogID = null;
            }

            // TICKET CATEGORY
            if (ticketCategory) {
                ticketSettings.categoryID = ticketCategory;
            } else {
                ticketSettings.ticketToggle = false;
                ticketSettings.categoryID = null;
            }

            // SUPPORT ROLE
            if (ticketSupportRole) {
                ticketSettings.supportRoleID = ticketSupportRole;
            } else {
                ticketSettings.ticketToggle = false;
                ticketSettings.supportRoleID = null;
            }

            // TICKET MAX CREATE PER USER
            if (ticketLimit) {
                let numbers = ['1', '2', '3', '4', '5'];
                if (!numbers.includes(ticketLimit)) {
                    return;
                }

                ticketSettings.maxTicket = ticketLimit;
            } else {
                ticketSettings.ticketToggle = false;
                ticketSettings.maxTicket = '1';
            }

            // Name Type
            if (nameType === "1") {
                ticketSettings.ticketNameType = 1;
            } else {
                ticketSettings.ticketNameType = 2;
            }

            // TICKET PING @EVERYONE
            if (ticketEveryone) {
                ticketSettings.ticketPing = true;
            } else {
                ticketSettings.ticketPing = false;
            }

            // TICKET CLOSE DATA
            if (isPremium == "false") {
                ticketSettings.ticketClose = true;
            } else {
                if (ticketClose) {
                    ticketSettings.ticketClose = true;
                } else {
                    ticketSettings.ticketClose = false;
                }
            }

            await ticketSettings.save().catch(() => { });

            // Create a Action Log
            await createLog(req, 'Updated Ticket Settings');

            res.render("Dashboard/Server Management/ticket", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                premium: premium,
                member: member,
                ticket: ticketSettings,
                emotes: '',
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

router.post("/dashboard/:guildID/ticket/room-message", checkAuth, async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findGuild(req, res);
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild id=${req.params.guildID}`);
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
        const ticketSettings = await findOrCreate(req, 'ticketEmbedSchema');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        const { author_icon, author_name, author_url, embedTitle, embedTitleURL, embedDescription, embedThumbnail, footerIcon, embedFooter, embedImage, embedColor, timestamp } = req.body;

        // AUTHOR EMBED
        if (author_icon) {
            ticketSettings.embedticket.author.icon = author_icon;
        } else {
            ticketSettings.embedticket.author.icon = null;
        }
        if (author_name) {
            ticketSettings.embedticket.author.name = author_name;
        } else {
            ticketSettings.embedticket.author.name = null;
        }
        if (author_url) {
            ticketSettings.embedticket.author.url = author_url;
        } else {
            ticketSettings.embedticket.author.url = null;
        }
        // TITLE EMBED
        if (embedTitle) {
            ticketSettings.embedticket.title = embedTitle;
        } else {
            ticketSettings.embedticket.title = null;
        }
        if (embedTitleURL) {
            ticketSettings.embedticket.titleURL = embedTitleURL;
        } else {
            ticketSettings.embedticket.titleURL = null;
        }
        // DESCRIPTION EMBED
        if (embedDescription) {
            ticketSettings.embedticket.description = embedDescription;
        } else {
            ticketSettings.embedticket.description = null;
        }
        // THUMBNAIL EMBED
        if (embedThumbnail) {
            ticketSettings.embedticket.thumbnail = embedThumbnail;
        } else {
            ticketSettings.embedticket.thumbnail = null;
        }
        // FOOTER EMBED
        if (footerIcon) {
            ticketSettings.embedticket.footerIcon = footerIcon;
        } else {
            ticketSettings.embedticket.footerIcon = null;
        }
        if (embedFooter) {
            ticketSettings.embedticket.footer = embedFooter;
        } else {
            ticketSettings.embedticket.footer = null;
        }
        // IMAGE EMBED
        if (embedImage) {
            ticketSettings.embedticket.image = embedImage;
        } else {
            ticketSettings.embedticket.image = null;
        }
        // COLOR EMBED
        if (embedColor) {
            ticketSettings.embedticket.color = embedColor;
        } else {
            ticketSettings.embedticket.color = null;
        }
        // TIMESTAMP EMBED
        if (timestamp) {
            ticketSettings.embedticket.timestamp = true;
        } else {
            ticketSettings.embedticket.timestamp = false;
        }


        await ticketSettings.save();

        // Create a Action Log
        await createLog(req, 'Updated Ticket Room Message');

        res.render("Dashboard/Server Management/ticket", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            ticket: ticketSettings,
            emotes: '',
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/ticket/interaction-message", checkAuth, async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findGuild(req, res);
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild id=${req.params.guildID}`);
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
        const ticketSettings = await findOrCreate(req, 'ticketEmbedSchema');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        const { author_icon1, author_name1, author_url1, embedTitle1, embedTitleURL1, embedDescription1, embedThumbnail1, footerIcon1, embedFooter1, embedImage1, embedColor1, timestamp1 } = req.body;

        // AUTHOR EMBED
        if (author_icon1) {
            ticketSettings.ticketembed.author.icon = author_icon1;
        } else {
            ticketSettings.ticketembed.author.icon = null;
        }
        if (author_name1) {
            ticketSettings.ticketembed.author.name = author_name1;
        } else {
            ticketSettings.ticketembed.author.name = null;
        }
        if (author_url1) {
            ticketSettings.ticketembed.author.url = author_url1;
        } else {
            ticketSettings.ticketembed.author.url = null;
        }
        // TITLE EMBED
        if (embedTitle1) {
            ticketSettings.ticketembed.title = embedTitle1;
        } else {
            ticketSettings.ticketembed.title = null;
        }
        if (embedTitleURL1) {
            ticketSettings.ticketembed.titleURL = embedTitleURL1;
        } else {
            ticketSettings.ticketembed.titleURL = null;
        }
        // DESCRIPTION EMBED
        if (embedDescription1) {
            ticketSettings.ticketembed.description = embedDescription1;
        } else {
            ticketSettings.ticketembed.description = null;
        }
        // THUMBNAIL EMBED
        if (embedThumbnail1) {
            ticketSettings.ticketembed.thumbnail = embedThumbnail1;
        } else {
            ticketSettings.ticketembed.thumbnail = null;
        }
        // FOOTER EMBED
        if (footerIcon1) {
            ticketSettings.ticketembed.footerIcon = footerIcon1;
        } else {
            ticketSettings.ticketembed.footerIcon = null;
        }
        if (embedFooter1) {
            ticketSettings.ticketembed.footer = embedFooter1;
        } else {
            ticketSettings.ticketembed.footer = null;
        }
        // IMAGE EMBED
        if (embedImage1) {
            ticketSettings.ticketembed.image = embedImage1;
        } else {
            ticketSettings.ticketembed.image = null;
        }
        // COLOR EMBED
        if (embedColor1) {
            ticketSettings.ticketembed.color = embedColor1;
        } else {
            ticketSettings.ticketembed.color = null;
        }
        // TIMESTAMP EMBED
        if (timestamp1) {
            ticketSettings.ticketembed.timestamp = true;
        } else {
            ticketSettings.ticketembed.timestamp = false;
        }


        await ticketSettings.save();

        // Create a Action Log
        await createLog(req, 'Updated Ticket Interaction Message');

        res.render("Dashboard/Server Management/ticket", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            ticket: ticketSettings,
            emotes: '',
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/ticketreaction", checkAuth, async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findGuild(req, res);
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild id=${req.params.guildID}`);
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
        const ticketSettings = await findOrCreate(req, 'ticketEmbedSchema');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        const { msgType, ReactChannel, rType, selectemoji, selectemojiCustom, reactionButtonText, exChannel, messageID, selectemoji1, selectemojiCustom1 } = req.body;

        switch (msgType) {
            case 'newmessage':
                if (ReactChannel) {
                    ticketSettings.ticketReactChannel = ReactChannel;
                } else {
                    ticketSettings.ticketReactChannel = null;
                }

                // EMOJI
                if (rType === "1") {
                    const embed = {
                        color: '',
                        title: '',
                        url: '',
                        author: {
                            name: '',
                            icon_url: '',
                            url: '',
                        },
                        description: '',
                        thumbnail: {
                            url: '',
                        },
                        image: {
                            url: '',
                        },
                        timestamp: '',
                        footer: {
                            text: '',
                            icon_url: '',
                        },
                    };

                    const hexToDecimal = hex => parseInt(hex, 16);

                    if (ticketSettings.ticketembed.author.icon) embed.author.icon_url = ticketSettings.ticketembed.author.icon;
                    if (ticketSettings.ticketembed.author.name) embed.author.name = ticketSettings.ticketembed.author.name;
                    if (ticketSettings.ticketembed.author.url) embed.author.url = ticketSettings.ticketembed.author.url;
                    if (ticketSettings.ticketembed.title) embed.title = ticketSettings.ticketembed.title;
                    if (ticketSettings.ticketembed.titleURL) embed.url = ticketSettings.ticketembed.titleURL;
                    if (ticketSettings.ticketembed.description) embed.description = ticketSettings.ticketembed.description;
                    if (ticketSettings.ticketembed.thumbnail) embed.thumbnail.url = ticketSettings.ticketembed.thumbnail;
                    if (ticketSettings.ticketembed.footerIcon) embed.footer.icon_url = ticketSettings.ticketembed.footerIcon;
                    if (ticketSettings.ticketembed.footer) embed.footer.text = ticketSettings.ticketembed.footer;
                    if (ticketSettings.ticketembed.image) embed.image.url = ticketSettings.ticketembed.image;
                    if (ticketSettings.ticketembed.timestamp) embed.timestamp = new Date().toISOString();
                    if (ticketSettings.ticketembed.color) embed.color = hexToDecimal(ticketSettings.ticketembed.color.slice(1)) || '10197915';

                    // console.log(embed)

                    /* ENVIA A MSG */
                    let datamsg = {
                        "content": null,
                        "tts": false,
                        "embeds": [embed],
                    };

                    let msg = await createMessage(ReactChannel, process.env.TOKEN, datamsg);

                    let emojis = await findEmoji();
                    let emote;
                    if (emojis.find(a => a.name === selectemoji)) {
                        emote = emojis.find(a => a.name === selectemoji).char;
                    } else {
                        emote = selectemojiCustom;
                    }

                    /* OUTPUT
                    {
                        codes: '2764 FE0F',
                        char: '❤️',
                        name: 'red heart',
                        category: 'Smileys & Emotion (emotion)',
                        group: 'Smileys & Emotion',
                        subgroup: 'emotion'
                    }
                    */

                    /* ADD REACTION NA MSG*/
                    await putEmoji(ReactChannel, process.env.TOKEN, msg.id, emote);
                    // let data = [msg.id, ReactChannel, req.params.guildID];
                    // await findOrCreate(data, 'ticketReação');
                    // salvando dados pro messageReactionAdd funcionar
                    ticketSettings.messageID.push(msg.id);
                    await ticketSettings.save().catch(() => { });
                    // BUTTON
                } else {
                    const embed = {
                        color: '',
                        title: '',
                        url: '',
                        author: {
                            name: '',
                            icon_url: '',
                            url: '',
                        },
                        description: '',
                        thumbnail: {
                            url: '',
                        },
                        image: {
                            url: '',
                        },
                        timestamp: '',
                        footer: {
                            text: '',
                            icon_url: '',
                        },
                    };

                    const hexToDecimal = hex => parseInt(hex, 16);

                    if (ticketSettings.ticketembed.author.icon) embed.author.icon_url = ticketSettings.ticketembed.author.icon;
                    if (ticketSettings.ticketembed.author.name) embed.author.name = ticketSettings.ticketembed.author.name;
                    if (ticketSettings.ticketembed.author.url) embed.author.url = ticketSettings.ticketembed.author.url;
                    if (ticketSettings.ticketembed.title) embed.title = ticketSettings.ticketembed.title;
                    if (ticketSettings.ticketembed.titleURL) embed.url = ticketSettings.ticketembed.titleURL;
                    if (ticketSettings.ticketembed.description) embed.description = ticketSettings.ticketembed.description;
                    if (ticketSettings.ticketembed.thumbnail) embed.thumbnail.url = ticketSettings.ticketembed.thumbnail;
                    if (ticketSettings.ticketembed.footerIcon) embed.footer.icon_url = ticketSettings.ticketembed.footerIcon;
                    if (ticketSettings.ticketembed.footer) embed.footer.text = ticketSettings.ticketembed.footer;
                    if (ticketSettings.ticketembed.image) embed.image.url = ticketSettings.ticketembed.image;
                    if (ticketSettings.ticketembed.timestamp) embed.timestamp = new Date().toISOString();
                    if (ticketSettings.ticketembed.color) embed.color = hexToDecimal(ticketSettings.ticketembed.color.slice(1)) || '10197915';

                    // console.log(embed)

                    let emojis = await findEmoji();
                    let normalemote;
                    let emote;
                    if (emojis.find(a => a.name === selectemoji)) {
                        normalemote = `:${emojis.find(a => a.name === selectemoji).char}:${null}`;
                    } else {
                        emote = selectemojiCustom;
                    }

                    /* ENVIA A MSG */
                    let datamsg;
                    if (normalemote) {
                        datamsg = {
                            "content": null,
                            "tts": false,
                            "embeds": [embed],
                            "components": [
                                {
                                    "type": 1,
                                    "components": [{
                                        "type": 2,
                                        "label": reactionButtonText ?? ' ',
                                        "style": 1,
                                        "custom_id": 'ticket',
                                        "emoji": {
                                            "id": null,
                                            "name": normalemote.split(':')[1] || emote.split(':')[1]
                                        }
                                    }
                                    ]
                                }
                            ]
                        };
                    } else if (emote) {
                        datamsg = {
                            "content": null,
                            "tts": false,
                            "embeds": [embed],
                            "components": [
                                {
                                    "type": 1,
                                    "components": [{
                                        "type": 2,
                                        "label": reactionButtonText ?? ' ',
                                        "style": 1,
                                        "custom_id": 'ticket',
                                        "emoji": {
                                            "id": emote.split(':')[2],
                                            "name": emote.split(':')[1]
                                        }
                                    }
                                    ]
                                }
                            ]
                        };
                    }

                    let msg = await createMessage(ReactChannel, process.env.TOKEN, datamsg);
                }

                break;
            case 'existingmessage':

                if (!messageID) {
                    return res.render("Dashboard/Server Management/ticket", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        premium: premium,
                        member: member,
                        ticket: ticketSettings,
                        emotes: '',
                        ch: ch,
                        rr: rr,
                        error: 'Uh-oh! Você deve informar o ID da mensagem',
                        success: '',
                    });
                }

                let emojis = await findEmoji();
                let emote;
                if (emojis.find(a => a.name === selectemoji1)) {
                    emote = emojis.find(a => a.name === selectemoji1).char;
                } else {
                    emote = selectemojiCustom1;
                }

                /* OUTPUT
                {
                    codes: '2764 FE0F',
                    char: '❤️',
                    name: 'red heart',
                    category: 'Smileys & Emotion (emotion)',
                    group: 'Smileys & Emotion',
                    subgroup: 'emotion'
                }
                */

                /* ADD REACTION NA MSG*/
                await putEmoji(exChannel, process.env.TOKEN, messageID, emote);
                ticketSettings.messageID.push(messageID);
                await ticketSettings.save().catch(() => { });
                break;
            default:
                break;
        }

        await ticketSettings.save();

        // Create a Action Log
        await createLog(req, 'Created Ticket Interaction Message');

        res.redirect(`/dashboard/${req.params.guildID}/ticket`)

        /* res.render("Dashboard/Server Management/ticket", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            ticket: ticketSettings,
            emotes: '',
            ch: ch,
            rr: rr,
            error: '',
            success: 'Saved Settings',
        }); */
    } catch (error) {
        next(error)
    }
});

module.exports = router;