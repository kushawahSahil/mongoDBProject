const config = require('config');

module.exports = function () { if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey os not defined.');
}
}