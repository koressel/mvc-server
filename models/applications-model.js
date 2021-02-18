// DATABASE_URL = postgresql-infinite-40591 
const { Client } = require('pg');

module.exports = {
    getApplications: function() {
        return new Promise((resolve,reject) => {
            const client = new Client({
                // connectionString: 'postgresql-infinite-40591',
                // ssl: {
                //     rejectUnauthorized: false
                // }
                host: 'localhost',
                user: 'server',
                password: 'K2;aFACK!',
                database: 'applicationdashboard',
                port: 5432
                });
    
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
    }
}