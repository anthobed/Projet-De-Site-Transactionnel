const mongoose = require("mongoose");

const protocol = "mongodb+srv";
const url = "cluster0.bbtxu.mongodb.net";
const params = "?retryWrites=true&w=majority";
const username = "User";
const password = "pw4User$";
const database = "1159573";

const connectionString = `${protocol}://${username}:${password}@${url}/${database}${params}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

exports.connect = (callback) =>
  mongoose
    .connect(connectionString, options)
    .then((db) => {
      console.log(`Connecté avec succès à la base ${database} sur ${url}`);
      if (callback) callback();
    })
    .catch((err) => {
      console.log(err);
    });

exports.connectionString = connectionString;
