require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const app = express();
const port = 5000; // Use a different port

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));

// Templating engine setup
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Import and use the news router
const newsRouter = require("./src/routes/news");
app.use("/", newsRouter);

// Start the server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
