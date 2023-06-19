import mysql from 'mysql'
import dotenv from 'dotenv';
dotenv.config();

const DBHost = process.env.DBHOST;
const DBName = process.env.DATABASE;
const DBUsername = process.env.USERID;
const DBSecret = process.env.DBSECRET;
const DBPort = process.env.DBPORT;

var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else {
    connection = mysql.createConnection({
        port: DBPort,
        host: DBHost,
        user: DBUsername,
        password: DBSecret,
        database: DBName,
    });
}
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

export default connection;