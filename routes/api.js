const express = require("express"),
    { welcomeDB, GuildSettings, AutoReddit, welcome, customCommandSchema, autoResponse, actionLog, RankSchema, AutoAnimes, autoCovid, AutoTwitch, AutoYoutube, ReactionRoleSchema, rrEmbed, stickyRole, loggingSystem, Rank_de_Reputações, applicationsDB, transcript, AniversariantesSchema, AniversarioSchema, GiveawaySchema, Sticky, SugestãoDB, ticketFunçõesSchema, timeEventSchema, WarningSchema, Economia, nickDB, shortUrl, Reputação, votesCheck, usernamesDB, LembreteDB, PlaylistSchema, ticketEmbedSchema, newsDB } = require('../database/models/index'),
    { var: { createLog, findGuild, genID, getUserFromGuild, getPermissions, findOrCreate, getChannels } } = require("../helpers"),
    fs = require('fs'),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.originalUrl;
    res.redirect("/login");
}

// Auto data fetching for logged in users
router.get("/api/v2/me", async (req, res, next) => {
    try {
        if (!req.user) return res.redirect("/403");
        res.setHeader("Content-Type", "application/json");
        let Economy_Data = await Economia.find({ _id: req.user.id });
        let Birthday_Data = await AniversariantesSchema.find({ userID: req.user.id });
        let Giveaway_Data = await GiveawaySchema.find({ hostedBy: req.user.id });
        let Giveaway_Data1 = await GiveawaySchema.find({ winners: req.user.id });
        let Moderation_Data = [];
        let Premium_Data = [];
        const conditional = {
            isPremium: "true",
        }
        const results = await GuildSettings.find(conditional)
        for (const result of results) {
            if (result.premium.redeemedBy.id === req.user.id) Premium_Data.push(`premium.redeemedBy.id: '${req.user.id}'`);
        }

        const mod1 = {
            Auto_ModIgnoreUser: req.user.id,
        }
        const AutoMod_Data1 = await GuildSettings.find(mod1)
        for (const result of AutoMod_Data1) {
            if (result.Auto_ModIgnoreUser === req.user.id) Moderation_Data.push(`Auto_ModIgnoreUser: ['${req.user.id}']`);
        }

        const mod2 = {
            Auto_ModIgnoreUser: req.user.id,
        }
        const AutoMod_Data2 = await GuildSettings.find(mod2)
        for (const result of AutoMod_Data2) {
            if (result.Auto_ModBadwordsUser === req.user.id) Moderation_Data.push(`Auto_ModBadwordsUser: ['${req.user.id}']`);
        }

        const mod3 = {
            Auto_ModAntiInviteUser: req.user.id,
        }
        const AutoMod_Data3 = await GuildSettings.find(mod3)
        for (const result of AutoMod_Data3) {
            if (result.Auto_ModAntiInviteUser === req.user.id) Moderation_Data.push(`Auto_ModAntiInviteUser: ['${req.user.id}']`);
        }

        const mod4 = {
            Auto_ModAntiExternalLinksUser: req.user.id,
        }
        const AutoMod_Data4 = await GuildSettings.find(mod4)
        for (const result of AutoMod_Data4) {
            if (result.Auto_ModAntiExternalLinksUser === req.user.id) Moderation_Data.push(`Auto_ModAntiExternalLinksUser: ['${req.user.id}']`);
        }

        const mod5 = {
            Auto_ModAntiCapsUser: req.user.id,
        }
        const AutoMod_Data5 = await GuildSettings.find(mod5)
        for (const result of AutoMod_Data5) {
            if (result.Auto_ModAntiCapsUser === req.user.id) Moderation_Data.push(`Auto_ModAntiCapsUser: ['${req.user.id}']`);
        }

        const mod6 = {
            Auto_ModAntiMassMentionsUser: req.user.id,
        }
        const AutoMod_Data6 = await GuildSettings.find(mod6)
        for (const result of AutoMod_Data6) {
            if (result.Auto_ModAntiMassMentionsUser === req.user.id) Moderation_Data.push(`Auto_ModAntiMassMentionsUser: ['${req.user.id}']`);
        }

        const mod7 = {
            Auto_ModAntiMassMentionsUser: req.user.id,
        }
        const AutoMod_Data7 = await GuildSettings.find(mod7)
        for (const result of AutoMod_Data7) {
            if (result.Auto_ModAntiMassLinesUser === req.user.id) Moderation_Data.push(`Auto_ModAntiMassLinesUser: ['${req.user.id}']`);
        }

        const mod8 = {
            Auto_ModAntiMassMentionsUser: req.user.id,
        }
        const AutoMod_Data8 = await GuildSettings.find(mod8)
        for (const result of AutoMod_Data8) {
            if (result.Auto_ModAntiEveryoneUser === req.user.id) Moderation_Data.push(`Auto_ModAntiEveryoneUser: ['${req.user.id}']`);
        }

        const mod9 = {
            Auto_ModAntiNsfwUser: req.user.id,
        }
        const AutoMod_Data9 = await GuildSettings.find(mod9)
        for (const result of AutoMod_Data9) {
            if (result.Auto_ModAntiNsfwUser === req.user.id) Moderation_Data.push(`Auto_ModAntiNsfwUser: ['${req.user.id}']`);
        }

        const mod10 = {
            Auto_ModAntiMassMentionsUser: req.user.id,
        }
        const AutoMod_Data10 = await GuildSettings.find(mod10)
        for (const result of AutoMod_Data10) {
            if (result.Auto_ModAntiSpamUser === req.user.id) Moderation_Data.push(`Auto_ModAntiSpamUser: ['${req.user.id}']`);
        }

        const mod11 = {
            Auto_ModAntiAltAllowed: req.user.id,
        }
        const AutoMod_Data11 = await GuildSettings.find(mod11)
        for (const result of AutoMod_Data11) {
            if (result.Auto_ModAntiAltAllowed === req.user.id) Moderation_Data.push(`Auto_ModAntiAltAllowed: ['${req.user.id}']`);
        }

        const mod12 = {
            Auto_ModAntiAltAllowed: req.user.id,
        }
        const AutoMod_Data12 = await GuildSettings.find(mod12)
        for (const result of AutoMod_Data12) {
            if (result.Auto_ModAntiMassEmojisUser === req.user.id) Moderation_Data.push(`Auto_ModAntiMassEmojisUser: ['${req.user.id}']`);
        }

        const mod13 = {
            Auto_ModAntiMassSpoilersUser: req.user.id,
        }
        const AutoMod_Data13 = await GuildSettings.find(mod13)
        for (const result of AutoMod_Data13) {
            if (result.Auto_ModAntiMassEmojisUser === req.user.id) Moderation_Data.push(`Auto_ModAntiMassSpoilersUser: ['${req.user.id}']`);
        }

        const mod14 = {
            Auto_ModAntiZAlgoUser: req.user.id,
        }
        const AutoMod_Data14 = await GuildSettings.find(mod14)
        for (const result of AutoMod_Data14) {
            if (result.Auto_ModAntiZAlgoUser === req.user.id) Moderation_Data.push(`Auto_ModAntiZAlgoUser: ['${req.user.id}']`);
        }

        let Nicknames_Data = await nickDB.find({ discordId: req.user.id });

        let Level_Data = await RankSchema.find({ userID: req.user.id });

        let Reminder_Data = await LembreteDB.find({ toMention: req.user.id });

        let Rep_Data = await Reputação.find({ userID: req.user.id });

        let ShortURL_Data = await shortUrl.find({ memberID: req.user.id });

        let Infractions_Data = await timeEventSchema.find({ userID: req.user.id });

        let Transcripts_Data = await transcript.find({ by: req.user.id });

        let Usernames_Data = await usernamesDB.find({ discordId: req.user.id });

        let Votes_Data = await votesCheck.find({ _id: req.user.id });

        let Warnings_Data = await WarningSchema.find({ userID: req.user.id });

        let data = {
            Your_Data: "Within this json file lies all of your collected data.",
            Economy_Data: Economy_Data,
            Birthday_Data: Birthday_Data,
            Giveaway_Data: Giveaway_Data,
            Giveaway_Data: Giveaway_Data1,
            Premium_Data: Premium_Data,
            Moderation_Data: Moderation_Data,
            Nicknames_Data: Nicknames_Data,
            Usernames_Data: Usernames_Data,
            Level_Data: Level_Data,
            Reminder_Data: Reminder_Data,
            Rep_Data: Rep_Data,
            ShortURL_Data: ShortURL_Data,
            Infractions_Data: Infractions_Data,
            Transcripts_Data: Transcripts_Data,
            Votes_Data: Votes_Data,
            Warnings_Data: Warnings_Data,
        };
        res.end(JSON.stringify(data));
    } catch (error) {
        next(error)
    }
});

