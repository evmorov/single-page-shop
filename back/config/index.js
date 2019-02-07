const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`);

console.log(`Environment: ${config.env}`);

module.exports = config;
