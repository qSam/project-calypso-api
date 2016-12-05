//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();

//DB Setup
mongoose.connect('mongodb://localhost:calypso/calypso');


//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

router(app);

//Server Setup
const port = process.env.PORT || 3080;
const server = http.createServer(app);
server.listen(port);
