
const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    port: process.env.DBPORT,
    connectionString: process.env.DBConnLink,
    ssl: {
        rejectUnauthorized: false
    }

});


module.exports = {
    pool
}

