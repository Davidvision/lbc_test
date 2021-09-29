const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const morgan = require('./config/morgan');
const ApiError = require('./utils/ApiError');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const config = require('./config/config');
const { initDevs } = require('./config/lbcTeams');
const logger = require('./utils/logger');
const { Dev } = require('./models');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json({ limit: '1mb' }));

app.use((_, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PATCH, DELETE');
  next();
});

app.use(routes);

// send back a 404 error for any unknown api request
app.use((_, __, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

async function initializeDevs() {
  const currentDevs = await Dev.find({});
  if (currentDevs.length === 0) {
    await Dev.insertMany(initDevs);
  }
}

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(async () => {
    logger.info('Connected to MongoDB');
    // initializing dev documents if collection is empty
    await initializeDevs();
    app.listen(config.port, () => {
      logger.info(`Running on port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
