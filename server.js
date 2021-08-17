const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const tinyUrl = require("./controllers/tinyUrl");

//Database Setup
const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin=>>>>", origin);
    callback(null, true);
  },
};

app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.post("/signin", signin.signinAuthentication(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/shortenurl/:url", async (req, res) => {
  tinyUrl.handleUrlRedirect(req, res, db);
});
app.post("/shortenurl", async (req, res) => {
  tinyUrl.handleUrlShorten(req, res, db);
});

app.listen(port, () => {
  console.log("app is running on port 3000");
});
