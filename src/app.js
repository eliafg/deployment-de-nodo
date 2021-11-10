const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', 4000);

//middlewares

app.use(cors());
app.use(express.json());
//routes
//USERS
app.use('/api/users', require('./routes/users'))
    //NOTES
app.use('/api/notes', require('./routes/notes'))


module.exports = app;