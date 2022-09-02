const router = require("express").Router();

const {
  getSignupForm,
  createUser,
} = require("../controllers/users.controller");

router.get("/signup", getSignupForm);
router.post("/signup", createUser);

module.exports = router;
