const userHelper    = require("../lib/user-helpers")

const bodyParser    = require("body-parser");
const express       = require("express");

const bcrypt        = require("bcrypt");
const cookieSession = require("cookie-session");

const usersRoutes   = express.Router();

const app           = express(); 
app.use(cookieSession({name: "session", secret: "it's a secret to everybody"}));
app.use(bodyParser.urlencoded({ extended: true }));

