const { getLines, deleteLines } = require("../queries/lines.queries");
const { createSale } = require("../queries/sales.queries");
const index = require("../data/index");
exports.addSale = async (req, res, next) => {
  try {
    const lines = await getLines();
    const results = getResults(lines);
    await createSale(lines, results);
    await deleteLines();
    console.log("Une vente est enregistrer");
    res.redirect("/sale");
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
