const express = require('express');

const port = 9000;

const app = express();

app.set('view engine', 'ejs');

const path = require('path');

app.use(express.urlencoded());

const cookie = require('cookie-parser');
const fs = require('fs');

app.use(cookie());

app.use('/', require('./routes/userRoutes'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require('./config/db');

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})