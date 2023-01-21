const express = require("express"),
    { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate } } = require("../../../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

router.get("/dashboard/:guildID/applications", checkAuth, async (req, res, next) => {
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
        // Connect to Guild Settings Database
        const appSettings = await findOrCreate(req, 'applicationsDB');

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        // Get All Guild Roles
        const rr = await getRoles(req, res);

        res.render("Dashboard/Utilities/applications", {
            translate: req.translate,
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            app: appSettings,
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

router.post("/dashboard/:guildID/applications", checkAuth, async (req, res, next) => {
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
        // Connect to Guild Settings Database
        const appSettings = await findOrCreate(req, 'applicationsDB');
        // Get All Guild Channels
        const ch = await getChannels(req, res);
        // Get All Guild Roles
        const rr = await getRoles(req, res);

        let premium;
        if (isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const { log, add_role, remove_role, toggle, dm, questionTitle } = req.body

        /* for (var i = 0; i < 999; i++) {
            if (Object.prototype.hasOwnProperty.call(req.body, 'question' + [i])) {
                let find = req.body[[i]];
    
                if (find) {
                    await findAndDelete(req, 'AutoTwitch', find);
                }
                res.redirect(`/dashboard/${req.params.guildID}/auto-twitch`)
            }
        } */

        if (Object.prototype.hasOwnProperty.call(req.body, "save")) {
            //channel
            if (log) {
                appSettings.appLogs = log;
            } else {
                appSettings.appLogs = null;
            }

            //add_roleadd_role)
            if (add_role) {
                appSettings.add_role = add_role;
            } else {
                appSettings.add_role = null;
            }

            //remove_role
            if (remove_role) {
                appSettings.remove_role = remove_role;
            } else {
                appSettings.remove_role = null;
            }

            // ANTI POLLUTION
            if (toggle) {
                appSettings.appToggle = true;
            } else {
                appSettings.appToggle = false;
            }

            if (dm) {
                appSettings.dm = true;
            } else {
                appSettings.dm = false;
            }

            await appSettings.save().catch(() => { });

            return res.render("Dashboard/Utilities/applications", {
                translate: req.translate,
                req: req,
                user: req.session.user,
                guild: guild,
                premium: premium,
                app: appSettings,
                member: member,
                ch: ch,
                rr: rr,
                error: '',
                success: '',
            });
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'addquestion')) {
            let maxQuestions = 10
            if (isPremium === true) {
                maxQuestions = 25
            }

            if (req.body.questionTitle) {
                const db = await findOrCreate(req, 'applicationsDB');

                let ar = await db.questions;
                let actualArr = ar.concat(questionTitle);

                if (actualArr.length > maxQuestions) {
                    console.log(`You cannot add more than {amountLength} questions".replace("{amountLength}`);
                }

                db.questions = actualArr;
                await db.save().catch(() => { });

                console.log('I have succesfully added all the questions')
            } else {
                appSettings.dm = false;
                await appSettings.save().catch(() => { });
            }

            // Create a Action Log
            await createLog(req, 'Added Question in Auto-Response');
            return res.redirect(`/dashboard/${req.params.guildID}/applications`)
        }

        for (var i = 0; i < 999; i++) {
            if (Object.prototype.hasOwnProperty.call(req.body, 'question' + [i])) {
                const array = appSettings.questions;
                let find = req.body[`question${[i]}`];

                if (array.find(a => a === find) === find) {
                    array.splice(i, 1);
                    await appSettings.save().catch(() => { });
                }
                // Create a Action Log
                await createLog(req, `Deleted question #${[i]} in Auto-Response`);
                return res.redirect(`/dashboard/${req.params.guildID}/applications`)
            }
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;