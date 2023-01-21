const { default:axios } = require('axios');

const getDiscordTokens = async (code, redirectUri) => {
    const tokensUrl = 'https://discord.com/api/oauth2/token'
    const data = new URLSearchParams()
    data.set('client_id', process.env.discord_client_id)
    data.set('client_secret', process.env.discord_client_secret)
    data.set('grant_type', 'authorization_code')
    data.set('code', code)
    data.set('redirect_uri', redirectUri)

    const response = await axios.post(tokensUrl, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })


    return response.data
}

const getDiscordUserInfo = async (access_token) => {
    const response = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })

    return response.data
}

const revokeDiscordToken = async (token) => {
    const url = `https://discord.com/api/oauth2/token/revoke?token=${token}`
    const response = await axios.post(url, null, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    return response.data
}

module.exports = {
    getDiscordTokens,
    getDiscordUserInfo,
    revokeDiscordToken
}