const HTTP_PORT = 3000;

const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const router = require("./routes");
const db = require("./database/index");
exports.app = app;

require("./middleware/sessions.middleware");
require("./config/passport.config");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "pug");

app.use(router);

const errorHandling = (err, req, res, next) => {
  res.render("error", { error: err });
};
app.use(errorHandling);

db.connect(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`Serveur NodeJS démarré sur http://localhost:${HTTP_PORT}`);
  });
});
