//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');


//App Setup
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

router(app);

//Server Setup
const port = process.env.PORT || 3080;
const server = http.createServer(app);
server.listen(port);
