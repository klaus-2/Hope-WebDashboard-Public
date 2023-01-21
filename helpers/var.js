const { actionLog, blog, blogCategories, GuildSettings, transcript, AutoAnimes, AniversarioSchema, autoCovid, AutoTwitch, AutoYoutube, welcome, welcomeDB, ReactionRoleSchema, stickyRole, ticketEmbedSchema, loggingSystem, autoResponse, Sticky, Rank_de_Reputações, applicationsDB, Economia, RankSchema, newsDB, publicServers, ticketReação } = require("../database/models"),
    { fetch } = require('undici'),
    permsToArray = require("discord-perms-array");

const createLog = async (req, action) => {
    const newLog = new actionLog({
        guildID: req.params.guildID,
        action: action,
        userID: req.session.user.id,
        userTag: `${req.session.user.username}#${req.session.user.discriminator}`,
        userAvatar: `${req.session.user.avatar}`,
        data: Date.now(),
    });
    await newLog.save().catch(() => { });
}

const createPost = async (req) => {
    const newPost = new blog({
        title: req[0],
        thumbnail: req[1],
        content: req[2],
        shortDesc: req[3],
        author: req[4],
        authorID: req[5],
        posted: req[6],
        lastEdit: null,
        categories: req[7],
        tags: req[8],
        postURL: req[9],
        listingPrivacy: req[10]
    });
    await newPost.save().catch(() => { });
}

const findGuild = async (req, res) => {
    const gdata = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/${req.params.guildID}?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return gdata;
}

const findUser = async (req, res) => {
    const udata = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/${req.params.guildID}/members/${req.user.id}?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return udata;
}

const findLogs = async (req, res) => {
    const udata = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/${req.params.guildID}/joinslogs?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/maintenance");
        }
    });

    return udata;
}

const getChannels = async (req, res) => {
    const ch = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/${req.params.guildID}/channels?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return ch;
}

const getRoles = async (req, res) => {
    const rr = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/${req.params.guildID}/roles?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return rr;
}

const getCommands = async (req, res) => {
    const cmd = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/commands?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return cmd;
}

const getTopGuilds = async (req, res) => {
    const g = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/1/list?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return g;
}

const getPermissions = async (req) => {
    let perms;
    req.session.user.guilds.forEach(guild => {
        if (guild.id === req.params.guildID) {
            // the bitfield you get from some discord endpoint
            const myBitfield = guild.permissions;

            if (!permsToArray(myBitfield).includes('MANAGE_GUILD')) {
                console.log(`${req.session.user.username} no "MANAGE_GUILD" permission to access the server ${guild.id}`);
                perms = !permsToArray(myBitfield).includes('MANAGE_GUILD');
                // return res.status(200).redirect("/dashboard")
            }
        }
    });

    return perms;
}

// Update guilds settings
const updateSettings = async (req) => {
    const udata = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/guilds/${req.params.guildID}/update-settings?token=${process.env.API_TOKEN}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect(`/guilds/${req.params.guildID}`);
        }
    });

    return udata;
}

