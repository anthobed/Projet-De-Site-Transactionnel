const User = require("../database/models/user.model");

exports.createUser = async (data) => {
  console.log("DATA :: ", data);
  // data => email, password
  // marco99 => /O/"O/"RU"/ORU/"ORU"/(R&"/ur32r23r23iru3r")
  const hashedPassword = await User.hashPassword(data.password);
  const user = new User({
    local: {
      email: data.email,
      password: hashedPassword,
    },
  });
  return user.save();
};

exports.getUserById = (id) => {
  return User.findById(id).exec();
};

exports.findByEmail = (email) => {
  return User.findOne({ "local.email": email });
};
