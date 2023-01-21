const express = require("express"),
  config = require("../config"),
  router = express.Router();

router.get("/", async (req, res) => {

  res.render("data-removal", {
    translate: req.translate,
    domain: req.hostname,
    user: req.session.user,
    currentURL: `${config.baseURL}/${req.originalUrl}`
  });
});

router.post("/", async (req, res, next) => {
  try {
    if (req.body.type === 'contact') {

      const contactEmbed = new WebhookClient({ id: 'hookID', token: 'hookTOKEN' });

      const contact = new EmbedBuilder()
        .setColor('GREEN')
        .setTitle(`Data Removal Form`)
        .setDescription(`Someone just contacted us!\n\nLegal Name: ${req.body.LegalName}\nEmail: ${req.body.Email}\nDiscord Name: ${req.body.DiscordName} | \`(${req.body.id})\`\nReason: ${req.body.Reason}\nMessage: \`${req.body.message}\``);


      contactEmbed.send({
        username: 'Hope Data Removal',
        avatarURL: `https://imgur.com/A6wQYo6`,
        embeds: [contact]
      });
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;