// Main starting point of app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose =require('mongoose');
// app.get('/xyz', function (req, res, next) {
//  res.send("Ram Ram");
// });

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');
//App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);
//Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on', port);