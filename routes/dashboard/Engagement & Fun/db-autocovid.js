const express = require("express"),
  { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
  corona = require('covid19-global'),
  router = express.Router();

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect("/login");
}

router.get("/dashboard/:guildID/auto-covid", checkAuth, async (req, res) => {

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

  // Connect to Auto-Covid Database
  const dbCovid = await findOrCreate(req, 'autoCovid');

  // Get All Guild Channels
  const ch = await getChannels(req, res);

  // Get All Guild Roles
  const rr = await getRoles(req, res);

  res.render("Dashboard/Engagement & Fun/auto-covid", {
    translate: req.translate,
    req: req,
    user: req.session.user,
    guild: guild,
    premium: premium,
    member: member,
    dbCovid: dbCovid,
    ch: ch,
    rr: rr,
    error: '',
    success: '',
  });
});

router.post("/dashboard/:guildID/auto-covid", checkAuth, async (req, res) => {

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
  if (isPremium === true) {
    premium = "Premium Server";
  } else {
    premium = "Normal Server";
  }

  // Connect to Auto-Covid Database
  const dbCovid = await findOrCreate(req, 'autoCovid');

  // Get All Guild Channels
  const ch = await getChannels(req, res);

  // Get All Guild Roles
  const rr = await getRoles(req, res);

  if (Object.prototype.hasOwnProperty.call(req.body, 'covidch')) {
    // Auto-Covid Channel
    let CovidChannel = req.body.covidch;
    if (CovidChannel) {
      dbCovid.channelID = req.body.covidch;
      dbCovid.enabled = true;

      /* AQUI MANDAR PRA API POST */
      let stats = await corona.country('World') // World Data
      const updatedTime = new Date(Date.now());

      const embed = new EmbedBuilder()
        .setAuthor({ name: req.translate('Helpers/autoCovid:AUTO_COVID'), iconURL: req.user.displayAvatarURL() })
        .setTitle(`${req.translate('Pesquisas/covid:COVID10')} <t:${Math.round(new Date(updatedTime).getTime() / 1000)}:R>`)
        .addField(
          req.translate('Helpers/autoCovid:AUTO_COVID1'),
          `**${stats.totalCases.toLocaleString()}**`,
          true
        )
        .addField(
          req.translate('Helpers/autoCovid:AUTO_COVID2'),
          `+${stats.newCases.toLocaleString()}`,
          true
        )
        .addField(
          req.translate('Helpers/autoCovid:AUTO_COVID3'),
          `+${stats.newDeaths.toLocaleString()}`,
          true
        )
        .addField(
          req.translate('Helpers/autoCovid:AUTO_COVID4'),
          `${stats.activeCases.toLocaleString()} (${(
            (stats.newCases / stats.activeCases) * 100).toFixed(2)}%)`, true)
        .addField(
          req.translate('Helpers/autoCovid:AUTO_COVID5'),
          `${stats.totalRecovered.toLocaleString()} (${(
            (stats.totalRecovered / stats.totalCases) *
            100
          ).toFixed(2)}%)`,
          true
        )
        .addField(
          req.translate('Helpers/autoCovid:AUTO_COVID6'),
          `${stats.totalDeaths.toLocaleString()} (${(
            (stats.totalDeaths / stats.totalCases) *
            100
          ).toFixed(2)}%)`,
          true
        )
        .addField(req.translate('Helpers/autoCovid:AUTO_COVID7'), `${stats.totalTests.toLocaleString()}`, true)
        .setImage(
          `https://xtrading.io/static/layouts/qK98Z47ptC-embed.png?newest=${Date.now()}`
        )
        .setColor("RANDOM")
        .setFooter({ text: `${req.translate('Features/aniversario:NIVER10')}` });
      const reactionMessage = await CovidChannel.send({ embeds: [embed] });

      dbCovid.msgId = reactionMessage.id;
      dbCovid.channelID = reactionMessage.channel.id;

    } else {
      dbCovid.enabled = false;
      dbCovid.channelID = null;
    }

    // Salvando dados no banco de dados
    await dbCovid.save().catch(() => { })
  }

  // Create a Action Log
  await createLog(req, 'Updated Auto-Covid');

  res.render("Dashboard/Engagement & Fun/auto-covid", {
    translate: req.translate,
    req: req,
    user: req.session.user,
    guild: guild,
    premium: premium,
    member: member,
    dbCovid: dbCovid,
    ch: ch,
    rr: rr,
    error: '',
    success: '',
  });
});

module.exports = router;