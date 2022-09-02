const index = require("../data/index");
const db = require("./index");

const Item = require("../database/models/item.model");

db.connect(() => {
  const Items = index.getItems();
  const items = [];
  for (let i = 0; i < Items.length; i++) {
    if (items.find((element) => element.sku === Items[i].sku)) {
    } else {
      const item = {
        sku: Items[i].sku,
        name: Items[i].name,
        description: Items[i].description,
        sale_price: Items[i].sale_price,
        image_url: Items[i].image_url,
        brand: Items[i].brand,
      };
      items.push(item);
    }
  }

  Item.deleteMany().then();
  for (let i = 0; i < items.length; i++) {
    const newItem = new Item({
      sku: items[i].sku,
      name: items[i].name,
      description: items[i].description,
      sale_price: items[i].sale_price,
      image_url: items[i].image_url,
      brand: items[i].brand,
    });
    newItem.save().then(() => {
      console.log(`${i + 1} - Item ${Items[i].sku} ajouté.`);
    });
  }
});
