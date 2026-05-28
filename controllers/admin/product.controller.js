const Product = require("../../models/product.model")

// [GET] admin/products
module.exports.index = async (req,res) =>{
    let find = {
        deleted : false
    }

    const data = await Product.find(find)
    // console.log(data)

    res.render("admin/pages/product/index.pug",{
        data: data,
        pagetitle : "Trang san pham"
    })
}