// Update with your config settings.
const password = require("./password.private.js");

module.exports = {
    development: {
        client: "pg",
        connection: {
            database: "cluckr",
            username: "john",
            password: password
        },

        migrations: {
            directory: "db/migrations"
        }
    }
};
