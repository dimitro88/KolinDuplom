const express = require('express');
const swaggerTools = require('swagger-tools');

const config = require('./config/config.json');
const auth = require('./middleware/auth/auth');
const mongose = require('mongoose');
const cors = require('cors');
console.log(process.env);

function getMongoConfig() {
  if (process.env.NODE_ENV === 'production') {
    return config.productionDB;
  }

  // TODO CHANGE IT TO return config.localDB after production pm2 fix
  return config.localDB;
}

mongose.Promise = global.Promise;
mongose
  .connect(getMongoConfig(), {
    useMongoClient: true,
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

const morgan = require('morgan');

const swaggerDoc = require('./config/serverApi');
const errorHandler = require('./helpers/errorHelper');

const app = express();

app.use(express.static('public'));
app.use(
  morgan(
    ':method :url :status :res[text] :res[content-length] -:response-time ms',
  ),
);

// swagger configuration
const options = {
  controllers: './controllers',
  useStubs: 'development',
};

app.enable('trust proxy');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-Width, Content-Type, Accept',
  );
  res.header(
    'Access-Control-Expose-Headers',
    'Content-Type, Content-Disposition',
  );
  next();
});

const authFromDb = require('./middleware/auth')();
app.use(authFromDb.initialize());

swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
  app.use(middleware.swaggerMetadata());
  app.use(cors());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerSecurity(auth.swaggerAuth));
  app.use(middleware.swaggerRouter(options));
  app.use(errorHandler());
});
if (config.swaggerUi) {
  const swaggerUi = require('swagger-ui-express');
  app.use(
    config.server.swaggerPath,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, true),
  );
}
app.listen(config.server.port);
console.log(`server start on port: ${config.server.port}`);
console.log(`swagger docs api with url: ${config.server.swaggerPath}`);

module.exports = app;
