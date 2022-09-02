const { createUser } = require("../queries/users.queries");

exports.getSignupForm = (req, res, next) => {
  const user = req.user;
  if (user) {
    res.redirect("/");
  }
  res.render("signup.pug");
};

exports.createUser = async (req, res, next) => {
  try {
    const user2 = req.user;
    if (user2) {
      res.redirect("/");
    }
    const user = await createUser(req.body);
    req.login(user, (err) => {
      if (err) next(err);
      res.redirect("/");
    });
  } catch (error) {
    res.render("signup", { error: error.message });
  }
};
