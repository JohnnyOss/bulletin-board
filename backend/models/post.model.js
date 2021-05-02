const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  datePublication: { type: String, required: true },
  dateLastUpdate: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
