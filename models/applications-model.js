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
    getApplications: function() {
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
        return new Promise((resolve,reject) => {
            const client = new Client(dbConfig);
            
            client.connect();

            client.query(`INSERT INTO applications(position,company,date) VALUES('${data.position}','${data.company}','${data.date}');`)
        });
    }
}