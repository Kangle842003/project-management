const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const search = require("../../helpers/search")
// [GET] admin/products
module.exports.index = async (req,res) =>{
    let find = {
        deleted : false
    }
    
    const filterStatus = filterStatusHelper(req.query)
    
    if(req.query.status){
        find.status = req.query.status
    }
    
    const search = searchHelper(req.query)
    if(search.keyword){
        find.title = search.regex
    }

    const data = await Product.find(find)
    

    res.render("admin/pages/product/index.pug",{
        data: data,
        filterStatus : filterStatus,
        keyword : search.keyword,
        pagetitle : "Trang san pham"
    })
}