const express = require('express');
const fs = require('fs');
const useragent = require('express-useragent');
const dateTime = require('node-datetime');
const os = require('os');

const app = express();

var dt = dateTime.create();
var format = dt.format('d-m-Y H:M:S');

app.use(useragent.express());

let logger = (req, res, next) => { // creating the middleware
    let log = `${format} | ${req.connection.remoteAddress} | ${req.connection.remotePort} | ${req.useragent.source} | ${os.hostname()} | http:10.0.0.6:3000${req.url}`; // generating log
    //res.send(log); // printing out in browser
    fs.appendFile("logs.txt", log + "\n", err => { // appending it in a file
        if (err) {
            console.log(err);
        }
    });
    next();
};

app.use(logger);

app.get('/', (req,res) => {
    res.send("This is the home page");
});

app.get('/about', (req, res) => {
    res.send("This is the about page");
});

app.listen(3000, () => {
    console.log("App running on port 3000");
});