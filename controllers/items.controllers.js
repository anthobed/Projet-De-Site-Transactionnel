const {
  getItems,
  addItem,
  delItem,
  sortItem,
  getMaxPage,
  getPageOrder,
} = require("../queries/items.queries");
let numberItem = 10;

exports.showItems = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      res.redirect("/");
    }
    const page = 1;
    const Items = await getItems();
    const maxPage = await getMaxPage(Items);
    const pages = await getPageOrder(Items, page, maxPage);
    const items = sortItem(Items, page, numberItem);
    res.render("items", {
      items,
      page,
      numberItem,
      maxPage,
      pages,
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.addItem = async (req, res, next) => {
  try {
    console.log(`Req.body-add: ${req.body.data}`);
    const item = req.body.data;
    const newItem = await addItem(item);
    res.render("item", item);

    /// renvoyer un pug qui a juste 1 items dedans
  } catch (err) {
    next(err);
  }
};

exports.delItem = async (req, res, next) => {
  try {
    const item = req.body.item;
    await delItem(item);
    res.send({ data: { item } });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    console.log(`Req.body-modif: ${req.body.params}`);
    const items = req.body;
    await updateItem(item);
    res.render("items", { items });
  } catch (err) {
    next(err);
  }
};

exports.paging = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      res.render("error", user);
    }
    const page = req.params.page;
    const numberItem = 10;
    const Items = await getItems();
    const items = sortItem(Items, page, numberItem);
    const maxPage = await getMaxPage(Items);
    const pages = await getPageOrder(Items, page);
    if (page > maxPage) {
      res.redirect("/items");
    } else {
      res.render("items", { items, page, numberItem, maxPage, pages, user });
    }
  } catch (err) {
    next(err);
  }
};

exports.numberItem = async (req, res, next) => {
  try {
    console.log(req.body.numberItem);
    numberItem = req.body.number;

    res.send(numberItem);
  } catch (err) {
    next(err);
  }
};