const findOrCreate = async (req, db, find) => {

    switch (db) {
        case 'blog':
            try {
                if (req) {
                    let resp = await blog.findOne({ postURL: req });
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: blog has error: ${err.message}.`);
            }
            break;
        case 'blog-1':
            try {
                let resp = await blog.find({});
                return resp;
            } catch (err) {
                console.log(`FindOrCreate: blog-1 has error: ${err.message}.`);
            }
            break;
        case 'blogCategories':
            try {
                if (req) {
                    let resp = await blogCategories.findOne({ _id: req });
                    if (!resp) {
                        await (new blogCategories({
                            _id: req,
                        })).save();

                        return resp = await blogCategories.findOne({ _id: req });
                    } else {
                        return resp;
                    }
                }
            } catch (err) {
                console.log(`FindOrCreate: blogCategories has error: ${err.message}.`);
            }
            break;
        case 'GuildSettings':
            try {
                if (req) {
                    let resp = await GuildSettings.findOne({ guildID: req.params.guildID });
                    if (!resp) {
                        await (new GuildSettings({
                            guildID: req.params.guildID,
                        })).save();

                        return resp = await GuildSettings.findOne({ guildID: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await GuildSettings.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: GuildSettings has error: ${err.message}.`);
            }
            break;
        case 'GuildSettings-1':
            try {
                let resp = await publicServers.findOne({ vanityURL: req });
                return resp;
            } catch (err) {
                console.log(`FindOrCreate: GuildSettings-1 has error: ${err.message}.`);
            }
            break;
        case 'AutoAnimes':
            try {
                if (req) {
                    let resp = await AutoAnimes.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new AutoAnimes({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await AutoAnimes.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await AutoAnimes.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: AutoAnimes has error: ${err.message}.`);
            }
            break;
        case 'AniversarioSchema':
            try {
                if (req) {
                    let resp = await AniversarioSchema.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new AniversarioSchema({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await AniversarioSchema.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await AniversarioSchema.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: AniversarioSchema has error: ${err.message}.`);
            }
            break;
        case 'autoCovid':
            try {
                if (req) {
                    let resp = await autoCovid.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new autoCovid({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await autoCovid.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await autoCovid.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: autoCovid has error: ${err.message}.`);
            }
            break;
        case 'AutoTwitch':
            try {
                if (req) {
                    let resp = await AutoTwitch.find({ guildID: req.params.guildID });
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: AutoTwitch has error: ${err.message}.`);
            }
            break;
        case 'AutoTwitch-Find':
            try {
                if (req) {
                    let resp = await AutoTwitch.findOne({ guildID: req, ChannelName: find });
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: AutoTwitch-Find has error: ${err.message}.`);
            }
            break;
        case 'AutoTwitch-New':
            try {
                if (req) {
                    const newdb = await (new AutoTwitch({
                        guildID: req[0],
                        ChannelName: req[1],
                        DiscordServer: req[2],
                        ChannelToPost: req[3],
                        authToken: req[4],
                        customMsg: req[5],
                        roleNotify: req[6],
                    })).save();

                    return newdb;
                }
            } catch (err) {
                console.log(`FindOrCreate: AutoTwitch-New has error: ${err.message}.`);
            }
            break;
        case 'AutoYoutube':
            try {
                if (req) {
                    let resp = await AutoYoutube.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new AutoYoutube({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await AutoYoutube.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await AutoYoutube.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: AutoYoutube has error: ${err.message}.`);
            }
            break;
        case 'welcomeDB':
            try {
                if (req) {
                    let resp = await welcomeDB.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new welcomeDB({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await welcomeDB.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await welcomeDB.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: welcomeDB has error: ${err.message}.`);
            }
            break;
        case 'welcome':
            try {
                if (req) {
                    let resp = await welcome.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new welcome({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await welcome.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await welcome.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: welcome has error: ${err.message}.`);
            }
            break;
        case 'ReactionRoleSchema-1':
            try {
                if (req) {
                    let resp = await ReactionRoleSchema.findOne({ guildID: req.params.guildID, messageID: req.body.messageID });

                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: ReactionRoleSchema-1 has error: ${err.message}.`);
            }
            break;
        case 'ReactionRoleSchema-3':
            try {
                if (req) {
                    let resp = await ReactionRoleSchema.findOne({ guildID: req[0], messageID: req[1] });
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: ReactionRoleSchema-3 has error: ${err.message}.`);
            }
            break;
        case 'ReactionRoleSchema-New':
            try {
                if (req) {
                    let resp = await (new ReactionRoleSchema({
                        guildID: req[0],
                        messageID: req[1],
                        channelID: req[2],
                        dm: req[3],
                        option: req[4],
                    })).save();

                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: ReactionRoleSchema-New has error: ${err.message}.`);
            }
            break;
        case 'ReactionRoleSchema-2':
            try {
                if (req) {
                    let resp = await ReactionRoleSchema.find({ guildID: req.params.guildID });
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: ReactionRoleSchema-2 has error: ${err.message}.`);
            }
            break;
        case 'stickyRole':
            try {
                if (req) {
                    let resp = await stickyRole.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new stickyRole({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await stickyRole.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await stickyRole.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: stickyRole has error: ${err.message}.`);
            }
            break;
        case 'ticketEmbedSchema':
            try {
                if (req) {
                    let resp = await ticketEmbedSchema.findOne({ tembed_sID: req.params.guildID });
                    if (!resp) {
                        await (new ticketEmbedSchema({
                            tembed_sID: req.params.guildID,
                        })).save();

                        return resp = await ticketEmbedSchema.findOne({ tembed_sID: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await ticketEmbedSchema.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: ticketEmbedSchema has error: ${err.message}.`);
            }
            break;
        case 'loggingSystem':
            try {
                if (req) {
                    let resp = await loggingSystem.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new loggingSystem({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await loggingSystem.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await loggingSystem.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: loggingSystem has error: ${err.message}.`);
            }
            break;
        case 'autoResponse-1':
            try {
                if (req) {
                    let resp = await autoResponse.find({ guildId: req.params.guildID });
                    if (!resp) {
                        await (new autoResponse({
                            guildId: req.params.guildID,
                        })).save();

                        return resp = await autoResponse.findOne({ guildId: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await autoResponse.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: autoResponse has error: ${err.message}.`);
            }
            break;
        case 'autoResponse-2':
            try {
                if (req) {
                    let resp = await autoResponse.findOne({ guildId: req.params.guildID, name: req.body.trigger });

                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: autoResponse-2 has error: ${err.message}.`);
            }
            break;
        case 'autoResponse-3':
            try {
                if (req) {
                    let resp = await autoResponse.findOne({ guildId: req[0], name: req[1] });
                    if (!resp) {
                        await (new autoResponse({
                            guildId: req[0],
                            name: req[1],
                            content: req[2]
                        })).save();

                        return resp = autoResponse.findOne({ guildId: req[0], name: req[1] });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await autoResponse.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: autoResponse-3 has error: ${err.message}.`);
            }
            break;
        case 'Sticky':
            try {
                if (req) {
                    let resp = await Sticky.findOne({ guildId: req.params.guildID });
                    if (!resp) {
                        await (new Sticky({
                            guildId: req.params.guildID,
                        })).save();

                        return resp = await Sticky.findOne({ guildId: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await Sticky.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: Sticky has error: ${err.message}.`);
            }
            break;
        case 'Rank_de_Reputações':
            try {
                if (req) {
                    let resp = await Rank_de_Reputações.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new Rank_de_Reputações({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await Rank_de_Reputações.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await Rank_de_Reputações.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: Rank_de_Reputações has error: ${err.message}.`);
            }
            break;
        case 'applicationsDB':
            try {
                if (req) {
                    let resp = await applicationsDB.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new applicationsDB({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await applicationsDB.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await applicationsDB.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: applicationsDB has error: ${err.message}.`);
            }
            break;
        case 'Economia':
            try {
                if (req) {
                    let resp = await Economia.findOne({ _id: req.params.guildID });
                    if (!resp) {
                        await (new Economia({
                            _id: req.params.guildID,
                        })).save();

                        return resp = await Economia.findOne({ _id: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await Economia.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: Economia has error: ${err.message}.`);
            }
            break;
        case 'RankSchema':
            try {
                if (req) {
                    let resp = await RankSchema.find({ guildID: req.params.guildID }).sort([
                        ['Xp', 'descending'],
                    ]).limit(100);

                    return resp;
                } else {
                    let resp = await RankSchema.find().sort([
                        ['Xp', 'descending'],
                    ]).limit(100);

                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: RankSchema has error: ${err.message}.`);
            }
            break;
        case 'actionLog':
            try {
                if (req) {
                    let resp = await actionLog.find({ guildID: req.params.guildID }).limit(5).sort([['data', 'descending']]);
                    if (!resp) {
                        await (new actionLog({
                            guildID: req.params.guildID,
                        })).save();

                        return resp = await actionLog.find({ guildID: req.params.guildID }).limit(5).sort([['data', 'descending']]);
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await actionLog.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: actionLog has error: ${err.message}.`);
            }
            break;
        case 'newsDB':
            try {
                if (req) {
                    let resp = await newsDB.find({ id: "Hope" }).limit(5).sort([['date', 'descending'],]);

                    return resp;
                } else {
                    let resp = await newsDB.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: newsDB has error: ${err.message}.`);
            }
            break;
        case 'publicServers':
            try {
                let resp = await publicServers.find({ enabled: true });
                if (resp.lenght <= 1) {
                    await (new publicServers({
                        guildID: req.params.guildID,
                    })).save();

                    return resp = await publicServers.find({ toggle: true });
                }
                return resp;
            } catch (err) {
                console.log(`FindOrCreate: publicServers has error: ${err.message}.`);
            }
            break;
        case 'publicServers-1':
            try {
                let resp = await publicServers.find({ enabled: true }).sort([
                    ['guildMembers', 'descending'],
                ]).limit(8);
                if (resp.lenght <= 1) {
                    await (new publicServers({
                        guildID: req.params.guildID,
                    })).save();

                    return resp = await publicServers.find({ toggle: true });
                }
                return resp;
            } catch (err) {
                console.log(`FindOrCreate: publicServers-2 has error: ${err.message}.`);
            }
            break;
        case 'publicServers-3':
            try {
                if (req) {
                    let resp = await publicServers.findOne({ enabled: true, guildID: req.params.guildID });
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: publicServers-3 has error: ${err.message}.`);
            }
            break;
        case 'publicServers-4':
            try {
                if (req) {
                    let resp = await publicServers.findOne({ guildID: req[1] });
                    if (!resp) {
                        await (new publicServers({
                            enabled: req[0],
                            guildID: req[1],
                            description: req[2],
                            inviteURL: req[3],
                            defaultInviteChannel: req[4],
                            mainServerLanguage: req[5],
                            categories: req[6],
                            tags: req[7],
                            youtubeURL: req[8],
                            twitchURL: req[9],
                            twitterURL: req[10],
                            redditURL: req[11]
                        })).save();

                        return resp = await publicServers.findOne({ guildID: req[1] });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await publicServers.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: publicServers-4 has error: ${err.message}.`);
            }
            break;
        case 'publicServers-5':
            try {
                if (req) {
                    let resp = await publicServers.findOne({ guildID: req.params.guildID });
                    if (!resp) {
                        await (new publicServers({
                            enabled: false,
                            guildID: req.params.guildID,
                        })).save();

                        return resp = await publicServers.findOne({ guildID: req.params.guildID });
                    } else {
                        return resp;
                    }
                } else {
                    let resp = await publicServers.find();
                    return resp;
                }
            } catch (err) {
                console.log(`FindOrCreate: publicServers-5 has error: ${err.message}.`);
            }
            break;
        case 'ticketReação':
            try {
                let resp;
                await (new ticketReação({
                    messageID: req[0],
                    channelID: req[1],
                    buttonID: req[2],
                    emoji: req[3],
                    guildID: req[4],
                })).save();

                return resp = await ticketReação.findOne({ guildID: req[4], });
            } catch (err) {
                console.log(`FindOrCreate: ticketReação has error: ${err.message}.`);
            }
            break;
        case 'transcript':
            try {
                let resp;
                await (new transcript({
                    _id: req[0],
                    by: req[0],
                    type: "form",
                    expiresAt: new Date(Date.now() + (2629800000)),
                })).save();

                return resp = await transcript.findOne({ _id: req[0], });
            } catch (err) {
                console.log(`FindOrCreate: transcript has error: ${err.message}.`);
            }
            break;
    }
}

const findAndDelete = async (req, db, find) => {

    switch (db) {
        case 'AutoTwitch':
            try {
                if (req) {
                    await AutoTwitch.deleteOne({
                        guildID: req.params.guildID,
                        ChannelName: find,
                    });
                }
            } catch (err) {
                console.log(`FindAndDelete: Auto-Twitch has error: ${err.message}.`);
            }
            break;
        case 'ReactionRoleSchema':
            try {
                if (req) {
                    await ReactionRoleSchema.deleteOne({
                        guildID: req.params.guildID
                    });
                }
            } catch (err) {
                console.log(`FindAndDelete: GuildSettings has error: ${err.message}.`);
            }
            break;
        case 'AutoResponse':
            try {
                if (req) {
                    await autoResponse.deleteOne({
                        guildId: req.params.guildID,
                        name: find
                    });
                }
            } catch (err) {
                console.log(`FindAndDelete: AutoResponse has error: ${err.message}.`);
            }
            break;
    }
}

const getChannelMessage = async (channelID, messageID, token) => {
    const gdata = await fetch(`https://discord.com/api/channels/${channelID}/messages/${messageID}`, { method: 'GET', headers: { 'Authorization': `Bot ${token}`, 'Content-Type': 'application/json' } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return gdata;
}

const createMessage = async (channelID, token, data) => {
    const gdata = await fetch(`https://discord.com/api/channels/${channelID}/messages`, { method: 'POST', body: JSON.stringify(data), headers: { 'Authorization': `Bot ${token}`, 'Content-Type': 'application/json' } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });
    return gdata;
}

const putEmoji = async (channelID, token, messageID, emoji) => {
    const gdata = await fetch(`https://discord.com/api/channels/${channelID}/messages/${messageID}/reactions/${emoji}/@me`, { method: 'PUT', headers: { 'Authorization': `Bot ${token}` } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return gdata;
}

const getGuildData = async (id, token) => {
    const gdata = await fetch(`https://discord.com/api/guilds/${id}?with_counts=true`, { method: 'GET', headers: { 'Authorization': `Bot ${token}` } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return gdata;
}

const getUserFromGuild = async (userID, guildID, token) => {
    const gdata = await fetch(`https://discord.com/api/guilds/${guildID}/members/${userID}`, { method: 'GET', headers: { 'Authorization': `Bot ${token}` } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return gdata;
}

const getAllAnimes = async (query, variables) => {
    const adata = await fetch(`https://graphql.anilist.co`, { method: 'POST', body: JSON.stringify({ query, variables }), headers: { 'Content-Type': 'application/json', "Accept": "application/json" } }).then(res => res.json()).catch(err => {
        if (err.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return adata;
}

const findEmoji = async () => {
    const adata = await fetch(`https://unpkg.com/emoji.json@13.1.0/emoji.json`, { method: 'GET', headers: { 'Content-Type': 'application/json', "Accept": "application/json" } }).then(res => res.json()).catch(err => {
        if (err.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return adata;
}

const genID = (max, string) => {
    const length = max,
        charset = string ?? '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = length; i > 0; --i) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
};

const sendWebhook = async (id, webtoken, data, token) => {
    const gdata = await fetch(`https://discord.com/api/webhooks/${id}/${webtoken}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Authorization': `Bot ${token}`, 'Content-Type': 'application/json' } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return console.log(e);
        }
    });

    return gdata;
}

const getUser = async (userID, token) => {
    const gdata = await fetch(`https://discord.com/api/users/${userID}`, { method: 'GET', headers: { 'Authorization': `Bot ${token}` } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return res.redirect("/dashboard");
        }
    });

    return gdata;
}

module.exports = {
    createLog,
    findGuild,
    findUser,
    getUser,
    findLogs,
    getTopGuilds,
    getChannels,
    getRoles,
    getCommands,
    getPermissions,
    updateSettings,
    findOrCreate,
    findAndDelete,
    createMessage,
    getChannelMessage,
    putEmoji,
    getGuildData,
    getUserFromGuild,
    getAllAnimes,
    findEmoji,
    genID,
    sendWebhook,
    createPost,
}

/* const getDiscordTokens = async (code, redirectUri) => {
    const tokensUrl = 'https://discord.com/api/oauth2/token'
    const data = new URLSearchParams()
    data.set('client_id', process.env.discord_client_id)
    data.set('client_secret', process.env.discord_client_secret)
    data.set('grant_type', 'authorization_code')
    data.set('code', code)
    data.set('redirect_uri', redirectUri)

    const response = await axios.post(tokensUrl, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })


    return response.data
}
*/