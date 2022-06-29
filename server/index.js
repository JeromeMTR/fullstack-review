const express = require('express');
const mongoose = require('mongoose');
const github = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!ß
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // get username from request
  // request repos from github api's
  // loop through data from api
  // pass data to save function to store to database
  let username = req.body.username;
  console.log(username);
  github(username, (err, data) => {
    if (err) {
      res.status(503).end();
    }
    for (let i = 0; i < data.length; i++) {
      let currentRepo = {
        repoId: data[i].id,
        username: data[i].owner.login,
        repoName: data[i].name,
        repoLink: data[i]['html_url'],
        size: data[i].size
      }
      db.save(currentRepo, (err) => {
        if (err) {
          res.status(403).end();
        }
      })
    }
    res.status(201).end();
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get((err, data) => {
    if (err) {
      res.status(500).end();
    }
    res.status(200).json(data); // remember to use json instead of end
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

/*


*/