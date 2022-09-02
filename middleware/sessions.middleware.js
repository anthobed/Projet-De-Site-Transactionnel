const mongoose = require("../database");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { app } = require("../app");

app.use(
  session({
    secret: "8b47a9a1-09d8-4419-97b8-152025280f1b",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: mongoose.connectionString,
      ttl: 60 * 60 * 24 * 15,
    }),

    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
    },
  })
);
