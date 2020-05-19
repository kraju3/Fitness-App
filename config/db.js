const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/UserInfo`;
// const uri = `${process.env.DB_URI}`;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      throw err;
    }
  },
);
console.log('Devlopment/production db in Use');

const db = mongoose.connection;

module.exports = db;
