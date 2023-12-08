var express = require('express');
var router = express.Router();

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
      if (data.status === 'ok') {
        return res.json(data);
      } else {
        return res.status(statusCode).json({ error: data.message });
      }
    });
});

/* GET the tech articles from selected sources */
router.get('/articles/:selectedSources', (req, res) => {
  const { selectedSources } = req.params;

  fetch(
    `https://newsapi.org/v2/top-headlines?sources=${selectedSources}&apiKey=${NEWS_API_KEY}`
  )
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        const articles = [];
        const regex = /^https:\/\//i;

        data.articles.map(article => {
          if (!regex.test(article.urlToImage)) {
            article.urlToImage = null;
          }
          articles.push(article);
        });

        return res.json({ articles });
      } else {
        return res.json({ articles: [] });
      }
    });
});

module.exports = router;
