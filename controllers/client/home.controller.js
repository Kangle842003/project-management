const Category = require("../../models/product-category.model")
const Product = require("../../models/product.model")
const createTree = require("../../helpers/createTree.js");
const systemConfig = require("../../config/systemConfig")
const priceProduct = require("../../helpers/priceNewProduct")


// [GET] /
module.exports.index = async (req,res)=>{
    const dataFeatured = await Product.find({
        deleted:false,
        featured:true,
        status:"active"
        
    }).limit(4)
    const dataNew = await  Product.find({
        deleted:false,
        status:"active"
    }).limit(4).sort({ createdAt: -1 })



    dataFeatured.forEach(item => {
            item.priceNew = priceProduct.priceNewProduct(item)
    });
    dataNew.forEach(item => {
             item.priceNew = priceProduct.priceNewProduct(item)
        });
    
    res.render("client/pages/home/index.pug",
        {
            pagetitle : "Trang home",
            dataFeatured : dataFeatured,
            dataNew:dataNew
        }
    )
} 

