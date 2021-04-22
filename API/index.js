const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');


dotenv.config({path:".env"});

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/users',routes());

app.use(function(req, res, next) {
    res.status(404).send('error');
});


connectDB();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 4000

app.listen(PORT,HOST, () => {
    console.log('servidor andando');
})