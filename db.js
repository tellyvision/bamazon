var mysql = require("mysql");

function login() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'bamazon',
        multipleStatemants: true
    });

    return connection;

}

module.exports = {
    login: login

};