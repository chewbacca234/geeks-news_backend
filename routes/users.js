var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* POST Register new user */
router.post('/signup', (req, res) => {
  // Check if sended datas are correct
  if (!checkBody(req.body, ['username', 'password'])) {
    return res.json({ result: false, error: 'Missing or empty fields' });
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      // User doesn't exists in database
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: uid2(32),
        canBookmark: true,
        hiddenArticles: req.body.hiddenArticles,
        sources: req.body.sources,
      });

      // If all ok save new user & return username & token
      newUser.save().then(newDoc => {
        return res.json({
          result: true,
          username: newDoc.username,
          token: newDoc.token,
        });
      });
    } else {
      // If user already exists in database return error message
      return res.json({ result: false, error: 'User already exists' });
    }
  });
});

/* POST Connect existing user */
router.post('/signin', (req, res) => {
  // Check if sended datas are correct
  if (!checkBody(req.body, ['username', 'password'])) {
    return res.json({ result: false, error: 'Missing or empty fields' });
  }

  // Check if the user exists in Db
  User.findOne({ username: req.body.username }).then(data => {
    // Check if the password is correct
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      // If all ok return username & token
      return res.json({
        result: true,
        username: data.username,
        token: data.token,
        hiddenArticles: data.hiddenArticles,
        bookmarks: data.bookmarks,
        sources: data.sources,
      });
    } else {
      // If user doesn't exists in database or wrong password return error message
      return res.json({
        result: false,
        error: 'User not found or wrong password',
      });
    }
  });
});

/* PUT Update user's bookmarks, selected sources & hidden articles */
router.put('/update', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      bookmarks: req.body.bookmarks,
      hiddenArticles: req.body.hiddenArticles,
      sources: req.body.sources,
    }
  ).then(data => {
    return res.json({ result: true, data });
  });
});

/* GET User can bookmark status */
router.get('/canBookmark/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      // If user exists return the can bookmark boolean
      return res.json({ result: true, canBookmark: data.canBookmark });
    } else {
      // If user doesn't exists in database return error message
      return res.json({ result: false, error: 'User not found' });
    }
  });
});

module.exports = router;
