const express = require('express');
routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(routes);

module.exports = app;