const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  _id: { type: String },
  session: { type: Object },
});

module.exports = mongoose.model('sessions', sessionSchema);
