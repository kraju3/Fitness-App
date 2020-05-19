const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');
const fitbitRouter = require('./routes/fitbit');
// const usersRouter = require('./models/users_dao');
require('dotenv').config();

const app = express();

// view engine setup
app.engine('.hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// logging http request when not in test mode

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(
  session({
    secret: 'foo',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: true },
  }),
);

app.use('/', indexRouter);
app.use('/', fitbitRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
