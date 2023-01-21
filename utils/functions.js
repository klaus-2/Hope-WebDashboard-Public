// Generate the code for the Auth
module.exports.makeAuthkey = () => {
    const length = 16,
        charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = length; i > 0; --i) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
};

// Check the connecting IP
module.exports.checkIP = (req) => {
    return req.ip ||
    req._remoteAddress ||
      (req.connection && req.connection.remoteAddress) ||
        undefined;
};