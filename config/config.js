const dbConfig = require('../db.json');

dbConfig.db = dbConfig.db ? dbConfig.db : "mongodb://localhost/tunji-web-dev";
dbConfig.sessionSecret = process.env.SESSION_SECRET ? process.env.SESSION_SECRET : 'developmentSessionSecret';

module.exports = dbConfig;
