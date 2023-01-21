const express = require("express"),
    config = require("../config"),
    { var: { findGuild, findUser, findLogs, getPermissions, findOrCreate } } = require("../helpers"),
    router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        // Get data from Database
        let serversData = await findOrCreate(req, 'publicServers');

        // Create a new array for categories
        let categories = new Array();
        // remove duplicates from array and push a new array
        for (const server of serversData) {
            for (const cat of server.categories) {
                categories.push(cat);
            }
        }
        var a = categories,
            filtered = a.filter(function (a) {
                if (!this.has(a)) {
                    this.set(a, true);
                    return true;
                }
            }, new Map);

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

        res.render("public-servers", {
            translate: req.translate,
            serversData: serversData,
            categories: filtered,
            domain: req.hostname,
            user: req.session.user,
            currentURL: `${config.baseURL}/${req.originalUrl}`
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;