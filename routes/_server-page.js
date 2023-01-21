const express = require("express"),
    { var: { findOrCreate, getGuildData, getUserFromGuild, getChannels } } = require("../helpers"),
    moment = require('moment'),
    router = express.Router();

router.get("/:guildID", async (req, res, next) => {
    try {
        // Find Guild
        const guild = await findOrCreate(req, 'publicServers-3');
        const data = await getGuildData(req.params.guildID, process.env.TOKEN);
        const owner = await getUserFromGuild(data.owner_id, req.params.guildID, process.env.TOKEN);
        const channels = await getChannels(req);

        // Get data from Database
        let serversData = await findOrCreate(req, 'publicServers-1');

        function shuffle(array) {
            let currentIndex = array.length, randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }

        shuffle(serversData);

        if (guild) {
            if (!channels || channels.error === "Guild not found!") return res.redirect("/maintenance");
            res.render("_server-page", {
                translate: req.translate,
                domain: req.hostname,
                user: req.session.user,
                guild: guild,
                servers: serversData,
                data: data,
                owner: owner,
                channels: channels.length,
                currentURL: `${req.hostname}/${req.originalUrl}`,
                moment: moment,
            });
        } else {
            res.render("server-notfound", {
                req: req,
                domain: req.hostname,
                user: req.session.user,
                guild: guild,
                currentURL: `${req.hostname}/${req.originalUrl}`
            });
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;