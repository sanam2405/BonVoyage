const express = require('express');
const app = express();
const port = 80; // Choosing a port for your server



console.log(__dirname);

// Serving static files from the 'assets' directory
app.use(express.static('assets'));


  

// Defining your routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/navigation', (req, res) => {
  res.sendFile(__dirname + '/navigation.html');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
