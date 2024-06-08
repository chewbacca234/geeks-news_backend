const mongoose = require('mongoose');

const bookmakSchema = mongoose.Schema({
  id: String,
  name: String,
});

const bookmarksSchema = mongoose.Schema({
  source: bookmakSchema,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  canBookmark: Boolean,
  bookmarks: [bookmarksSchema],
  hiddenArticles: [String],
  sources: [String],
});

const User = mongoose.model('users', userSchema);

module.exports = User;
