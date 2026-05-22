import mysql from 'mysql2';
import 'dotenv/config';

const DBD = process.env;

const db = mysql.createConnection({
    host: DBD.DB_HOST,
    user: DBD.DB_USER,
    password: DBD.DB_PASSWORD,
    database: DBD.DB_DATABASE
});

console.log(DBD.DB_USER)

export default db;