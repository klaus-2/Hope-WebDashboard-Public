const express = require("express"),
    config = require("../../config"),
    { var: { sendWebhook } } = require("../../helpers"),
    router = express.Router();

router.post("/dashboard/:guildID/bug", async (req, res, next) => {
    try {
        const { issue, action, result, bugmessage, frequency, priority } = req.body;

        const embed = {
            color: 9442302,
            title: 'BUG REPORT RECEIVED',
            url: '',
            author: {
                name: '',
                icon_url: '',
                url: '',
            },
            description: `**Issue:** ${issue}\n**Action:** ${action}\n**Result:** ${result}\n**Bug message:**\n\`\`\`${bugmessage}\`\`\`\n**Frequency:** ${frequency}\n**Priority:** ${priority}`,
            thumbnail: {
                url: '',
            },
            image: {
                url: '',
            },
            timestamp: '',
            footer: {
                text: `Submitted by ${req.user.username}#${req.user.discriminator} | ID: ${req.user.id}`,
                icon_url: '',
            },
        };

        let datamsg = {
            "content": null,
            "tts": false,
            "embeds": [embed],
        };

        await sendWebhook('hookID', 'hookTOKEN', datamsg, process.env.TOKEN);

        res.status(200).json('Bug successfully reported!')
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/feedback", async (req, res, next) => {
    try {
        const { feedimpression, rating, feedsuggestion } = req.body;

        const embed = {
            color: 9442302,
            title: 'FEEDBACK RECEIVED',
            url: '',
            author: {
                name: '',
                icon_url: '',
                url: '',
            },
            description: `**What was your first impression of the Hope**\n\`\`\`${feedimpression}\`\`\`\n**How would you rate the features of the Hope relative to the quality?**\n${rating}\n**What would make Hope better?**\n\`\`\`${feedsuggestion}\`\`\``,
            thumbnail: {
                url: '',
            },
            image: {
                url: '',
            },
            timestamp: '',
            footer: {
                text: `Submitted by ${req.user.username}#${req.user.discriminator} | ID: ${req.user.id}`,
                icon_url: '',
            },
        };

        let datamsg = {
            "content": null,
            "tts": false,
            "embeds": [embed],
        };

        await sendWebhook('hookID', 'hookTOKEN', datamsg, process.env.TOKEN);

        res.status(200).json('Feedback successfully shared!')
    } catch (error) {
        next(error)
    }
});

router.post("/dashboard/:guildID/partnership", async (req, res, next) => {
    try {
        const { projectname, projectType, countmembers, dailyvisits, countserversbot, countusersbot, projectlink, contacttype } = req.body;

        switch (projectType) {
            case 'Discord Server':
                const embed = {
                    color: 9442302,
                    title: 'PARTNERSHIP REQUEST RECEIVED',
                    url: '',
                    author: {
                        name: '',
                        icon_url: '',
                        url: '',
                    },
                    description: `**Project name:** ${projectname}\n**How many members are on your server?** ${countmembers}\n**Link to the project:** ${projectlink}\n**Primary form of contact:** ${contacttype}`,
                    thumbnail: {
                        url: '',
                    },
                    image: {
                        url: '',
                    },
                    timestamp: '',
                    footer: {
                        text: `Submitted by ${req.user.username}#${req.user.discriminator} | ID: ${req.user.id}`,
                        icon_url: '',
                    },
                };

                let datamsg = {
                    "content": null,
                    "tts": false,
                    "embeds": [embed],
                };

                await sendWebhook('hookID', 'hookTOKEN', datamsg, process.env.TOKEN);
                break;

            case 'Website':
                const embed1 = {
                    color: 9442302,
                    title: 'PARTNERSHIP REQUEST RECEIVED',
                    url: '',
                    author: {
                        name: '',
                        icon_url: '',
                        url: '',
                    },
                    description: `**Project name:** ${projectname}\n**How many unique daily visits does your website receive?** ${dailyvisits}\n**Link to the project:** ${projectlink}\n**Primary form of contact:** ${contacttype}`,
                    thumbnail: {
                        url: '',
                    },
                    image: {
                        url: '',
                    },
                    timestamp: '',
                    footer: {
                        text: `Submitted by ${req.user.username}#${req.user.discriminator} | ID: ${req.user.id}`,
                        icon_url: '',
                    },
                };

                let datamsg1 = {
                    "content": null,
                    "tts": false,
                    "embeds": [embed1],
                };

                await sendWebhook('hookID', 'hookTOKEN', datamsg1, process.env.TOKEN);
                break;

            case 'Discord Bot':
                const embed2 = {
                    color: 9442302,
                    title: 'PARTNERSHIP REQUEST RECEIVED',
                    url: '',
                    author: {
                        name: '',
                        icon_url: '',
                        url: '',
                    },
                    description: `**Project name:** ${projectname}\n**Your bot is on how many servers?** ${countserversbot}\n**How many users does your bot have in total?:** ${countusersbot}\n**Link to the project:** ${projectlink}\n**Primary form of contact:** ${contacttype}`,
                    thumbnail: {
                        url: '',
                    },
                    image: {
                        url: '',
                    },
                    timestamp: '',
                    footer: {
                        text: `Submitted by ${req.user.username}#${req.user.discriminator} | ID: ${req.user.id}`,
                        icon_url: '',
                    },
                };

                let datamsg2 = {
                    "content": null,
                    "tts": false,
                    "embeds": [embed2],
                };

                await sendWebhook('hookID', 'hookTOKEN', datamsg2, process.env.TOKEN);
                break;

            default:
                break;
        }

        res.status(200).json('Bug successfully reported!')
    } catch (error) {
        next(error)
    }
});

module.exports = router;