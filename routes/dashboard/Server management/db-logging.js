const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/logging", checkAuth, async (req, res, next) => {
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

        const logSettings = await findOrCreate(req, 'loggingSystem');

        // Check Guild Premium Status
        let premium;
        if (isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Server Management/logging", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            log: logSettings,
            premium: premium,
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

router.post("/dashboard/:guildID/logging", checkAuth, async (req, res, next) => {
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
        const logSettings = await findOrCreate(req, 'loggingSystem');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        if (Object.prototype.hasOwnProperty.call(req.body, 'ban')) {
            logSettings.ModerationEvents.BanToggle = true;
        } else {
            logSettings.ModerationEvents.BanToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'kick')) {
            logSettings.ModerationEvents.KickToggle = true;
        } else {
            logSettings.ModerationEvents.KickToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'role-a')) {
            logSettings.ModerationEvents.RoleToggle = true;
        } else {
            logSettings.ModerationEvents.RoleToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'purge')) {
            logSettings.ModerationEvents.PurgeToggle = true;
        } else {
            logSettings.ModerationEvents.PurgeToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'lock')) {
            logSettings.ModerationEvents.LockToggle = true;
        } else {
            logSettings.ModerationEvents.LockToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'warns')) {
            logSettings.ModerationEvents.WarnToggle = true;
        } else {
            logSettings.ModerationEvents.WarnToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'mute')) {
            logSettings.ModerationEvents.MuteToggle = true;
        } else {
            logSettings.ModerationEvents.MuteToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'slowmode')) {
            logSettings.ModerationEvents.SlowmodeToggle = true;
        } else {
            logSettings.ModerationEvents.SlowmodeToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'nicknames')) {
            logSettings.ModerationEvents.NicknameToggle = true;
        } else {
            logSettings.ModerationEvents.NicknameToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'reports')) {
            logSettings.ModerationEvents.ReportToggle = true;
        } else {
            logSettings.ModerationEvents.ReportToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'moderation_channel')) {
            let channelValid = req.body.moderation_channel;

            if (channelValid) {
                logSettings.ModerationEvents.LogChannel = req.body.moderation_channel;
                logSettings.ModerationEvents.Toggle = true;

            } else {
                logSettings.ModerationEvents.LogChannel = null;
                logSettings.ModerationEvents.Toggle = false;

            }
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'color')) {
            logSettings.ModerationEvents.EmbedColor = req.body.color;
        } else {
            logSettings.ModerationEvents.EmbedColor = `#000000`;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'channel_created')) {
            logSettings.ServerEvents.ChannelCreateToggle = true;
        } else {
            logSettings.ServerEvents.ChannelCreateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'channel_update')) {
            logSettings.ServerEvents.ChannelUpdateToggle = true;
        } else {
            logSettings.ServerEvents.ChannelUpdateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'channel_delete')) {
            logSettings.ServerEvents.ChannelDeleteToggle = true;
        } else {
            logSettings.ServerEvents.ChannelDeleteToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'role_create')) {
            logSettings.ServerEvents.RoleCreateToggle = true;
        } else {
            logSettings.ServerEvents.RoleCreateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'roleup')) {
            logSettings.ServerEvents.RoleUpdateToggle = true;
        } else {
            logSettings.ServerEvents.RoleUpdateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'guild_update')) {
            logSettings.ServerEvents.GuildUpdateToggle = true;
        } else {
            logSettings.ServerEvents.GuildUpdateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'emoji_update')) {
            logSettings.ServerEvents.EmojiUpdateToggle = true;
        } else {
            logSettings.ServerEvents.EmojiUpdateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'invite')) {
            logSettings.ServerEvents.InviteToggle = true;
        } else {
            logSettings.ServerEvents.InviteToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'thread_create')) {
            logSettings.ServerEvents.ThreadCreateToggle = true;
        } else {
            logSettings.ServerEvents.ThreadCreateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'thread_delete')) {
            logSettings.ServerEvents.ThreadDeleteToggle = true;
        } else {
            logSettings.ServerEvents.ThreadDeleteToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'threadup')) {
            logSettings.ServerEvents.ThreadUpdateToggle = true;
        } else {
            logSettings.ServerEvents.ThreadUpdateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'thread_membersupdate')) {
            logSettings.ServerEvents.ThreadMembersUpdateToggle = true;
        } else {
            logSettings.ServerEvents.ThreadMembersUpdateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'sticker_create')) {
            logSettings.ServerEvents.StickerCreateToggle = true;
        } else {
            logSettings.ServerEvents.StickerCreateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'sticker_delete')) {
            logSettings.ServerEvents.StickerDeleteToggle = true;
        } else {
            logSettings.ServerEvents.StickerDeleteToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'sticker_update')) {
            logSettings.ServerEvents.StickerUpdateToggle = true;
        } else {
            logSettings.ServerEvents.StickerUpdateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'member_join')) {
            logSettings.ServerEvents.MemberJoinToggle = true;
        } else {
            logSettings.ServerEvents.MemberJoinToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'member_leave')) {
            logSettings.ServerEvents.MemberLeaveToggle = true;
        } else {
            logSettings.ServerEvents.MemberLeaveToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'member_boosting')) {
            logSettings.ServerEvents.BoostToggle = true;
        } else {
            logSettings.ServerEvents.BoostToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'ticket')) {
            logSettings.ServerEvents.TicketingToggle = true;
        } else {
            logSettings.ServerEvents.TicketingToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'join')) {
            logSettings.ServerEvents.VoiceJoinToggle = true;
        } else {
            logSettings.ServerEvents.VoiceJoinToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'move')) {
            logSettings.ServerEvents.VoiceMoveToggle = true;
        } else {
            logSettings.ServerEvents.VoiceMoveToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'deafen')) {
            logSettings.ServerEvents.VoiceDeafenToggle = true;
        } else {
            logSettings.ServerEvents.VoiceDeafenToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'streaming')) {
            logSettings.ServerEvents.VoiceStreamingToggle = true;
        } else {
            logSettings.ServerEvents.VoiceStreamingToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'ch_server_events')) {
            let channelValid = req.body.ch_server_events;

            if (channelValid) {
                logSettings.ServerEvents.LogChannel = req.body.ch_server_events;
                logSettings.ServerEvents.Toggle = true;

            } else {
                logSettings.ServerEvents.LogChannel = null;
                logSettings.ServerEvents.Toggle = false;

            }
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'color1')) {
            logSettings.ServerEvents.EmbedColor = req.body.color1;
        } else {
            logSettings.ServerEvents.EmbedColor = `#000000`;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'member_role_update')) {
            logSettings.MemberEvents.RoleUpdateToggle = true;
        } else {
            logSettings.MemberEvents.RoleUpdateToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'name_change')) {
            logSettings.MemberEvents.NameChangesToggle = true;
        } else {
            logSettings.MemberEvents.NameChangesToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'discriminator_changed')) {
            logSettings.MemberEvents.DiscriminatorChangesToggle = true;
        } else {
            logSettings.MemberEvents.DiscriminatorChangesToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'avatar_changed')) {
            logSettings.MemberEvents.AvatarChangesToggle = true;
        } else {
            logSettings.MemberEvents.AvatarChangesToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'channel_member_events')) {
            let channelValid = req.body.channel_member_events;

            if (channelValid) {
                logSettings.MemberEvents.LogChannel = req.body.channel_member_events;
                logSettings.MemberEvents.Toggle = true;

            } else {
                logSettings.MemberEvents.LogChannel = null;
                logSettings.MemberEvents.Toggle = false;

            }
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'color2')) {
            logSettings.MemberEvents.EmbedColor = req.body.color2;
        } else {
            logSettings.MemberEvents.EmbedColor = `#000000`;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'deleted')) {
            logSettings.MessageEvents.DeletedToggle = true;
        } else {
            logSettings.MessageEvents.DeletedToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'edited')) {
            logSettings.MessageEvents.EditedToggle = true;
        } else {
            logSettings.MessageEvents.EditedToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'purged')) {
            logSettings.MessageEvents.PurgedToggle = true;
        } else {
            logSettings.MessageEvents.PurgedToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'reaction')) {
            logSettings.MessageEvents.ReactionToggle = true;
        } else {
            logSettings.MessageEvents.ReactionToggle = false;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'message_events_channel')) {
            let channelValid = req.body.message_events_channel;

            if (channelValid) {
                logSettings.MessageEvents.LogChannel = req.body.message_events_channel;
                logSettings.MessageEvents.Toggle = true;

            } else {
                logSettings.MessageEvents.LogChannel = null;
                logSettings.MessageEvents.Toggle = false;

            }
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'color3')) {
            logSettings.MessageEvents.EmbedColor = req.body.color3;
        } else {
            logSettings.MessageEvents.EmbedColor = `#000000`;
        }

        // Create a Action Log
        await createLog(req, 'Updated Logging');
        await logSettings.save().catch(() => { });

        res.render("Dashboard/Server Management/logging", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            log: logSettings,
            ch: ch,
            rr: rr,
            error: '',
            success: 'Logging successfully updated',
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;