var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    return res.json({ result: false, error: 'Missing or empty fields' });
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: uid2(32),
        canBookmark: true,
      });

      newUser.save().then(newDoc => {
        return res.json({
          result: true,
          username: newDoc.username,
          token: newDoc.token,
        });
      });
    } else {
      // User already exists in database
      return res.json({ result: false, error: 'User already exists' });
    }
  });
});

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    return res.json({ result: false, error: 'Missing or empty fields' });
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      return res.json({
        result: true,
        username: data.username,
        token: data.token,
      });
    } else {
      return res.json({
        result: false,
        error: 'User not found or wrong password',
      });
    }
  });
});

router.get('/canBookmark/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      return res.json({ result: true, canBookmark: data.canBookmark });
    } else {
      return res.json({ result: false, error: 'User not found' });
    }
  });
});

module.exports = router;
