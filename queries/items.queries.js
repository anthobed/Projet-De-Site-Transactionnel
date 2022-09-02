const Item = require("../database/models/item.model");

exports.getItems = () => {
  return Item.find({}).sort({ name: 1 }).exec();
};

exports.getItem = (name) => {
  return Item.findOne({ name: name }).exec();
};

exports.addItem = (item) => {
  const newItem = new Item({
    sku: item.sku,
    name: item.name,
    description: item.description,
    sale_price: item.sale_price,
    image_url: item.image_url,
    brand: item.brand,
  });
  return newItem.save();
};

exports.delItem = (item) => {
  return Item.findByIdAndDelete(item._id);
};

exports.updateItem = (item) => {
  return Item.findByIdAndRemove(
    item.id,
    { $set: item },
    { runValidators: true }
  );
};

exports.getItemBySku = (sku) => {
  return Item.findOne({ sku: sku }).exec();
};

exports.sortItem = (items, page, numberItem) => {
  const Items = [];
  for (
    let index = page * numberItem - numberItem;
    index < numberItem * page;
    index++
  ) {
    const item = items[index];
    Items.push(item);
  }
  return Items;
};

exports.getMaxPage = (items) => {
  const itemsNumber = items.length;
  const numberPage = 10;
  const maxPage = itemsNumber / numberPage;
  return Math.ceil(maxPage);
};
exports.getPageOrder = (items, page, maxPage) => {
  if (page < 4) {
    const pages = {
      page1: 1,
      page2: 2,
      page3: 3,
      page4: 4,
      page5: 5,
      page6: 6,
      page7: 7,
    };
    return pages;
  }
  if (page == maxPage) {
    const pages = {
      page1: maxPage - 6,
      page2: maxPage - 5,
      page3: maxPage - 4,
      page4: maxPage - 3,
      page5: maxPage - 2,
      page6: maxPage - 1,
      page7: maxPage,
    };
    return pages;
  }
  if (page == maxPage - 1) {
    const pages = {
      page1: maxPage - 6,
      page2: maxPage - 5,
      page3: maxPage - 4,
      page4: maxPage - 3,
      page5: maxPage - 2,
      page6: maxPage - 1,
      page7: maxPage,
    };
    return pages;
  } else {
    const pages = {
      page1: page - 3,
      page2: page - 2,
      page3: page - 1,
      page4: page,
      page5: +page + 1,
      page6: +page + 2,
      page7: +page + 3,
    };
    return pages;
  }
};

exports.addNumberItems = (numberItem) => {};
