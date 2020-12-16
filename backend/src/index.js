const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/AuthController')(app);
require('./controllers/PostController')(app);

app.listen(3333);