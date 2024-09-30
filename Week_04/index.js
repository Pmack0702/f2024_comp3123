const express = require('express');
const app = express();  
const SERVER_PORT = 3000;

app.get('/hello', (req, res) => {
  res.send('Hello Express JS');
});

// GET request to /user with default values
app.get('/user', (req, res) => {
  const fnm = req.query.fnm || 'Pritesh';
  const lnm = req.query.lnm || 'Patel';
  res.status(200).json({ fnm, lnm });
});

// GET request to /user with query parameters
app.get('/user', (req, res) => {
  const fnm = req.query.fnm || 'First';
  const lnm = req.query.lnm || 'Last';
  res.send(`First Name: ${fnm}, Last Name: ${lnm}`);
});

// GET request to /user with path parameters
app.get('/user/:fnm/:lnm', (req, res) => {
  const fnm = req.params.fnm;
  const lnm = req.params.lnm;
  res.send(`First Name: ${fnm}, Last Name: ${lnm}`);
});

// POST request to /user with path parameters
app.post('/user/:firstname/:lastname', (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

// to make the object listen we use
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`)
});
