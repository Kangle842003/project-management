const Product = require("../../models/product.model")
const priceProduct = require("../../helpers/priceNewProduct")

// [GET] /products
module.exports.index = async (req,res)=>{
    let find = {
        deleted:false,
        status: "active"
    }
    const data = await Product.find(find).sort({ position: "desc" })
    data.forEach(item => {
         item.priceNew = priceProduct.priceNewProduct(item)
    });
    // console.log(data)
    res.render("client/pages/product/index.pug",
        {   
            pagetitle : "Trang San pham",
            data:data
        }
    )   
}

// [GET] /products/detail/:slug
module.exports.view = async (req, res) => {
    const id = req.params.id;

    const data = await Product.findOne({
        _id: id,
        deleted: false,
        status: "active"
    });

    data.priceNew = priceProduct.priceNewProduct(data)
    // console.log(data)

    res.render("client/pages/product/detail", {
        pagetitle: data.title,
        data: data,
    });
};