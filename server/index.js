const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const auth = require('./auth/index.js');

require('dotenv').config();

const app = express();

app.use(volleyball);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: "Hello world!"
    });
});

app.use('/auth', auth);

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
  }
  
  function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
      message: err.message,
      stack: err.stack
    });
  }
  
  app.use(notFound);
  app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening on port 8000");
});

