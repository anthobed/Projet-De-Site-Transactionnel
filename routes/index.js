const router = require("express").Router();
const saleRouter = require("./sale.routes");
const itemsRouter = require("./items.routes");
const usersRouter = require("./users.routes");
const authRouter = require("./auth.routes");

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("home", { user: req.user });
});

router.use("/items", itemsRouter);
router.use("/sale", saleRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
