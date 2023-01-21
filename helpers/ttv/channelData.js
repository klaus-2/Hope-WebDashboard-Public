const { fetch } = require('undici');

async function getData(channelName, clientID, authkey) {
    let data = await fetch(`https://api.twitch.tv/helix/search/channels?query=${channelName}`, { method: 'GET', headers: { 'client-id': clientID, 'Authorization': `Bearer ${authkey}` } }).then(res => res.json()).catch(e => {
        if (e.code === 'ETIMEDOUT') {
            return console.log('timeout');
        }
    });

    try {
        const channelTempData = data.data;
        var doesExist = false;

        for (let i = 0; i < channelTempData.length; i++) {
            if ((channelTempData[i].broadcaster_login).toLowerCase() == channelName.toLowerCase()) {
                doesExist = true;
                return data.data[i];
            }
        }

        if (!doesExist) {
            return;
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = { getData };
