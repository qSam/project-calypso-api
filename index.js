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
//mongoose.connect('mongodb://localhost:calypso/calypso');
mongoose.connect('mongodb://heroku_b3jlsb12:r1cbklsetd9t58t5bpic3a9h9h@ds031591.mlab.com:31591/heroku_b3jlsb12');


//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

router(app);

//Server Setup
const port = process.env.PORT || 3080;
const server = http.createServer(app);
server.listen(port);
