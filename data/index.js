const ITEMS_FILE = "./data/items.json";
const LINES_FILE = "./data/lines.json";
const SALES_FILE = "./data/sales.json";
const CONFIG_FILE = "./data/config.json";
const Loader = require("./Loader");

const fs = require("fs");
const chalk = require("chalk");

const ItemsLoader = new Loader(ITEMS_FILE);
const LinesLoader = new Loader(LINES_FILE);
const SalesLoader = new Loader(SALES_FILE);
const ConfigLoader = new Loader(CONFIG_FILE);

function getItems() {
  return ItemsLoader.get();
}

function getLines() {
  return LinesLoader.get();
}

function getSales() {
  return SalesLoader.get();
}

function getConfig() {
  return ConfigLoader.get();
}

function sortItems(items) {
  items.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}
function addLines(body) {
  const items = getItems();
  const lines = getLines();

  const quantity = body.quantity;
  const name = body.name;
  if (body.quantity < 1) {
    console.log("Doit avoir aux moins plus de 1 dans quantité");
    return;
  }
  if (body.name === "") {
    console.log("Doit selectionner un item");
    return;
  }

  if (lines.find((element) => element.name === name)) {
    const index = lines.findIndex((element) => element.name === name);
    const line = lines[index];
    line.quantity += +body.quantity;
    line.amount += +body.quantity * line.price;
    LinesLoader.save(lines);
    console.log(`${body.quantity} a étaiot rajouter`);
  } else {
    const index = items.findIndex((element) => element.name === name);
    const item = {
      sku: items[index].sku,
      quantity: +quantity,
      name: name,
      price: items[index].sale_price,
      amount: items[index].sale_price * quantity,
      image_url: items[index].image_url,
    };

    LinesLoader.add(item);

    console.log(`${quantity} ${name} a était rajouter `);
  }
}

function addSales(body) {
  const lines = getLines();

  const sale = {
    lines: lines,
    subtotal: body.subtotal,
    gst: body.gst,
    qst: body.qst,
    total: body.total,
  };

  SalesLoader.add(sale);
  console.log("Une ventes a été enregistrer");
  const linesempty = [];
  LinesLoader.save(linesempty);
}

exports.getItems = getItems;
exports.getLines = getLines;
exports.getSales = getSales;
exports.sortItems = sortItems;
exports.addLines = addLines;
exports.getConfig = getConfig;
exports.addSales = addSales;
