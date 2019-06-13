"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const UserHelpers = require("./lib/user-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers, UserHelpers);
  // const usersRoutes = require("./routes/users")(UserHelpers);
  app.use("/tweets", tweetsRoutes);
  // app.use("/users", usersRoutes);
});

/* app.get("*", (req, res) => {
  res.status(404).send("<h1>404 PAGE NOT FOUND</h1>");
}); */

app.listen(PORT, () => {
  console.log("Tweeter listening on port " + PORT);
});
