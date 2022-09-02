const Sale = require("../database/models/sale.model");

exports.createSale = (lines, results) => {
  const newSale = new Sale({
    lines: lines,
    subtotal: results.subtotal,
    gst: results.gst,
    qst: results.qst,
    total: results.total,
  });
  return newSale.save();
};
