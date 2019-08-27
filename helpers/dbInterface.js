const knex = require("../db/client");

module.exports = {
    async save(data, table = "clucks") {
        return knex(table)
            .insert(data)
            .then(data => {
                return data;
            });
    },

    async saveMultiple(datalist, table) {
        this.save(datalist[0], table).then(() => {
            let newDatalist = datalist.slice(1);
            if (datalist.length === 0) {
                return "done";
            } else {
                this.saveMultiple(newDatalist, table);
            }
        });
    },

    async fetch(id = "*", table = "clucks") {
        if (id === "*") {
            return knex(table)
                .select("*")
                .then(data => {
                    return data;
                });
        } else {
            return knex(table)
                .select({ id: id })
                .then(data => {
                    return data[0];
                });
        }
    },

    async count(table = "clucks", column, grouping) {
        return knex(table)
            .select("tag")
            .count({ count: column })
            .groupBy(grouping)
            .orderByRaw("count DESC, RANDOM()")
            .limit(10)
            .then(data => {
                return data;
            });
    }
};
