const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required: [true, 'User id is required'] },
  _email: { type: String, required: [true, 'Email is required'] },
  name: {
    firstname: { type: String, required: [true, 'first name is required'] },
    lastname: { type: String, required: [true, 'last name is required'] },
  },
  password: {
    old: { type: String, required: false },
    current: { type: String, required: [true, 'Password is required'] },
  },
  physique: {
    height: { type: String, required: false },
    weight: { type: String, required: false },
    age: { type: String, required: false },
  },
});

module.exports = mongoose.model('users', userSchema);
