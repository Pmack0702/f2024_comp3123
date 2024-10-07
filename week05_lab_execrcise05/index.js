const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const SERVER_PORT = process.env.PORT || 8081; 
const fs = require('fs');  // Import fs module, to read, write and modify files you need import fs module


/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
  // res.send('This is home router');
});

/*
- Return all details from user.json file to client as JSON format
*/

router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf-8', (err, data) => {
      if (err) {
          res.status(500).json({ error: "Error reading user file" });
      } else {
          res.json(JSON.parse(data));
      }
  });
});



/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

// Login route with user validation
router.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;

  fs.readFile('user.json', 'utf-8', (err, data) => {
      if (err) {
          return res.status(500).json({ error: "Error reading user file" });
      }

      const user = JSON.parse(data);

      if (user.username !== username) {
          return res.json({ status: false, message: "User Name is invalid" });
      }

      if (user.password !== password) {
          return res.json({ status: false, message: "Password is invalid" });
      }

      res.json({ status: true, message: "User Is valid" });
  });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/

// Logout route accepting username as a parameter
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.<b>`);
});


/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send('<h1>Server Error</h1>');
});


// console.log('Web Server is listening at port '+ (process.env.port || 8081));
app.listen(SERVER_PORT, () => {
  console.log("The server is running on port 8081");

})