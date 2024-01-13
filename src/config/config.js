const dotenv = require('dotenv');
dotenv.config();

const config = {
    DB_DBNAME: process.env.DB_DBNAME || 'pokedex',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
};

module.exports = config;
