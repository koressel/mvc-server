// DATABASE_URL = postgresql-infinite-40591 
const { Client } = require('pg');

module.exports = {
    getApplications: function() {
        const client = new Client({
            connectionString: 'postgresql-infinite-40591',
            ssl: {
                rejectUnauthorized: false
            }
            });

        client.connect();

        let data = [];
        
        client.query('SELECT * FROM applications;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            // console.log(JSON.stringify(row));
            data.push(JSON.stringify(row))
        }
        client.end();
        });

        // var data = [
        //     {
        //         position: 'Developer',
        //         company: 'Google',
        //         date: '02/28/2021'
        //     },
        //     {
        //         position: 'Web Developer',
        //         company: 'Facebook',
        //         date: '02/28/2021'
        //     },
        //     {
        //         position: 'Tech Lead',
        //         company: 'Spotify',
        //         date: '02/28/2020'
        //     },
        // ];
        return data;
    }
}