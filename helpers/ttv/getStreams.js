const { fetch } = require('undici');

async function getData(channelName, clientID, authkey) {
    try {
        const data = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channelName}`, { method: 'GET', headers: { 'Client-Id': clientID, 'Authorization': `Bearer ${authkey}` } }).then(res => res.json()).catch(e => {
            if (e.code === 'ETIMEDOUT') {
                return console.log('timeout');
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getData };
