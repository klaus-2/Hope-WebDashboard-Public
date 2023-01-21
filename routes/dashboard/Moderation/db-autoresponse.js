const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate, findAndDelete } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/autoresponse", checkAuth, async (req, res, next) => {
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
        const dbResponse = await findOrCreate(req, 'autoResponse-1');
        const { isPremium } = await findOrCreate(req, 'GuildSettings');

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

        res.render("Dashboard/Moderation/autoresponse", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            dbResponse: dbResponse,
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

router.post("/dashboard/:guildID/autoresponse", checkAuth, async (req, res, next) => {
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
        for (var i = 0; i < 999; i++) {
            if (Object.prototype.hasOwnProperty.call(req.body, 'del' + [i])) {
                let find = `${req.body["del" + [i]]}`;

                if (find) {
                    await findAndDelete(req, 'AutoResponse', find).then(function () {
                        console.log("[AUTO-RESPONSE] Data deleted");
                    }).catch(function (error) {
                        console.log('[AUTO-RESPONSE]', error);
                    });
                }
                return res.redirect(`/dashboard/${req.params.guildID}/autoresponse`)
            }
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'addresponse')) {
            let firstime = [req.params.guildID, req.body.trigger, req.body.response];
            await findOrCreate(firstime, 'autoResponse-3');
            await createLog(req, 'Updated Auto-Response');
            return res.redirect(`/dashboard/${req.params.guildID}/autoresponse`);
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;