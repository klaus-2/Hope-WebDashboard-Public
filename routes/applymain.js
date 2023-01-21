const express = require("express"),
    { var: { createLog, findGuild, genID, getUserFromGuild, getPermissions, findOrCreate, getChannels } } = require("../helpers"),
    router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.originalUrl;
    res.redirect("/login");
}

router.get("/:guildID", checkAuth, async (req, res, next) => {
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
        const settings = await findOrCreate(req, 'GuildSettings');

        // Get All Guild Channels
        const ch = await getChannels(req, res);

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const appSettings = await findOrCreate(req, 'applicationsDB');

        res.render("applymain", {
            req: req,
            user: req.session.user,
            guild: guild,
            premium: premium,
            member: member,
            settings: settings,
            app: appSettings,
            ch: ch,
            rr: '',
            error: '',
            success: '',
        });
    } catch (error) {
        next(error)
    }
});

router.post("/:guildID", checkAuth, async (req, res, next) => {
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
        const settings = await findOrCreate(req, 'GuildSettings');

        let premium;
        if (settings.isPremium == "true") {
            premium = "Premium Server";
        } else {
            premium = "Normal Server";
        }

        const appSettings = await findOrCreate(req, 'applicationsDB');

        const data = req.body;

        const channel = await guild.channels.cache.get(db.appLogs)

        if (db.appToggle === false) return;

        if (channel) {

            let embed;
            let ticketID = await genID(8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

            let data = [ticketID, member.id];
            let form = await findOrCreate(data, 'transcript');

            for (let i = 0; db.questions.length > i; i++) {

                if (data[i + 1]) {
                    form.paste.push(`Question #${i + 1} - ${db.questions[i]}`)
                    form.paste2.push(`${data[i + 1] || 'Not Answered'}`)

                    /* embed = new MessageEmbed()
                        .setTitle(`A new Form was Submitted`)
                        .setDescription(`**Link:** [https://hopebot.top/transcript/${ticketID}](https://hopebot.top/transcript/${ticketID})\n\n[or click here](https://hopebot.top/transcript/${ticketID})\n\n**Form ID**: \`${ticketID}\`\n\n**Submitted by:** ${member} **(${member.user.tag} - ${member.id})**\n**Time:** ${moment(new Date()).format("dddd, MMMM Do YYYY HH:mm:ss")}`)
                        .setFooter({ text: 'Powered by hopebot.top' })
                        .setColor('GREEN') */
                } else {
                    form.paste.push(`Question #${i + 1} - ${db.questions[i]}`)
                    form.paste2.push(`Not Answered`)

                    /* embed = new MessageEmbed()
                        .setTitle(`A new Form was Submitted`)
                        .setDescription(`**Link:** [https://hopebot.top/transcript/${ticketID}](https://hopebot.top/transcript/${ticketID})\n\n[or click here](https://hopebot.top/transcript/${ticketID})\n\n**Form ID**: \`${ticketID}\`\n\n**Submitted by:** ${member} **(${member.user.tag} - ${member.id})**\n**Time:** ${moment(new Date()).format("dddd, MMMM Do YYYY HH:mm:ss")}`)
                        .setFooter({ text: 'Powered by hopebot.top' })
                        .setColor('GREEN') */
                }
            }
            // member.send({ embeds: [new MessageEmbed().setColor('GREEN').setFooter({ text: `Powered by hopebot.top` }).setTitle(`Application #${ticketID}`).setDescription(`Hey ${member.user.username}! Your form was Submitted and ready to be judged.\n\n**Form ID**: \`${ticketID}\`\n**Time:** ${moment(new Date()).format("dddd, MMMM Do YYYY HH:mm:ss")}`)] }).catch(() => { });

            await form.save().catch(() => { })
            // channel.send({ embeds: [embed] })

            await createLog(req, `Sent a form in ${guild.name}`);

            return res.render("applymain", {
                req: req,
                user: req.session.user,
                guild: guild,
                premium: premium,
                member: member,
                settings: settings,
                app: appSettings,
                ch: '',
                rr: '',
                error: '',
                success: 'Your form has been recieved',
                id: `Form #${ticketID}`,
            });
        } else {

            return res.render("applymain", {
                req: req,
                user: req.session.user,
                guild: guild,
                premium: premium,
                member: member,
                settings: settings,
                app: appSettings,
                ch: '',
                rr: '',
                error: 'There was an error sending your Form.',
                success: '',
            });
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;