/** ------------------------------------------------------------------------------------------------
* [TOOL] API [V2] FOR GUILD
* ------------------------------------------------------------------------------------------------ */

// Guild Info by ID
router.get("/api/v2/guild/:guildID", checkAuth, async (req, res, next) => {
    try {
        if (!req.user) return res.redirect("/403");
        res.setHeader("Content-Type", "application/json");
        let Guild_Data = await GuildSettings.find({ guildID: req.params.id });
        if (!Guild_Data) {
            return res.end(
                JSON.stringify({ error: true, message: "The guild data for this request was not found." })
            );
        }
        // Find Guild
        const guild = await findGuild(req, res);
        if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
        if (!guild) return res.redirect("/dashboard");

        // Find User
        const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
        if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

        /* if (!member.permissions.has("MANAGE_GUILD")) {
             return res.end(
                 JSON.stringify({ error: true, message: "The guild data for this request was not found." })
             );
         } */

        if (!member) {
            return res.end(
                JSON.stringify({ error: true, message: "The guild data for this request was not found." })
            );
        }

        let Birthday_Data = await AniversariantesSchema.find({ guildID: req.params.guildID });
        let Birthday_ADDON_Data = await AniversarioSchema.find({ _id: req.params.guildID });
        let Applications_ADDON_Data = await applicationsDB.find({ _id: req.params.guildID });
        let AutoAnimes_ADDON_Data = await AutoAnimes.find({ _id: req.params.guildID });
        let AutoCovid_ADDON_Data = await autoCovid.findOne({ _id: req.params.guildID });
        if (!AutoCovid_ADDON_Data) {
            const newSettings1 = new autoCovid({
                _id: guild.id
            });
            await newSettings1.save().catch(() => { });
            AutoCovid_ADDON_Data = await autoCovid.findOne({ _id: guild.id });
        }
        let AutoResponse_ADDON_Data = await autoResponse.find({ guildId: req.params.guildID });
        let AutoTwitch_ADDON_Data = await AutoTwitch.find({ guildID: req.params.guildID });
        let AutoYoutube_ADDON_Data = await AutoYoutube.find({ _id: req.params.guildID });
        let Economy_Data = await Economia.find({ _id: req.params.guildID });
        let Giveaways_Data = await GiveawaySchema.find({ guildID: req.params.guildID });
        let Loggings_Events_Data = await loggingSystem.find({ _id: req.params.guildID });
        let Nicknames_Data = await nickDB.find({ guildId: req.params.guildID });
        let RepRanking_ADDON_Data = await Rank_de_Reputações.find({ _id: req.params.guildID });
        let Level_ADDON_Data = await RankSchema.find({ guildID: req.params.guildID });
        let ReactionRoles_ADDON_Data = await rrEmbed.find({ rrembed_sID: req.params.guildID });
        let Sticky_ADDON_Data = await Sticky.find({ guildId: req.params.guildID });
        let StickyRole_ADDON_Data = await stickyRole.find({ _id: req.params.guildID });
        let Suggestion_ADDON_Data = await SugestãoDB.find({ _id: req.params.guildID });
        let TicketReaction_ADDON_Data = await ticketFunçõesSchema.find({ guildID: req.params.guildID });
        let Infractions_Data = await timeEventSchema.find({ guildID: req.params.guildID });
        let Warnings_Data = await WarningSchema.find({ guildID: req.user.id });
        let Welcome_ADDON_Data = await welcomeDB.find({ _id: req.user.id });

        let data = {
            Guild_Data: Guild_Data,
            Birthday_Data: Birthday_Data,
            Birthday_ADDON_Data: Birthday_ADDON_Data,
            Applications_ADDON_Data: Applications_ADDON_Data,
            AutoAnimes_ADDON_Data: AutoAnimes_ADDON_Data,
            AutoCovid_ADDON_Data: AutoCovid_ADDON_Data,
            AutoResponse_ADDON_Data: AutoResponse_ADDON_Data,
            AutoTwitch_ADDON_Data: AutoTwitch_ADDON_Data,
            AutoYoutube_ADDON_Data: AutoYoutube_ADDON_Data,
            Economy_Data: Economy_Data,
            Giveaways_Data: Giveaways_Data,
            Loggings_Events_Data: Loggings_Events_Data,
            Nicknames_Data: Nicknames_Data,
            RepRanking_ADDON_Data: RepRanking_ADDON_Data,
            Level_ADDON_Data: Level_ADDON_Data,
            ReactionRoles_ADDON_Data: ReactionRoles_ADDON_Data,
            Sticky_ADDON_Data: Sticky_ADDON_Data,
            StickyRole_ADDON_Data: StickyRole_ADDON_Data,
            Suggestion_ADDON_Data: Suggestion_ADDON_Data,
            TicketReaction_ADDON_Data: TicketReaction_ADDON_Data,
            Infractions_Data: Infractions_Data,
            Warnings_Data: Warnings_Data,
            Welcome_ADDON_Data: Welcome_ADDON_Data,
        };
        res.end(JSON.stringify(data));
    } catch (error) {
        next(error)
    }
});

/** ------------------------------------------------------------------------------------------------
* [TOOL] API [V2] LOGGING
* ------------------------------------------------------------------------------------------------ */
router.get("/api/v2/logs", checkAuth, async (req, res, next) => {
    try {
        if (req.originalUrl !== '/favicon.ico' || req.debug) {
            console.log(`IP: ${req.connection.remoteAddress.slice(7)} -> ${req.originalUrl}`);
        }

        if (!req.user) return res.redirect("/403");

        if (process.env.API_SECURE && process.env.API_TOKEN !== req.query.token) {
            return res.json({ error: 'Invalid API token' });
        }

        res.setHeader("Content-Type", "application/json");

        const date = req.query.date ?? new Date().toLocaleDateString('EN-GB').split('/').reverse().join('.');
        try {
            const data = fs.readFileSync(`${process.cwd()}/utils/logs/roll-${date}.log`, 'utf8');
            res.status(200).json({ date, logs: data.split(' \r\n') });
        } catch (err) {
            return res.end(
                JSON.stringify({ error: true, message: err.message })
            );
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;