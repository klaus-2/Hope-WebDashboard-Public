const express = require("express"),
  { fetch } = require('undici'),
  { logger } = require("../utils"),
  { var: { findOrCreate, getTopGuilds } } = require("../helpers"),
  moment = require("moment"),
  { Auth, Channel, Stream } = require("../helpers/ttv"),
  router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let sdata = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/statistics?token=${process.env.API_TOKEN}`).then(res => response = res.json()).catch(e => {
      if (e.code === 'ETIMEDOUT' || e.code === 'ECONNREFUSED' || e.code === 'undefined') {
        return;
      }
    });

    let guilds = ['203', '234', '250', '200', '311', '199', '259'];
    let users = ['240873', '239301', '199384', '302198', '276382'];
    if (!sdata) sdata = { data: { guildCount: guilds[Math.floor(Math.random() * (guilds.length - 1))], totalMembers: users[Math.floor(Math.random() * (users.length - 1))] } };

    // Get data from Database (Top Servers)
    let serversData = await getTopGuilds();

    // Get data from Database (Public Servers)
    let pServers = await findOrCreate(req, 'publicServers');

    // Create a new array for categories
    let categories = new Array();
    // remove duplicates from array and push a new array
    for (const server of pServers) {
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

    shuffle(pServers);

    let data = [{
      id: '676223806859378688',
      name: 'MyW0rld',
      icon: '95e2871a7f808a88bba08e2ab56dfcc9',
      members: 4,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '622812963572809771'
    },
    {
      id: '730237565285957674',
      name: 'FiveM Template 2',
      icon: null,
      members: 2,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '622812963572809771'
    },
    {
      id: '730238415093891224',
      name: 'Servidor de Klaus',
      icon: null,
      members: 2,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '622812963572809771'
    },
    {
      id: '841701395014352957',
      name: 'Emote Bank 5',
      icon: '5ab9498f5e70de318a49f9258c3ac0bb',
      members: 4,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '622812963572809771'
    },
    {
      id: '841709782497755186',
      name: 'test',
      icon: null,
      members: 8,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '622812963572809771'
    },
    {
      id: '852237113071894618',
      name: 'Servidor de Klaus',
      icon: null,
      members: 2,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '622812963572809771'
    },
    {
      id: '864193088548634685',
      name: 'Egg',
      icon: null,
      members: 30,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '840367329287471115'
    },
    {
      id: '882682119703367730',
      name: "! Nzn's serverssDSAdsa dWEWQEE das DSADSA",
      icon: '04f5a8ae07f422ab465fe5a5142cd758',
      members: 5,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '840367329287471115'
    },
    {
      id: '924366912455057488',
      name: 'Test botsite',
      icon: null,
      members: 3,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '622812963572809771'
    },
    {
      id: '932060771423256616',
      name: 'Teste Site',
      icon: null,
      members: 4,
      splash: null,
      banner: null,
      description: null,
      vanityURLCode: null,
      preferredLocale: 'en-US',
      ownerId: '622812963572809771'
    }];
    if (!serversData) serversData = { data };

    let StreamData;
    let ChannelData;
    StreamData = await Stream.getData('gaules', process.env.API_TWITCH_CLIENT_ID, process.env.API_TWITCH_TOKEN);
    ChannelData = await Channel.getData('gaules', process.env.API_TWITCH_CLIENT_ID, process.env.API_TWITCH_TOKEN);
    if (!StreamData || StreamData.error === "Unauthorized" || StreamData.stats === 401) {
      //get the auth key
      const authKey = await Auth.getKey(process.env.API_TWITCH_CLIENT_ID, process.env.API_TWITCH_SECRECT_ID);
      if (!authKey) return;

      //write the new auth key
      process.env.API_TWITCH_TOKEN = authKey.access_token;
      StreamData = await Stream.getData('gaules', process.env.API_TWITCH_CLIENT_ID, authKey.access_token);
      ChannelData = await Channel.getData('gaules', process.env.API_TWITCH_CLIENT_ID, authKey.access_token);
      // console.log(StreamData)
      // console.log(authKey.access_token)
    }
    // console.log(StreamData)

    res.render("index", {
      translate: req.translate,
      serversData: serversData.data.sort(function (a, b) { return b.members - a.members }).slice(0, 8),
      pServers: pServers,
      totalServers: sdata?.guildCount || sdata?.data.guildCount,
      totalUsers: sdata?.totalMembers || sdata?.data.totalMembers,
      moment: moment,
      user: req.session.user,
      StreamData: StreamData,
      ChannelData: ChannelData
    });
  } catch (error) {
    logger.error(error);
    res.redirect('/maintenance');
  }
});

module.exports = router;