const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Load Test */
app.get('/loaderio-8cf6c0f47276abcf129b98f5691e13e0', function (req, res) {
    res.sendFile(path.join(__dirname, 'loader.txt'));
});