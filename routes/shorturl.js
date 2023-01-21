const express = require("express"),
    { shortUrl } = require('../database/models/index'),
    router = express.Router();

router.get('/url/:shortUrl', async (req, res, next) => {
    try {
        const shortUrlDB = await shortUrl.findOne({ short: req.params.shortUrl })
        if (shortUrlDB == null) return res.send('Invalid url Provided')

        shortUrlDB.clicks++
        shortUrlDB.save()

        res.redirect(shortUrlDB.full)
    } catch (error) {
        next(error)
    }
})

router.get('/url', async (req, res, next) => {
    try {
        return res.send('Invalid url Provided')
    } catch (error) {
        next(error)
    }
})

module.exports = router;