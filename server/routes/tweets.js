"use strict";

const express       = require('express');
const cookieSession = require("cookie-session");

const tweetsRoutes  = express.Router();

const app           = express();

app.use(cookieSession({name: "session", secret: "it's a secret to everybody"}));

module.exports = function(DataHelpers, UserHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    } //else if (!req.session.user || !authorized(req.session.user, req.body.user)) {
      //res.status(403).json({ error: 'not logged in'});
      //return;
    //}

    const user = req.session.user ? req.session.user : UserHelpers.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
