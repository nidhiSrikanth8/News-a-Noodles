const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env
const router = express.Router();

// Get the API key from the environment variable
const API_KEY = process.env.NEWS_API_KEY;

// Route to fetch the latest news articles
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',  // You can change this to any country code
        apiKey: API_KEY, // Pass your API key
      },
    });

    const articles = response.data.articles;
    res.render('news', { articles }); // Render 'news.ejs' and pass articles
  } catch (error) {
    console.error('Error fetching news:', error);
    res.render('news', { articles: [] }); // In case of an error, render an empty array
  }
});

// Route to fetch article details by URL or title
router.get('/article/:url', async (req, res) => {
  const articleUrl = req.params.url; // Get the article URL from the URL parameter

  try {
    // Use the `url` parameter to fetch the article details
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: articleUrl,  // Use URL to search for article
        apiKey: API_KEY,
      },
    });

    const article = response.data.articles[0]; // Assuming the first article is the one you're looking for
    res.render('article', { article }); // Render 'article.ejs' and pass article
  } catch (error) {
    console.error('Error fetching article:', error);
    res.send('Error fetching article');
  }
});

module.exports = router;
