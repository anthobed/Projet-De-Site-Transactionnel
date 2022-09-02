const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const schema = mongoose.Schema({
  local: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
});

schema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
};

schema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

module.exports = mongoose.model("User", schema);
