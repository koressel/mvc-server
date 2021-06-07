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
                // parse filename string
                let applications = res.rows;
                applications.forEach(app => {
                    let fileNames = stringToArray(app.filenames);
                    app.filenames = fileNames;

                })
                console.log(applications)
                resolve(applications);

                client.end();
            });
        });

        function stringToArray(str) {
            let array = [];
            let parsed = false;
        
            while(!parsed) {
                let nextStopChar = str.indexOf(',');
        
                if (nextStopChar !== -1) {
                    console.log(str.substr(0, nextStopChar))
                    array.push(str.substr(0, nextStopChar));
                    str = str.substr(nextStopChar + 1);
                }
                else {
                    array.push(str);
                    parsed = true;
                }
            }
            return array;
        }
    },

    create: function(data) {
        console.log(data)
        return new Promise((resolve,reject) => {
            const client = new Client(dbConfig);
            
            client.connect();

            client.query(`INSERT INTO applications(position,company,date,filenames,id) VALUES('${data.position}','${data.company}','${data.date}','${data.fileNames}',default);`, (err, res) => {
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
    },

    edit: function(data) {
        return new Promise((resolve,reject) => {
            const client = new Client(dbConfig);

            client.connect();

            client.query(`UPDATE applications SET position='${data.position}',company='${data.company}',date='${data.date}' WHERE id='${data.id}'`, (err, res) => {
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