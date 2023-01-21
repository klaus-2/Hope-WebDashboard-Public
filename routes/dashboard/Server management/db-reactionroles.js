const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, putEmoji, createMessage, getPermissions, findOrCreate, findAndDelete, getChannelMessage } } = require("../../../helpers"),
    EmojiArray = require('../../../helpers/emojiarray.json'),
    moment = require('moment'),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/reactionroles", checkAuth, async (req, res, next) => {
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
        let dbrr = await findOrCreate(req, 'ReactionRoleSchema-2');

        // Get All Guild sendChannels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Server Management/reactionroles", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            emojiArray: EmojiArray,
            ch: ch,
            rr: rr,
            dbrr: dbrr,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/reactionroles", checkAuth, async (req, res, next) => {
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
        let dbrr = await findOrCreate(req, 'ReactionRoleSchema-2');

        // Get All Guild sendChannels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        const { sendChannel, typeMessage, rrTypeMsg, selectType, messageID, textarea, RRDM, rroption, author_icon, author_name, author_url, embedTitle, embedTitleURL, embedDescription, embedThumbnail, embedFooterIcon, embedFooter, embedImage, timestamp, embedColor } = req.body;
        // CHECANDO O MODO DA MENSAGEM
        if (typeMessage === "newmessage") {
            // CHECANDO O TIPO DA MENSAGEM
            switch (rrTypeMsg) {
                case "textmessage":
                    // CHECANDO O TIPO DE REAÇÃO
                    switch (selectType) {
                        case "reactions":
                            if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            }

                            let reactions = [];

                            if (req.body.emojirr1 && req.body.roles1) reactions.push({ emoji: req.body.emojirr1, roleID: req.body.roles1 });
                            if (req.body.emojirr2 && req.body.roles2) reactions.push({ emoji: req.body.emojirr2, roleID: req.body.roles2 });
                            if (req.body.emojirr3 && req.body.roles3) reactions.push({ emoji: req.body.emojirr3, roleID: req.body.roles3 });
                            if (req.body.emojirr4 && req.body.roles4) reactions.push({ emoji: req.body.emojirr4, roleID: req.body.roles4 });
                            if (req.body.emojirr5 && req.body.roles5) reactions.push({ emoji: req.body.emojirr5, roleID: req.body.roles5 });
                            if (req.body.emojirr6 && req.body.roles6) reactions.push({ emoji: req.body.emojirr6, roleID: req.body.roles6 });

                            if (reactions.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação.',
                                    success: '',
                                });
                            } else {

                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": [textarea,
                                    ].join('\n'),
                                    "tts": false,
                                    "embeds": null,
                                };

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                /* ADD REACTION NA MSG*/
                                for (const emote of (reactions)) {
                                    await putEmoji(sendChannel, process.env.TOKEN, msg.id, emote.emoji);
                                }

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of reactions) {
                                    db.reactions.push({ roleID: rr.roleID, emoji: rr.emoji });
                                }
                                await db.save();
                            }
                            break;
                        case "buttons":

                            if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            }

                            let buttons = [];

                            if (req.body.emojirr1 && req.body.roles1 && req.body.labelrr1) buttons.push({ emoji: req.body.emojirr1, roleID: req.body.roles1, label: req.body.labelrr1 });
                            if (req.body.emojirr2 && req.body.roles2 && req.body.labelrr2) buttons.push({ emoji: req.body.emojirr2, roleID: req.body.roles2, label: req.body.labelrr2 });
                            if (req.body.emojirr3 && req.body.roles3 && req.body.labelrr3) buttons.push({ emoji: req.body.emojirr3, roleID: req.body.roles3, label: req.body.labelrr3 });
                            if (req.body.emojirr4 && req.body.roles4 && req.body.labelrr4) buttons.push({ emoji: req.body.emojirr4, roleID: req.body.roles4, label: req.body.labelrr4 });
                            if (req.body.emojirr5 && req.body.roles5 && req.body.labelrr5) buttons.push({ emoji: req.body.emojirr5, roleID: req.body.roles5, label: req.body.labelrr5 });
                            if (req.body.emojirr6 && req.body.roles6 && req.body.labelrr6) buttons.push({ emoji: req.body.emojirr6, roleID: req.body.roles6, label: req.body.labelrr6 });

                            if (buttons.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação/label.',
                                    success: '',
                                });
                            } else {
                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": [textarea,
                                    ].join('\n'),
                                    "tts": false,
                                    "embeds": null,
                                    "components": [
                                        {
                                            "type": 1,
                                            "components": []
                                        }
                                    ]
                                };

                                /* ADICIONA OS BOTOÕES NA MENSAGEM */
                                for (const button of buttons) {
                                    datamsg.components[0].components.push({
                                        "type": 2,
                                        "label": button.label,
                                        "style": 1,
                                        "custom_id": 'rrButton',
                                        "emoji": {
                                            "id": null,
                                            "name": button.emoji
                                        }
                                    });
                                }

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of buttons) {
                                    db.buttons.push({ roleID: rr.roleID, emoji: rr.emoji, label: rr.label });
                                }
                                await db.save();
                            }

                            break;
                        case "dropdowns":

                            if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            }

                            let dropdowns = [];

                            if (req.body.emojirr1 && req.body.roles1 && req.body.labelrr1 && req.body.descrr1) dropdowns.push({ emoji: req.body.emojirr1, roleID: req.body.roles1, label: req.body.labelrr1, description: req.body.descrr1 });
                            if (req.body.emojirr2 && req.body.roles2 && req.body.labelrr2 && req.body.descrr2) dropdowns.push({ emoji: req.body.emojirr2, roleID: req.body.roles2, label: req.body.labelrr2, description: req.body.descrr2 });
                            if (req.body.emojirr3 && req.body.roles3 && req.body.labelrr3 && req.body.descrr3) dropdowns.push({ emoji: req.body.emojirr3, roleID: req.body.roles3, label: req.body.labelrr3, description: req.body.descrr3 });
                            if (req.body.emojirr4 && req.body.roles4 && req.body.labelrr4 && req.body.descrr4) dropdowns.push({ emoji: req.body.emojirr4, roleID: req.body.roles4, label: req.body.labelrr4, description: req.body.descrr4 });
                            if (req.body.emojirr5 && req.body.roles5 && req.body.labelrr5 && req.body.descrr5) dropdowns.push({ emoji: req.body.emojirr5, roleID: req.body.roles5, label: req.body.labelrr5, description: req.body.descrr5 });
                            if (req.body.emojirr6 && req.body.roles6 && req.body.labelrr6 && req.body.descrr6) dropdowns.push({ emoji: req.body.emojirr6, roleID: req.body.roles6, label: req.body.labelrr6, description: req.body.descrr6 });

                            if (dropdowns.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação/label.',
                                    success: '',
                                });
                            } else {
                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": [textarea,
                                    ].join('\n'),
                                    "tts": false,
                                    "embeds": null,
                                    "components": [
                                        {
                                            "type": 1,
                                            "components": [{
                                                "type": 3,
                                                "custom_id": 'rrSelect',
                                                "options": [],
                                                "placeholder": "Choose a role",
                                                "min_values": 1,
                                                "max_values": 1
                                            }]
                                        }
                                    ]
                                };

                                /* ADICIONA OS BOTOÕES NA MENSAGEM */
                                for (const dropdown of dropdowns) {
                                    datamsg.components[0].components[0].options.push({
                                        "label": dropdown.label,
                                        "value": dropdown.roleID,
                                        "description": dropdown.description,
                                        "emoji": {
                                            "name": dropdown.emoji,
                                            "id": null
                                        }
                                    },
                                    );
                                }

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of dropdowns) {
                                    db.dropdowns.push({ roleID: rr.roleID, emoji: rr.emoji, label: rr.label, description: rr.description });
                                }
                                await db.save();
                            }

                            break;
                        default:
                            res.render("Dashboard/Server Management/reactionroles", {
                                translate: req.translate,
                                req: req,
                                user: req.session.user,
                                guild: guild,
                                settings: settings,
                                premium: premium,
                                member: member,
                                emojiArray: EmojiArray,
                                dbrr: dbrr,
                                ch: ch,
                                rr: rr,
                                error: 'Uh-oh! Você precisa selecionar o tipo de reação.',
                                success: '',
                            });
                            break;
                    }
                    break;
                case "embedmessage":
                    // CHECANDO O TIPO DE REAÇÃO
                    switch (selectType) {
                        case "reactions":
                            /* if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            } */

                            let reactions = [];

                            if (req.body.emojirr1 && req.body.roles1) reactions.push({ emoji: req.body.emojirr1, roleID: req.body.roles1 });
                            if (req.body.emojirr2 && req.body.roles2) reactions.push({ emoji: req.body.emojirr2, roleID: req.body.roles2 });
                            if (req.body.emojirr3 && req.body.roles3) reactions.push({ emoji: req.body.emojirr3, roleID: req.body.roles3 });
                            if (req.body.emojirr4 && req.body.roles4) reactions.push({ emoji: req.body.emojirr4, roleID: req.body.roles4 });
                            if (req.body.emojirr5 && req.body.roles5) reactions.push({ emoji: req.body.emojirr5, roleID: req.body.roles5 });
                            if (req.body.emojirr6 && req.body.roles6) reactions.push({ emoji: req.body.emojirr6, roleID: req.body.roles6 });

                            if (reactions.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação.',
                                    success: '',
                                });
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

                                if (author_icon) embed.author.icon_url = author_icon;
                                if (author_name) embed.author.name = author_name;
                                if (author_url) embed.author.url = author_url;
                                if (embedTitle) embed.title = embedTitle;
                                if (embedTitleURL) embed.url = embedTitleURL;
                                if (embedDescription) embed.description = embedDescription;
                                if (embedThumbnail) embed.thumbnail.url = embedThumbnail;
                                if (embedFooterIcon) embed.footer.icon_url = embedFooterIcon;
                                if (embedFooter) embed.footer.text = embedFooter;
                                if (embedImage) embed.image.url = embedImage;
                                if (timestamp) embed.timestamp = new Date().toISOString();
                                if (embedColor) embed.color = hexToDecimal(embedColor.slice(1)) || '10197915';

                                // console.log(embed)

                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": null,
                                    "tts": false,
                                    "embeds": [embed],
                                };

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                /* ADD REACTION NA MSG*/
                                for (const emote of (reactions)) {
                                    await putEmoji(sendChannel, process.env.TOKEN, msg.id, emote.emoji);
                                }

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of reactions) {
                                    db.reactions.push({ roleID: rr.roleID, emoji: rr.emoji });
                                }
                                await db.save();
                            }
                            break;
                        case "buttons":

                            /* if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            } */

                            let buttons = [];

                            if (req.body.emojirr1 && req.body.roles1 && req.body.labelrr1) buttons.push({ emoji: req.body.emojirr1, roleID: req.body.roles1, label: req.body.labelrr1 });
                            if (req.body.emojirr2 && req.body.roles2 && req.body.labelrr2) buttons.push({ emoji: req.body.emojirr2, roleID: req.body.roles2, label: req.body.labelrr2 });
                            if (req.body.emojirr3 && req.body.roles3 && req.body.labelrr3) buttons.push({ emoji: req.body.emojirr3, roleID: req.body.roles3, label: req.body.labelrr3 });
                            if (req.body.emojirr4 && req.body.roles4 && req.body.labelrr4) buttons.push({ emoji: req.body.emojirr4, roleID: req.body.roles4, label: req.body.labelrr4 });
                            if (req.body.emojirr5 && req.body.roles5 && req.body.labelrr5) buttons.push({ emoji: req.body.emojirr5, roleID: req.body.roles5, label: req.body.labelrr5 });
                            if (req.body.emojirr6 && req.body.roles6 && req.body.labelrr6) buttons.push({ emoji: req.body.emojirr6, roleID: req.body.roles6, label: req.body.labelrr6 });

                            if (buttons.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação/label.',
                                    success: '',
                                });
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

                                if (author_icon) embed.author.icon_url = author_icon;
                                if (author_name) embed.author.name = author_name;
                                if (author_url) embed.author.url = author_url;
                                if (embedTitle) embed.title = embedTitle;
                                if (embedTitleURL) embed.url = embedTitleURL;
                                if (embedDescription) embed.description = embedDescription;
                                if (embedThumbnail) embed.thumbnail.url = embedThumbnail;
                                if (embedFooterIcon) embed.footer.icon_url = embedFooterIcon;
                                if (embedFooter) embed.footer.text = embedFooter;
                                if (embedImage) embed.image.url = embedImage;
                                if (timestamp) embed.timestamp = new Date().toISOString();
                                if (embedColor) embed.color = hexToDecimal(embedColor.slice(1)) || '10197915';

                                // console.log(embed)

                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": null,
                                    "tts": false,
                                    "embeds": [embed],
                                    "components": [
                                        {
                                            "type": 1,
                                            "components": []
                                        }
                                    ]
                                };

                                /* ADICIONA OS BOTOÕES NA MENSAGEM */
                                for (const button of buttons) {
                                    datamsg.components[0].components.push({
                                        "type": 2,
                                        "label": button.label,
                                        "style": 1,
                                        "custom_id": 'rrButton',
                                        "emoji": {
                                            "id": null,
                                            "name": button.emoji
                                        }
                                    });
                                }

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of buttons) {
                                    db.buttons.push({ roleID: rr.roleID, emoji: rr.emoji, label: rr.label });
                                }
                                await db.save();
                            }

                            break;
                        case "dropdowns":

                            /* if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            } */

                            let dropdowns = [];

                            if (req.body.emojirr1 && req.body.roles1 && req.body.labelrr1 && req.body.descrr1) dropdowns.push({ emoji: req.body.emojirr1, roleID: req.body.roles1, label: req.body.labelrr1, description: req.body.descrr1 });
                            if (req.body.emojirr2 && req.body.roles2 && req.body.labelrr2 && req.body.descrr2) dropdowns.push({ emoji: req.body.emojirr2, roleID: req.body.roles2, label: req.body.labelrr2, description: req.body.descrr2 });
                            if (req.body.emojirr3 && req.body.roles3 && req.body.labelrr3 && req.body.descrr3) dropdowns.push({ emoji: req.body.emojirr3, roleID: req.body.roles3, label: req.body.labelrr3, description: req.body.descrr3 });
                            if (req.body.emojirr4 && req.body.roles4 && req.body.labelrr4 && req.body.descrr4) dropdowns.push({ emoji: req.body.emojirr4, roleID: req.body.roles4, label: req.body.labelrr4, description: req.body.descrr4 });
                            if (req.body.emojirr5 && req.body.roles5 && req.body.labelrr5 && req.body.descrr5) dropdowns.push({ emoji: req.body.emojirr5, roleID: req.body.roles5, label: req.body.labelrr5, description: req.body.descrr5 });
                            if (req.body.emojirr6 && req.body.roles6 && req.body.labelrr6 && req.body.descrr6) dropdowns.push({ emoji: req.body.emojirr6, roleID: req.body.roles6, label: req.body.labelrr6, description: req.body.descrr6 });

                            if (dropdowns.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação/label.',
                                    success: '',
                                });
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

                                if (author_icon) embed.author.icon_url = author_icon;
                                if (author_name) embed.author.name = author_name;
                                if (author_url) embed.author.url = author_url;
                                if (embedTitle) embed.title = embedTitle;
                                if (embedTitleURL) embed.url = embedTitleURL;
                                if (embedDescription) embed.description = embedDescription;
                                if (embedThumbnail) embed.thumbnail.url = embedThumbnail;
                                if (embedFooterIcon) embed.footer.icon_url = embedFooterIcon;
                                if (embedFooter) embed.footer.text = embedFooter;
                                if (embedImage) embed.image.url = embedImage;
                                if (timestamp) embed.timestamp = new Date().toISOString();
                                if (embedColor) embed.color = hexToDecimal(embedColor.slice(1)) || '10197915';

                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": null,
                                    "tts": false,
                                    "embeds": [embed],
                                    "components": [
                                        {
                                            "type": 1,
                                            "components": [{
                                                "type": 3,
                                                "custom_id": 'rrSelect',
                                                "options": [],
                                                "placeholder": "Choose a role",
                                                "min_values": 1,
                                                "max_values": 1
                                            }]
                                        }
                                    ]
                                };

                                /* ADICIONA OS BOTOÕES NA MENSAGEM */
                                for (const dropdown of dropdowns) {
                                    datamsg.components[0].components[0].options.push({
                                        "label": dropdown.label,
                                        "value": dropdown.roleID,
                                        "description": dropdown.description,
                                        "emoji": {
                                            "name": dropdown.emoji,
                                            "id": null
                                        }
                                    },
                                    );
                                }

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of dropdowns) {
                                    db.dropdowns.push({ roleID: rr.roleID, emoji: rr.emoji, label: rr.label, description: rr.description });
                                }
                                await db.save();
                            }

                            break;
                        default:
                            res.render("Dashboard/Server Management/reactionroles", {
                                translate: req.translate,
                                req: req,
                                user: req.session.user,
                                guild: guild,
                                settings: settings,
                                premium: premium,
                                member: member,
                                emojiArray: EmojiArray,
                                dbrr: dbrr,
                                ch: ch,
                                rr: rr,
                                error: 'Uh-oh! Você precisa selecionar o tipo de reação.',
                                success: '',
                            });
                            break;
                    }
                    break;

                case "bothmessage":
                    // CHECANDO O TIPO DE REAÇÃO
                    switch (selectType) {
                        case "reactions":
                            if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            }

                            let reactions = [];

                            if (req.body.emojirr1 && req.body.roles1) reactions.push({ emoji: req.body.emojirr1, roleID: req.body.roles1 });
                            if (req.body.emojirr2 && req.body.roles2) reactions.push({ emoji: req.body.emojirr2, roleID: req.body.roles2 });
                            if (req.body.emojirr3 && req.body.roles3) reactions.push({ emoji: req.body.emojirr3, roleID: req.body.roles3 });
                            if (req.body.emojirr4 && req.body.roles4) reactions.push({ emoji: req.body.emojirr4, roleID: req.body.roles4 });
                            if (req.body.emojirr5 && req.body.roles5) reactions.push({ emoji: req.body.emojirr5, roleID: req.body.roles5 });
                            if (req.body.emojirr6 && req.body.roles6) reactions.push({ emoji: req.body.emojirr6, roleID: req.body.roles6 });

                            if (reactions.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação.',
                                    success: '',
                                });
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

                                if (author_icon) embed.author.icon_url = author_icon;
                                if (author_name) embed.author.name = author_name;
                                if (author_url) embed.author.url = author_url;
                                if (embedTitle) embed.title = embedTitle;
                                if (embedTitleURL) embed.url = embedTitleURL;
                                if (embedDescription) embed.description = embedDescription;
                                if (embedThumbnail) embed.thumbnail.url = embedThumbnail;
                                if (embedFooterIcon) embed.footer.icon_url = embedFooterIcon;
                                if (embedFooter) embed.footer.text = embedFooter;
                                if (embedImage) embed.image.url = embedImage;
                                if (timestamp) embed.timestamp = new Date().toISOString();
                                if (embedColor) embed.color = hexToDecimal(embedColor.slice(1)) || '10197915';

                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": [textarea,
                                    ].join('\n'),
                                    "tts": false,
                                    "embeds": [embed],
                                };

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                /* ADD REACTION NA MSG*/
                                for (const emote of (reactions)) {
                                    await putEmoji(sendChannel, process.env.TOKEN, msg.id, emote.emoji);
                                }

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of reactions) {
                                    db.reactions.push({ roleID: rr.roleID, emoji: rr.emoji });
                                }
                                await db.save();
                            }
                            break;
                        case "buttons":
                            if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            }

                            let buttons = [];

                            if (req.body.emojirr1 && req.body.roles1 && req.body.labelrr1) buttons.push({ emoji: req.body.emojirr1, roleID: req.body.roles1, label: req.body.labelrr1 });
                            if (req.body.emojirr2 && req.body.roles2 && req.body.labelrr2) buttons.push({ emoji: req.body.emojirr2, roleID: req.body.roles2, label: req.body.labelrr2 });
                            if (req.body.emojirr3 && req.body.roles3 && req.body.labelrr3) buttons.push({ emoji: req.body.emojirr3, roleID: req.body.roles3, label: req.body.labelrr3 });
                            if (req.body.emojirr4 && req.body.roles4 && req.body.labelrr4) buttons.push({ emoji: req.body.emojirr4, roleID: req.body.roles4, label: req.body.labelrr4 });
                            if (req.body.emojirr5 && req.body.roles5 && req.body.labelrr5) buttons.push({ emoji: req.body.emojirr5, roleID: req.body.roles5, label: req.body.labelrr5 });
                            if (req.body.emojirr6 && req.body.roles6 && req.body.labelrr6) buttons.push({ emoji: req.body.emojirr6, roleID: req.body.roles6, label: req.body.labelrr6 });

                            if (buttons.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação/label.',
                                    success: '',
                                });
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

                                if (author_icon) embed.author.icon_url = author_icon;
                                if (author_name) embed.author.name = author_name;
                                if (author_url) embed.author.url = author_url;
                                if (embedTitle) embed.title = embedTitle;
                                if (embedTitleURL) embed.url = embedTitleURL;
                                if (embedDescription) embed.description = embedDescription;
                                if (embedThumbnail) embed.thumbnail.url = embedThumbnail;
                                if (embedFooterIcon) embed.footer.icon_url = embedFooterIcon;
                                if (embedFooter) embed.footer.text = embedFooter;
                                if (embedImage) embed.image.url = embedImage;
                                if (timestamp) embed.timestamp = new Date().toISOString();
                                if (embedColor) embed.color = hexToDecimal(embedColor.slice(1)) || '10197915';

                                // console.log(embed)

                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": [textarea,
                                    ].join('\n'),
                                    "tts": false,
                                    "embeds": [embed],
                                    "components": [
                                        {
                                            "type": 1,
                                            "components": []
                                        }
                                    ]
                                };

                                /* ADICIONA OS BOTOÕES NA MENSAGEM */
                                for (const button of buttons) {
                                    datamsg.components[0].components.push({
                                        "type": 2,
                                        "label": button.label,
                                        "style": 1,
                                        "custom_id": 'rrButton',
                                        "emoji": {
                                            "id": null,
                                            "name": button.emoji
                                        }
                                    });
                                }

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of buttons) {
                                    db.buttons.push({ roleID: rr.roleID, emoji: rr.emoji, label: rr.label });
                                }
                                await db.save();
                            }
                            break;
                        case "dropdowns":
                            if (!textarea) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você precisa o preencher o campo de mensagem, por favor tente novamente!',
                                    success: '',
                                });
                            }

                            let dropdowns = [];

                            if (req.body.emojirr1 && req.body.roles1 && req.body.labelrr1 && req.body.descrr1) dropdowns.push({ emoji: req.body.emojirr1, roleID: req.body.roles1, label: req.body.labelrr1, description: req.body.descrr1 });
                            if (req.body.emojirr2 && req.body.roles2 && req.body.labelrr2 && req.body.descrr2) dropdowns.push({ emoji: req.body.emojirr2, roleID: req.body.roles2, label: req.body.labelrr2, description: req.body.descrr2 });
                            if (req.body.emojirr3 && req.body.roles3 && req.body.labelrr3 && req.body.descrr3) dropdowns.push({ emoji: req.body.emojirr3, roleID: req.body.roles3, label: req.body.labelrr3, description: req.body.descrr3 });
                            if (req.body.emojirr4 && req.body.roles4 && req.body.labelrr4 && req.body.descrr4) dropdowns.push({ emoji: req.body.emojirr4, roleID: req.body.roles4, label: req.body.labelrr4, description: req.body.descrr4 });
                            if (req.body.emojirr5 && req.body.roles5 && req.body.labelrr5 && req.body.descrr5) dropdowns.push({ emoji: req.body.emojirr5, roleID: req.body.roles5, label: req.body.labelrr5, description: req.body.descrr5 });
                            if (req.body.emojirr6 && req.body.roles6 && req.body.labelrr6 && req.body.descrr6) dropdowns.push({ emoji: req.body.emojirr6, roleID: req.body.roles6, label: req.body.labelrr6, description: req.body.descrr6 });

                            if (dropdowns.length === 0) {
                                return res.render("Dashboard/Server Management/reactionroles", {
                                    translate: req.translate,
                                    req: req,
                                    user: req.session.user,
                                    guild: guild,
                                    settings: settings,
                                    premium: premium,
                                    member: member,
                                    emojiArray: EmojiArray,
                                    dbrr: dbrr,
                                    ch: ch,
                                    rr: rr,
                                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação/label.',
                                    success: '',
                                });
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

                                if (author_icon) embed.author.icon_url = author_icon;
                                if (author_name) embed.author.name = author_name;
                                if (author_url) embed.author.url = author_url;
                                if (embedTitle) embed.title = embedTitle;
                                if (embedTitleURL) embed.url = embedTitleURL;
                                if (embedDescription) embed.description = embedDescription;
                                if (embedThumbnail) embed.thumbnail.url = embedThumbnail;
                                if (embedFooterIcon) embed.footer.icon_url = embedFooterIcon;
                                if (embedFooter) embed.footer.text = embedFooter;
                                if (embedImage) embed.image.url = embedImage;
                                if (timestamp) embed.timestamp = new Date().toISOString();
                                if (embedColor) embed.color = hexToDecimal(embedColor.slice(1)) || '10197915';

                                /* ENVIA A MSG */
                                let datamsg = {
                                    "content": [textarea,
                                    ].join('\n'),
                                    "tts": false,
                                    "embeds": [embed],
                                    "components": [
                                        {
                                            "type": 1,
                                            "components": [{
                                                "type": 3,
                                                "custom_id": 'rrSelect',
                                                "options": [],
                                                "placeholder": "Choose a role",
                                                "min_values": 1,
                                                "max_values": 1
                                            }]
                                        }
                                    ]
                                };

                                /* ADICIONA OS DROPDOWNS NA MENSAGEM */
                                for (const dropdown of dropdowns) {
                                    datamsg.components[0].components[0].options.push({
                                        "label": dropdown.label,
                                        "value": dropdown.roleID,
                                        "description": dropdown.description,
                                        "emoji": {
                                            "name": dropdown.emoji,
                                            "id": null
                                        }
                                    },
                                    );
                                }

                                let msg = await createMessage(sendChannel, process.env.TOKEN, datamsg);

                                // CRIA A DB PARA A MSG
                                let data = [req.params.guildID, msg.id, sendChannel, (RRDM === 'true'), rroption];
                                await findOrCreate(data, 'ReactionRoleSchema-New',);

                                /* ADICIONA AS REAÇÕES NA DB */
                                let db = await findOrCreate(data, 'ReactionRoleSchema-3',);
                                for (const rr of dropdowns) {
                                    db.dropdowns.push({ roleID: rr.roleID, emoji: rr.emoji, label: rr.label, description: rr.description });
                                }
                                await db.save();
                            }
                            break;
                        default:
                            res.render("Dashboard/Server Management/reactionroles", {
                                translate: req.translate,
                                req: req,
                                user: req.session.user,
                                guild: guild,
                                settings: settings,
                                premium: premium,
                                member: member,
                                emojiArray: EmojiArray,
                                dbrr: dbrr,
                                ch: ch,
                                rr: rr,
                                error: 'Uh-oh! Você precisa selecionar o tipo de reação.',
                                success: '',
                            });
                            break;
                    }
                    break;
                default:
                    res.render("Dashboard/Server Management/reactionroles", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        settings: settings,
                        premium: premium,
                        member: member,
                        emojiArray: EmojiArray,
                        dbrr: dbrr,
                        ch: ch,
                        rr: rr,
                        error: 'Uh-oh! Você precisa selecionar o tipo da mensagem.',
                        success: '',
                    });
                    break;
            }
        } else if (typeMessage === "existingmessage") {

            if (!messageID) {
                return res.render("Dashboard/Server Management/reactionroles", {
                    translate: req.translate,
                    req: req,
                    user: req.session.user,
                    guild: guild,
                    settings: settings,
                    premium: premium,
                    member: member,
                    emojiArray: EmojiArray,
                    dbrr: dbrr,
                    ch: ch,
                    rr: rr,
                    error: 'Uh-oh! Você precisa informar o ID da mensagem',
                    success: '',
                });
            }

            let reactions = [];

            if (req.body.emojirr1 && req.body.roles1) reactions.push({ emoji: req.body.emojirr1, roleID: req.body.roles1 });
            if (req.body.emojirr2 && req.body.roles2) reactions.push({ emoji: req.body.emojirr2, roleID: req.body.roles2 });
            if (req.body.emojirr3 && req.body.roles3) reactions.push({ emoji: req.body.emojirr3, roleID: req.body.roles3 });
            if (req.body.emojirr4 && req.body.roles4) reactions.push({ emoji: req.body.emojirr4, roleID: req.body.roles4 });
            if (req.body.emojirr5 && req.body.roles5) reactions.push({ emoji: req.body.emojirr5, roleID: req.body.roles5 });
            if (req.body.emojirr6 && req.body.roles6) reactions.push({ emoji: req.body.emojirr6, roleID: req.body.roles6 });

            if (reactions.length === 0) {
                return res.render("Dashboard/Server Management/reactionroles", {
                    translate: req.translate,
                    req: req,
                    user: req.session.user,
                    guild: guild,
                    settings: settings,
                    premium: premium,
                    member: member,
                    emojiArray: EmojiArray,
                    dbrr: dbrr,
                    ch: ch,
                    rr: rr,
                    error: 'Uh-oh! Você esqueceu de adicionar cargo/reação.',
                    success: '',
                });
            } else {

                let checkMsg = await getChannelMessage(sendChannel, messageID, process.env.TOKEN);
                if (checkMsg.code === 10008 || !checkMsg) {
                    return res.render("Dashboard/Server Management/reactionroles", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        guild: guild,
                        settings: settings,
                        premium: premium,
                        member: member,
                        emojiArray: EmojiArray,
                        dbrr: dbrr,
                        ch: ch,
                        rr: rr,
                        error: 'Uh-oh! Mensagem não encontrada! Certifique de que o ID/Link da mensagem estejam correto, e que sejam do mesmo canal selecionado!',
                        success: '',
                    });
                }

                /* ADD REACTION NA MSG*/
                for (const emote of reactions) {
                    let a = await putEmoji(sendChannel, process.env.TOKEN, messageID, emote.emoji);
                }

                /* ADICIONA AS REAÇÕES NA DB */
                let data = [req.params.guildID, messageID, sendChannel, (RRDM === 'true'), rroption];
                let db = await findOrCreate(data, 'ReactionRoleSchema-3');
                if (!db) {
                    // CRIA A DB PARA A MSG
                    await findOrCreate(data, 'ReactionRoleSchema-New');
                    db = await findOrCreate(data, 'ReactionRoleSchema-3');
                }

                for (const rr of reactions) {
                    db.reactions.push({ roleID: rr.roleID, emoji: rr.emoji });
                }
                await db.save();
            }

        }

        await createLog(req, 'Created Reaction role');

        return res.render("Dashboard/Server Management/reactionroles", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            premium: premium,
            member: member,
            emojiArray: EmojiArray,
            dbrr: dbrr,
            ch: ch,
            rr: rr,
            error: '',
            success: `The reaction role was created`,
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;