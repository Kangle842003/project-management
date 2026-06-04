const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
// [GET] admin/products
module.exports.index = async (req,res) =>{
    let find = {
        deleted : false
    }
    
    const filterStatus = filterStatusHelper(req.query)
    
    if(req.query.status){
        find.status = req.query.status
    }
    

    let keyword = ""
    
    if(req.query.keyword){
        keyword = req.query.keyword
        const regex = new RegExp(keyword,"i")
        find.title = regex
    }

    const data = await Product.find(find)
    

    res.render("admin/pages/product/index.pug",{
        data: data,
        filterStatus : filterStatus,
        keyword : keyword,
        pagetitle : "Trang san pham"
    })
}