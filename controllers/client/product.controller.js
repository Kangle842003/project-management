const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req,res)=>{
    let find = {
        deleted:false,
        status: "active"
    }
    const data = await Product.find(find).sort({ position: "desc" })
    // console.log(data)
    res.render("client/pages/product/index.pug",
        {   
            data:data,
            pagetitle : "Trang San pham"
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

    data.priceNew = Math.floor(
        data.price * (100 - data.discountPercentage) / 100
    );
    console.log(data)

    res.render("client/pages/product/detail", {
        pagetitle: data.title,
        data: data,
    });
};