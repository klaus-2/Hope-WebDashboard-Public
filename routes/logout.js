const express = require("express"),
  { var: { sendWebhook } } = require("../helpers"),
  router = express.Router();

router.get("/logout", async (req, res, next) => {

  const embed = {
    color: 9442302,
    title: 'Dashboard Logout | Logs',
    url: '',
    author: {
      name: '',
      icon_url: '',
      url: '',
    },
    description: `**User:** ${req.user.username}#${req.user.discriminator}\n**ID:** \`${req.user.id}\``,
    thumbnail: {
      url: '',
    },
    image: {
      url: '',
    },
    timestamp: '',
    footer: {
      text: ``,
      icon_url: '',
    },
  };

  let datamsg = {
    "content": null,
    "tts": false,
    "embeds": [embed],
  };

  await sendWebhook('hookID', 'hookTOKEN', datamsg, process.env.TOKEN);

  req.logout(req.user, err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;