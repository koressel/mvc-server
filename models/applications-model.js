// DATABASE_URL = postgresql-infinite-40591 
const { Client } = require('pg');

const dbConfig = {
    host: 'localhost',
    user: 'server',
    password: 'K2;aFACK!',
    database: 'applicationdashboard',
    port: 5432
}

module.exports = {
    getAll: function() {
        return new Promise((resolve,reject) => {
            const client = new Client(dbConfig);
    
            client.connect();

            client.query('SELECT * FROM applications;', (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(res.rows)

                client.end();
            });
        });
    },

    create: function(data) {
        console.log(data)
        return new Promise((resolve,reject) => {
            const client = new Client(dbConfig);
            
            client.connect();

            client.query(`INSERT INTO applications(position,company,date,id) VALUES('${data.position}','${data.company}','${data.date}',default);`, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                // KNOWN BUG
                // Need to escape special characters at some point before this.
                // Found when trying to run above query with 'Papa John\'s' as a value for company
                resolve(res.rows);

                client.end();
            })
        });
    },

    delete: function(data) {
        console.log(data)
        return new Promise((resolve,reject) => {
            const client = new Client(dbConfig);

            client.connect();

            client.query(`DELETE FROM applications WHERE position='${data.position}' AND company='${data.company}'`, (err, res) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                console.log(res)
                resolve(res.rows);
                client.end();
            });
        });
    }
}