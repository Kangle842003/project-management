const Product = require("../../models/product.model")

module.exports.index = async (req,res)=>{
    const data = await Product.find({})
    console.log(data)
    res.render("client/pages/product/index.pug",
        {   
            data:data,
            pagetitle : "Trang San pham"
        }
    )
}