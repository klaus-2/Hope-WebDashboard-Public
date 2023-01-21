const express = require("express"),
  { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
  router = express.Router();

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect("/login");
}

router.get("/dashboard/:guildID/auto-birthdays", checkAuth, async (req, res, next) => {
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
    const dbNiver = await findOrCreate(req, 'AniversarioSchema');

    // Get All Guild Channels
    const ch = await getChannels(req, res);

    // Get All Guild Roles
    const rr = await getRoles(req, res);

    res.render("Dashboard/Engagement & Fun/auto-birthdays.ejs", {
      translate: req.translate,
      req: req,
      user: req.session.user,
      guild: guild,
      settings: settings,
      premium: premium,
      member: member,
      dbNiver: dbNiver,
      ch: ch,
      rr: rr,
      error: '',
      success: '',
    });
  } catch (error) {
    next(error)
  }
});

router.post("/dashboard/:guildID/auto-birthdays", checkAuth, async (req, res, next) => {
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
    const dbNiver = await findOrCreate(req, 'AniversarioSchema');

    // Get All Guild Channels
    const ch = await getChannels(req, res);

    // Get All Guild Roles
    const rr = await getRoles(req, res);

    if (Object.prototype.hasOwnProperty.call(req.body, 'toggle')) {
      dbNiver.toggle = true;
      await dbNiver.save().catch(() => { })
    } else {
      dbNiver.toggle = false;
      await dbNiver.save().catch(() => { })
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'ch')) {
      // Auto-Anime Channel
      let birthChannel = req.body.ch;
      if (birthChannel !== "disabled") {
        dbNiver.channelID = birthChannel;
      } else {
        dbNiver.channelID = null;
      }
      // Salvando dados no banco de dados
      await dbNiver.save().catch(() => { })
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'dm')) {
      dbNiver.private = true;
      await dbNiver.save().catch(() => { })
    } else {
      dbNiver.private = false;
      await dbNiver.save().catch(() => { })
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'notifyType')) {
      if (req.body.notifyType == "everyone") {
        dbNiver.mentionType = 'everyone';
      } else if (req.body.notifyType == "role") {
        dbNiver.mentionType = 'role';
      } else if (req.body.notifyType == "none") {
        dbNiver.mentionType = 'none';
      }
      await dbNiver.save().catch(() => { })
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'roleNotify')) {
      let role = req.body.roleNotify;
      if (role !== "none") {
        dbNiver.roleID = req.body.roleNotify;
      } else {
        dbNiver.roleID = null;
      }
      await dbNiver.save().catch(() => { })
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'settingsType')) {
      if (req.body.settingsType == "default") {
        dbNiver.messageType = 'default';
        await dbNiver.save().catch(() => { })
      } else if (req.body.settingsType == "text") {
        dbNiver.messageType = 'text';
        dbNiver.messageText = req.body.inText;
        await dbNiver.save().catch(() => { })
      } else if (req.body.settingsType == "embed") {
        dbNiver.messageType = 'embed';
        let authorIcon = req.body.leave_author_icon;
        if (authorIcon) {
          dbNiver.embed.author.icon = authorIcon;
          await dbNiver.save().catch(() => { })
        }

        let authorName = req.body.leave_author_name;
        if (authorName) {
          dbNiver.embed.author.name = authorName;
          await dbNiver.save().catch(() => { })
        }

        let authorURL = req.body.leave_author_url;
        if (authorURL) {
          dbNiver.embed.author.url = authorURL;
          await dbNiver.save().catch(() => { })
        }

        let title = req.body.leave_embedTitle;
        if (title) {
          dbNiver.embed.title = title;
          await dbNiver.save().catch(() => { })
        }

        let titleURL = req.body.leave_embedTitleURL;
        if (titleURL) {
          dbNiver.embed.itleURL = titleURL;
          await dbNiver.save().catch(() => { })
        }

        let description = req.body.leave_embedDescription;
        if (description) {
          dbNiver.embed.description = description;
          await dbNiver.save().catch(() => { })
        }

        let thumbnail = req.body.leave_embedThumbnail;
        if (thumbnail) {
          dbNiver.embed.thumbnail = thumbnail;
          await dbNiver.save().catch(() => { })
        }

        let footer = req.body.leave_embedFooter;
        if (footer) {
          dbNiver.embed.footer = footer;
          await dbNiver.save().catch(() => { })
        }

        let footerIcon = req.body.leave_embedFooterIcon;
        if (footerIcon) {
          dbNiver.embed.footerIcon = footerIcon;
          await dbNiver.save().catch(() => { })
        }

        let image = req.body.leave_embedImage;
        if (image) {
          dbNiver.embed.image = image;
          await dbNiver.save().catch(() => { })
        }

        let timestamp = req.body.leave_timestamp;
        if (timestamp) {
          dbNiver.embed.timestamp = true;
          await dbNiver.save().catch(() => { })
        } else {
          dbNiver.embed.timestamp = false;
          await dbNiver.save().catch(() => { })
        }

        let color = req.body.leave_embedColor;
        if (color) {
          dbNiver.embed.color = color;
          await dbNiver.save().catch(() => { })
        }
      }
    }

    // Create a Action Log
    await createLog(req, 'Updated Auto-Birthdays');

    res.render("Dashboard/Engagement & Fun/auto-birthdays.ejs", {
      translate: req.translate,
      req: req,
      user: req.session.user,
      guild: guild,
      settings: settings,
      premium: premium,
      member: member,
      dbNiver: dbNiver,
      ch: ch,
      rr: rr,
      error: '',
      success: '',
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;