const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.use(require('./routes/myRoutes'));

module.exports = app;