const router = require("express").Router();
const passport = require("passport");

const {
  getSigninForm,
  deleteSession,
} = require("../controllers/auth.controller");

router.get("/signin", getSigninForm);

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/signin",
  })
);

router.get("/signout", deleteSession);

module.exports = router;
