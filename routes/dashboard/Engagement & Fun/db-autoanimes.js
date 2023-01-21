const express = require("express"),
  { var: { createLog, findGuild, getUserFromGuild, getChannels, getRoles, getPermissions, findOrCreate, getAllAnimes } } = require("../../../helpers"),
  Watch = require('require-text')(`${process.cwd()}/static/assets/graphql/Watch.graphql`, require),
  config = require("../../../config"),
  router = express.Router();

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect("/login");
}

router.get("/dashboard/:guildID/auto-anime", checkAuth, async (req, res, next) => {
  try {
    // Find Guild
    const guild = await findGuild(req, res);
    // if (guild && guild.code === 'ETIMEDOUT') return res.redirect("/dashboard"); 
    if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
    if (!guild) return res.redirect("/dashboard");

    // Find User
    const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
    if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

    // Check user permissions
    if (await getPermissions(req) === true) return res.status(200).redirect("/dashboard");

    // Connect to Guild Settings Database
    const { isPremium } = await findOrCreate(req, 'GuildSettings');

    // Check Guild Premium Status
    let premium;
    if (isPremium === "true") {
      premium = "Premium Server";
    } else {
      premium = "Normal Server";
    }

    // Connect to Auto-Animes Database
    const dbAnime = await findOrCreate(req, 'AutoAnimes');

    // Get All Guild Channels
    const ch = await getChannels(req, res);
    const rr = await getRoles(req, res);
    let all = new Array();

    const query = { "page": 1, "id_not_in": 1, "status": "RELEASING" };
    const getAnimes = await getAllAnimes(Watch, query);

    for (const anime of getAnimes.data.Page.media) {
      all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
    }

    if (getAnimes.data.Page.pageInfo.hasNextPage === true) {
      const query = { "page": 2, "id_not_in": 1, "status": "RELEASING" };
      const getAnimes2 = await getAllAnimes(Watch, query);

      for (const anime of getAnimes2.data.Page.media) {
        all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
      }

      if (getAnimes2.data.Page.pageInfo.hasNextPage === true) {
        const query = { "page": 3, "id_not_in": 1, "status": "RELEASING" };
        const getAnimes3 = await getAllAnimes(Watch, query);

        for (const anime of getAnimes3.data.Page.media) {
          all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
        }

        if (getAnimes3.data.Page.pageInfo.hasNextPage === true) {
          const query = { "page": 4, "id_not_in": 1, "status": "RELEASING" };
          const getAnimes4 = await getAllAnimes(Watch, query);

          for (const anime of getAnimes4.data.Page.media) {
            all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
          }

          if (getAnimes4.data.Page.pageInfo.hasNextPage === true) {
            const query = { "page": 5, "id_not_in": 1, "status": "RELEASING" };
            const getAnimes5 = await getAllAnimes(Watch, query);

            for (const anime of getAnimes5.data.Page.media) {
              all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
            }

            if (getAnimes5.data.Page.pageInfo.hasNextPage === true) {
              const query = { "page": 6, "id_not_in": 1, "status": "RELEASING" };
              const getAnimes6 = await getAllAnimes(Watch, query);

              for (const anime of getAnimes6.data.Page.media) {
                all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
              }

              if (getAnimes6.data.Page.pageInfo.hasNextPage === true) {
                const query = { "page": 2, "id_not_in": 1, "status": "RELEASING" };
                const getAnimes7 = await getAllAnimes(Watch, query);

                for (const anime of getAnimes7.data.Page.media) {
                  all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
                }

                if (getAnimes7.data.Page.pageInfo.hasNextPage === true) {
                  const query = { "page": 2, "id_not_in": 1, "status": "RELEASING" };
                  const getAnimes8 = await getAllAnimes(Watch, query);

                  for (const anime of getAnimes8.data.Page.media) {
                    all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
                  }

                  if (getAnimes8.data.Page.pageInfo.hasNextPage === true) {
                    const query = { "page": 2, "id_not_in": 1, "status": "RELEASING" };
                    const getAnimes9 = await getAllAnimes(Watch, query);

                    for (const anime of getAnimes9.data.Page.media) {
                      all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
                    }

                    if (getAnimes9.data.Page.pageInfo.hasNextPage === true) {
                      const query = { "page": 2, "id_not_in": 1, "status": "RELEASING" };
                      const getAnimes10 = await getAllAnimes(Watch, query);

                      for (const anime of getAnimes10.data.Page.media) {
                        all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    res.render("Dashboard/Engagement & Fun/auto-animes", {
      translate: req.translate,
      req: req,
      user: req.session.user,
      guild: guild,
      premium: premium,
      member: member,
      dbAnime: dbAnime,
      ch: ch,
      rr: rr,
      all: all,
    });
  } catch (error) {
    next(error)
  }
});

router.post("/dashboard/:guildID/auto-anime", checkAuth, async (req, res, next) => {
  try {
    // Find Guild
    const guild = await findGuild(req, res);
    // if (guild && guild.code === 'ETIMEDOUT') return res.redirect("/dashboard"); 
    if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
    if (!guild) return res.redirect("/dashboard");

    // Find User
    const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
    if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

    // Check user permissions
    if (await getPermissions(req) === true) return res.status(200).redirect("/dashboard");

    // Connect to Guild Settings Database
    const { isPremium } = await findOrCreate(req, 'GuildSettings');

    // Check Guild Premium Status
    let premium;
    if (isPremium === true) {
      premium = "Premium Server";
    } else {
      premium = "Normal Server";
    }

    // Connect to Auto-Animes Database
    const dbAnime = await findOrCreate(req, 'AutoAnimes');

    // Get All Guild Channels
    const ch = await getChannels(req, res);
    const rr = await getRoles(req, res);
    let all = new Array();

    const query = { "page": 1, "id_not_in": 1, "status": "RELEASING" };
    const getAnimes = await getAllAnimes(Watch, query);

    for (const anime of getAnimes.data.Page.media) {
      all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
    }

    if (getAnimes.data.Page.pageInfo.hasNextPage === true) {
      const query = { "page": 2, "id_not_in": 1, "status": "RELEASING" };
      const getAnimes = await getAllAnimes(Watch, query);

      for (const anime of getAnimes.data.Page.media) {
        all.push({ name: anime.title.english || anime.title.romaji, id: anime.id });
      }
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'chanime')) {
      // Auto-Anime Channel
      let AnimesChannel = req.body.chanime;
      if (AnimesChannel !== "disabled") {
        dbAnime.channelID = AnimesChannel;
        dbAnime.enabled = true;
      } else {
        dbAnime.enabled = false;
        dbAnime.channelID = null;
      }

      // Salvando dados no banco de dados
      await dbAnime.save().catch(() => { })
    }

    // Create a Action Log
    await createLog(req, 'Updated Auto-Animes');

    res.render("Dashboard/Engagement & Fun/auto-animes", {
      translate: req.translate,
      req: req,
      user: req.session.user,
      guild: guild,
      premium: premium,
      member: member,
      dbAnime: dbAnime,
      ch: ch,
      rr: rr,
      all: all,
    });
  } catch (error) {
    next(error)
  }
});


router.post("/dashboard/:guildID/auto-anime/list", checkAuth, async (req, res, next) => {
  try {
    // Find Guild
    const guild = await findGuild(req, res);
    // if (guild && guild.code === 'ETIMEDOUT') return res.redirect("/dashboard"); 
    if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
    if (!guild) return res.redirect("/dashboard");

    // Find User
    const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
    if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

    // Check user permissions
    if (await getPermissions(req) === true) return res.status(200).redirect("/dashboard");

    // Connect to Guild Settings Database
    const { isPremium } = await findOrCreate(req, 'GuildSettings');

    // Check Guild Premium Status
    let premium;
    if (isPremium === true) {
      premium = "Premium Server";
    } else {
      premium = "Normal Server";
    }

    // Connect to Auto-Animes Database
    const dbAnime = await findOrCreate(req, 'AutoAnimes');

    // Get All Guild Channels
    const ch = await getChannels(req, res);
    const rr = await getRoles(req, res);


    // Verifica o request pelo body sem limitador para funcionar corretamente com o plugin de multi-select
    if (req.body) {
      dbAnime.animes = req.body.anime;
    } else {
      dbAnime.animes = Array;
    }

    // Salvando dados no banco de dados
    await dbAnime.save().catch(() => { })

    // Create a Action Log
    await createLog(req, 'Updated Auto-Animes');

    res.render("Dashboard/Engagement & Fun/auto-animes", {
      translate: req.translate,
      req: req,
      user: req.session.user,
      guild: guild,
      premium: premium,
      member: member,
      dbAnime: dbAnime,
      ch: ch,
      rr: rr,
      all: '',
    });
  } catch (error) {
    next(error)
  }
});

router.post("/dashboard/:guildID/auto-anime/rr", checkAuth, async (req, res, next) => {
  try {
    // Find Guild
    const guild = await findGuild(req, res);
    // if (guild && guild.code === 'ETIMEDOUT') return res.redirect("/dashboard"); 
    if (guild && guild.error === "Guild not found!") return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
    if (!guild) return res.redirect("/dashboard");

    // Find User
    const member = await getUserFromGuild(req.user.id, req.params.guildID, process.env.TOKEN);
    if (member.message === 'Unknown User' || member.code === '10013' || !member) return res.redirect("/dashboard");

    // Check user permissions
    if (await getPermissions(req) === true) return res.status(200).redirect("/dashboard");

    // Connect to Guild Settings Database
    const { isPremium } = await findOrCreate(req, 'GuildSettings');

    // Check Guild Premium Status
    let premium;
    if (isPremium === true) {
      premium = "Premium Server";
    } else {
      premium = "Normal Server";
    }

    // Connect to Auto-Animes Database
    const dbAnime = await findOrCreate(req, 'AutoAnimes');

    // Get All Guild Channels
    const ch = await getChannels(req, res);
    const rr = await getRoles(req, res);


    // Verifica o request pelo body sem limitador para funcionar corretamente com o plugin de multi-select
    if (req.body.rranime === "none") {
      dbAnime.roleNotify = null;
    } else {
      dbAnime.roleNotify = req.body.rranime;
    }

    // Salvando dados no banco de dados
    await dbAnime.save().catch(() => { })

    // Create a Action Log
    await createLog(req, 'Updated Auto-Animes');

    res.render("Dashboard/Engagement & Fun/auto-animes", {
      translate: req.translate,
      req: req,
      user: req.session.user,
      guild: guild,
      premium: premium,
      member: member,
      dbAnime: dbAnime,
      ch: ch,
      rr: rr,
      all: '',
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;