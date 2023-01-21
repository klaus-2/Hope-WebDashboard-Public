const request = require('request'),
    config = require("../config.js");

async function getMe() {
    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Bot ${config.token}`
        };
        request.get(
            `https://discord.com/api/users/@me`, { headers: headers },
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e)
                }
            }
        )
    });
}

async function getGuilds() {
    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Bot ${config.token}`
        };
        request.get(
            `https://discord.com/api/users/@me/guilds`, { headers: headers },
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e)
                }
            }
        )
    });
}

async function getData(id, token) {
    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Bot ${token}`
        };
        request.get(
            `https://discord.com/api/guilds/852237113071894618/members/${id}`, { headers: headers },
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e)
                }
            }
        )
    });
}

async function getUserGuild(id, token) {
    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Bot ${token}`
        };
        request.get(
            `https://discord.com/api/guilds/${id}?with_counts=true`, { headers: headers },
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e)
                }
            }
        )
    });
}

async function getGuildChannels(id, token) {
    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Bot ${token}`
        };
        request.get(
            `https://discord.com/api/guilds/${id}/channels`, { headers: headers },
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e)
                }
            }
        )
    });
}

async function getKey(clientID, clientSecret) {
    return new Promise((resolve, reject) => {
        request.post(
            `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`,
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try{
                    resolve(JSON.parse(body).access_token)
                }catch(e){
                    reject(e)
                }
            }
        )
    });
}

module.exports = { getMe, getGuilds, getData, getUserGuild, getGuildChannels, getKey };