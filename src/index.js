const app = require('./app');
require('./database');
require('dotenv').config({path: '.env'});

const host = process.env.host || '0.0.0.0';
const port = process.env.PORT || 4000;

async function main() {
    await app.listen(port, host, () => {
        console.log('Server ON en heroku!')
    });
    console.log('servidor en puerto 4000');
}

main();