const mysql = require("mysql2");
// require('dotenv').config();
const connect = mysql.createPool({
    host:process.env.SQL_HOST,
    user:process.env.SQL_USERNAME,
    password:process.env.SQL_PASSWORD,
    database:process.env.SQL_DATABASE,
}).promise();

module.exports = {connect};