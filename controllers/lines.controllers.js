const { getItems, getItem } = require("../queries/items.queries");
const {
  getLines,
  getLine,
  updateLine,
  createLine,
} = require("../queries/lines.queries");
const index = require("../data/index");

exports.addLine = async (req, res, next) => {
  try {
    const body = req.body;
    const item = await getItem(body.name);
    if (await getLine(body.name)) {
      await updateLine(body.name, body.quantity);
      res.redirect("/sale");
    } else {
      await createLine(body.quantity, item);
      res.redirect("/sale");
    }
  } catch (err) {
    next(err);
  }
};

exports.showItemsAndLines = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      res.redirect("/");
    }
    const items = await getItems();
    const lines = await getLines();
    const results = getResults(lines);
    res.render("sale", { items, lines, results, user });
  } catch (err) {
    next(err);
  }
};

function getResults(lines) {
  const subtotal = +lines
    .reduce((acc, line) => {
      return acc + line.total;
    }, 0)
    .toFixed(2);
  const config = index.getConfig();
  const gst = +(subtotal * config.tps).toFixed(2);
  const qst = +(subtotal * config.tvq).toFixed(2);
  const total = +(subtotal + gst + qst).toFixed(2);

  return { subtotal, gst, qst, total };
}
