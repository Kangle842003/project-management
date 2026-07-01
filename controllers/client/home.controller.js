const Category = require("../../models/product-category.model")
const createTree = require("../../helpers/createTree.js");
const systemConfig = require("../../config/systemConfig")


// [GET] /
module.exports.index = async (req,res)=>{
    res.render("client/pages/home/index.pug",
        {
            pagetitle : "Trang home"
        }
    )
} 