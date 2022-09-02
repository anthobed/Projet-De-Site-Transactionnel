const Line = require("../database/models/line.model");

exports.getLines = () => {
  return Line.find({}).exec();
};

exports.getLine = (name) => {
  return Line.findOne({ name: name }).exec();
};

exports.updateLine = (name, quantity) => {
  return Line.findOneAndUpdate(
    { name: name },
    { $inc: { quantity: quantity } },
    { runValidators: true, new: true }
  );
};

exports.deleteLines = () => {
  return Line.deleteMany({});
};

exports.createLine = (quantity, item) => {
  const newLine = new Line({
    sku: item.sku,
    quantity: quantity,
    name: item.name,
    price: item.sale_price,
    image_url: item.image_url,
  });
  return newLine.save();
};
