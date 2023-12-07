var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

/* GET the tech sources top headlines in inglish */
router.get('/sources', (_, res) => {
  let statusCode;

  fetch(
    `https://newsapi.org/v2/top-headlines/sources?language=en&category=technology&apiKey=${NEWS_API_KEY}`
  )
    .then(response => {
      statusCode = response.status;
      return response.json();
    })
    .then(data => {
      console.log('data', data);
      if (data.status === 'ok') {
        return res.json(data);
      } else {
        return res.status(statusCode).json({ error: data.message });
      }
    });
});

/* GET the tech articles from selected sources */
router.get('/articles', (_, res) => {
  fetch(
    `https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=${NEWS_API_KEY}`
  )
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        return res.json({ articles: data.articles });
      } else {
        return res.json({ articles: [] });
      }
    });
});

module.exports = router;
