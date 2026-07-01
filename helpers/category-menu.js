const Category = require("../models/product-category.model");
const createTree = require("../helpers/createTree");

module.exports.categoryMenu = async (req, res, next) => {
    const data = await Category.find({
        deleted: false,
        status: "active"
    });

    const newData = createTree(data);

    res.locals.category = newData;   // <-- truyền cho tất cả view

    next();
};