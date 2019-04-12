const express = require('express');
const app = express();

// To make API request - https://www.npmjs.com/package/request
const request = require('request');

// Public folder files served (app.css)
app.use(express.static('public'));

// Serve ejs files
app.set('view engine', 'ejs');


// 2 Routes -> Search en Results

// Search Route. Redirects to results route with 'keyword' as variable in request url -> ?s[keyword].
app.get('/', (req, res) => {
   res.render('search'); 
});


// Results Route
app.get('/results', (req, res) => {
    
    // Store search keyword (from input form) in a variable and attach it to ur
    const keyword = req.query.searchkeyword;
    const url = 'http://omdbapi.com/?apikey=thewdb&s=' + keyword;
    
    // Request API - https://www.npmjs.com/package/request
    
    request(url, (error, response, body) => {
        
        // Display body if !error
        
        if (!error && response.statusCode == 200) {
            const parsedData = JSON.parse(body);
            res.render('results', {data: parsedData});
        }
    })
    
});

app.listen(3000, () => {
    console.log('IMDB started');
});