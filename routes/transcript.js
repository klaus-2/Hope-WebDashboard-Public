const express = require("express"),
    { transcript } = require('../database/models/index'),
    { var: { getUser } } = require("../helpers"),
    { fetch } = require('undici'),
    moment = require('moment'),
    router = express.Router();

router.get("/transcript/:pasteID", async (req, res, next) => {
    try {
        const pastes = await transcript.find({
            type: 'ticket'
        });

        for (const pasteE of pastes) {
            if (Date.now() > pasteE.expiresAt) {
                await pasteE.deleteOne().catch(() => { })
            }
        }

        const paste = await transcript.findOne({
            _id: req.params.pasteID,
            type: "ticket"
        })

        if (paste) {
            const user = await getUser(paste.by, process.env.TOKEN);

            let arr = new Array();
            for (const dbl of paste.paste2) {
                const duser = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/users/${dbl}?token=${process.env.API_TOKEN}`).then(res => res.json()).catch(e => {
                    if (e.code === 'ETIMEDOUT') {
                        return;
                    }
                });
                arr.push({ data: { ID: duser.user.id, avatar: duser.user.displayAvatarURL, tag: duser.user.tag } });
                if (duser && duser.error === "Missing user ID") return;
            }

            if (paste && paste.paste.length >= 1) {
                if (Date.now() > paste.expiresAt) {
                    await paste.deleteOne().catch(() => { })
                    renderTemplate(res, req, "transcript.ejs", {
                        type: "noFind"
                    });
                    return;
                }

                res.render("transcript", {
                    expires: moment(paste.expiresAt).format("dddd, MMMM Do YYYY HH:mm:ss"),
                    created: moment(paste.createdAt).format("dddd, MMMM Do YYYY HH:mm:ss"),
                    paste: paste.paste,
                    id: paste._id,
                    db: paste,
                    arr: arr,
                    user: user,
                    type: "ticket"
                });
            } else {
                res.render("transcript", {
                    type: "noFind"
                });
            }
        } else {
            const form = await transcript.findOne({
                _id: req.params.pasteID,
                type: "form"
            })

            if (form && form.paste.length >= 1) {
                if (Date.now() > form.expiresAt) {
                    await form.deleteOne().catch(() => { })
                    renderTemplate(res, req, "transcript.ejs", {
                        type: "noFindForm"
                    });
                    return;
                }

                res.render("transcript", {
                    type: "noFindForm"
                });

            } else {
                res.render("transcript", {
                    expires: moment(form.expiresAt).format("dddd, MMMM Do YYYY HH:mm:ss"),
                    created: moment(form.createdAt).format("dddd, MMMM Do YYYY HH:mm:ss"),
                    db: form,
                    id: form._id,
                    type: "form"
                });
            }
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;