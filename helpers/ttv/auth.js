const { fetch } = require('undici');

async function getKey(clientID, clientSecret) {
    const datax = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`, { method: 'POST', headers: { 'Content-Type': 'x-www-form-urlencoded' } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return console.log('timeout');
        }
    });

    return datax;
}

module.exports = { getKey };
