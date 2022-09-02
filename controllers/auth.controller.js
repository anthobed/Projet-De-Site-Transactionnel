exports.getSigninForm = (req, res, next) => {
  const user = req.user;
  if (user) {
    res.redirect("/");
  }

  res.render("signin.pug");
};

exports.deleteSession = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
