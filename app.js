require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

// import passport docs from config folder
const passportSetup = require('./config/passport/passport-setup');

mongoose
  // .connect('mongodb://localhost/project3-backend', {useNewUrlParser: true})
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// allow CORS (Cross Origin Resource Sharing)
app.use(
  cors({
    // allows other origins/domains to send the cookies
    credentials: true,
    // the array of domains/origins we want to allow cookies from (in our case, that is the React app, which runs on port 3000)
    origin: ['http://localhost:3000'] // <== URL of React application
  })
);

// handle session:
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// passportSetup MUST come after the session:
passportSetup(app);

// ROUTES MIDDLEWARE:
const index = require('./routes/index');
app.use('/', index);

app.use('/api', require('./routes/auth-routes'));
app.use('/api', require('./routes/category-routes'));
app.use('/api', require('./routes/item-routes'));
app.use('/api', require('./routes/file-upload-routes'));

module.exports = app;