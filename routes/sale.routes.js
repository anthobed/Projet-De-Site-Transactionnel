const router = require("express").Router();
const index = require("../data/index");
const db = require("../database/index");
const Line = require("../database/models/line.model");
const Sale = require("../database/models/sale.model");
const Item = require("../database/models/item.model");
const {
  showItemsAndLines,
  addLine,
} = require("../controllers/lines.controllers");
const { addSale } = require("../controllers/sales.controller");

router.get("/", showItemsAndLines);
router.post("/", addLine);
router.post("/close", addSale);

module.exports = router;
