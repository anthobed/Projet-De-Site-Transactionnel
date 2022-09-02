const router = require("express").Router();
const {
  showItems,
  addItem,
  delItem,
  updateItem,
  paging,
  numberItem,
} = require("../controllers/items.controllers");

router.get("/", showItems);
router.post("/", addItem);
router.patch("/", updateItem);
router.delete("/", delItem);
router.get("/:page", paging);
router.post("/numberpage", numberItem);

module.exports = router;
