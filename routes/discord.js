const express = require("express"),
	router = express.Router(),
	config = require("../config"),
	delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
	{ var: { sendWebhook } } = require("../helpers");

const { fetch } = require('undici'),
	btoa = require("btoa");

// Gets login page
router.get("/login", async function (req, res, next) {
	try {
		if (!req.user || !req.user.id || !req.user.guilds) {
			return res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${req.client_id}&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(config.baseURL + "/callback")}`);
		}
		res.redirect("/dashboard");
	} catch (error) {
		next(error)
	}
});

router.get("/callback", async (req, res, next) => {
	try {
		if (!req.query.code) return res.redirect('/');
		if (req.query.state && req.query.state.startsWith("invite")) {
			if (req.query.code) {
				const guildID = req.query.state.substr("invite".length, req.query.state.length);
				req.client.knownGuilds.push({ id: guildID, user: req.user.id });
				return res.redirect("/dashboard/" + guildID);
			}
		}
		const redirectURL = req.session.backURL;
		req.session.backURL = null;
		const params = new URLSearchParams();
		params.set("grant_type", "authorization_code");
		params.set("code", req.query.code);
		params.set("redirect_uri", `${config.baseURL}/callback`);
		let response = await fetch("https://discord.com/api/oauth2/token", {
			method: "POST",
			body: params.toString(),
			headers: {
				Authorization: `Basic ${btoa(`${req.client_id}:${config.secret}`)}`,
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});
		// Fetch tokens (used to fetch user informations)
		const tokens = await response.json();

		// If the code isn't valid
		if (tokens.error || !tokens.access_token) return res.redirect(`/login&state=${req.query.state}`);
		const userData = {
			infos: null,
			guilds: null
		};
		while (!userData.infos || !userData.guilds) {
			/* User infos */
			if (!userData.infos) {
				response = await fetch("http://discordapp.com/api/users/@me", {
					method: "GET",
					headers: { Authorization: `Bearer ${tokens.access_token}` }
				});
				const json = await response.json();
				if (json.retry_after) await delay(json.retry_after);
				else userData.infos = json;
			}
			/* User guilds */
			if (!userData.guilds) {
				response = await fetch("https://discordapp.com/api/users/@me/guilds", {
					method: "GET",
					headers: { Authorization: `Bearer ${tokens.access_token}` }
				});
				const json = await response.json();
				if (json.retry_after) await delay(json.retry_after);
				else userData.guilds = json;
			}
		}
		/* Change format (from "0": { data }, "1": { data }, etc... to [ { data }, { data } ]) */
		const guilds = [];
		for (const guildPos in userData.guilds) guilds.push(userData.guilds[guildPos]);
		// Update session
		req.session.user = { ...userData.infos, ... { guilds } };

		res.redirect(redirectURL);

		const embed = {
			color: 9442302,
			title: 'Dashboard Login | Logs',
			url: '',
			author: {
				name: '',
				icon_url: '',
				url: '',
			},
			description: `**User:** ${req.session.user.username}#${req.session.user.discriminator}\n**ID:** \`${req.session.user.id}\``,
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
	} catch (error) {
		next(error)
	}
});

module.exports = router;