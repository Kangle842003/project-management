const productCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/systemConfig")

//[GET] /admin/products-category
module.exports.index = async (req,res) =>{
    let find = {
        deleted : false
    }
    const data = await productCategory.find(find)
    res.render("admin/pages/product-category/index",{
        data:data,
        pagetitle:"DANH MUC SAN PHAM"
    })
}

//[GET] /admin/products-category/create
module.exports.create = (req,res) =>{
    res.render("admin/pages/product-category/create",{
        pagetitle:"TAO MOI DANH MUC"
    })
}

//[POST] /admin/products-category/create
module.exports.createPost = async (req,res) =>{
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }
    else{
        const count = await productCategory.countDocuments()
        // console.log(count)
        req.body.position = count + 1
    }
    console.log(req.body)
    const data = new productCategory(req.body)
    await data.save()

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}