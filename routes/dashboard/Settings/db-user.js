const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getPermissions, findOrCreate } } = require("../../../helpers"),
    moment = require('moment'),
    validUrl = require("valid-url"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/user", checkAuth, async (req, res, next) => {
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
        const settings = await findOrCreate(req, 'GuildSettings');

        // Check Guild Premium Status
        let premium;
        if (settings.isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Connect to Guild Settings Database
        const dbEconomia = await findOrCreate(req, 'Economia');

        res.render("Dashboard/settings/user", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            settings: settings,
            dbEconomia: dbEconomia,
            moment: moment,
            premium: premium,
            member: member,
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/user", checkAuth, async (req, res, next) => {
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
        const settings = await findOrCreate(req, 'GuildSettings');

        // Check Guild Premium Status
        let premium;
        if (settings.isPremium === "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Connect to Guild Settings Database
        const dbEconomia = await findOrCreate(req, 'Economia');

        if (Object.prototype.hasOwnProperty.call(req.body, 'update')) {

            let biografia = req.body.bio;
            if (biografia) {
                dbEconomia.perfil.biografia = biografia;
                await dbEconomia.save().catch(() => { });
            }

            let niver = req.body.bday;
            if (niver) {
                dbEconomia.perfil.aniversario = niver;
                await dbEconomia.save().catch(() => { });
            }

            let cor = req.body.color;
            if (cor) {
                dbEconomia.perfil.cor = cor;
                await dbEconomia.save().catch(() => { });
            }

            let genero = req.body.gender;
            if (genero) {
                dbEconomia.perfil.genero = genero;
                await dbEconomia.save().catch(() => { });
            }

            let regiao = req.body.locale;
            if (regiao) {
                dbEconomia.perfil.região = regiao;
                await dbEconomia.save().catch(() => { });
            }

            let bg = req.body.bg;
            if (bg) {
                if (validUrl.isUri(bg)) {
                    dbEconomia.perfil.planodefundo = bg;
                    await dbEconomia.save().catch(() => { });
                } else {
                    res.render("Dashboard/settings/user", {
                        translate: req.translate,
                        req: req,
                        user: req.session.user,
                        dbEconomia: dbEconomia,
                        guild: guild,
                        premium: premium,
                        member: member,
                        error: 'Uh-oh! The background must be a URL.',
                        success: '',
                        settings: settings,
                    });
                }
            }

            // Create a Action Log
            await createLog(req, 'Updated user settings');

            res.render("Dashboard/settings/user", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                dbEconomia: dbEconomia,
                guild: guild,
                premium: premium,
                member: member,
                error: '',
                success: 'Information successfully updated!',
                settings: settings,
            });
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;