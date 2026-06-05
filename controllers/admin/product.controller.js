const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

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
// pagination   

    let objectPagination = paginationHelper(req.query,{
        limitItem : 4,
        currentPage : 1
    })

    // console.log(objectPagination)

    const count = await Product.countDocuments({deleted:false})
    const pages = Math.ceil(count/objectPagination.limitItem)
    
// End Pagination

    const data = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skipItem)
    

    res.render("admin/pages/product/index.pug",{
        data: data,
        filterStatus : filterStatus,
        objectPagination: objectPagination,
        keyword : search.keyword,
        pages:pages,
        pagetitle : "Trang san pham"
    })
}

// [PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) =>{
    const status = req.params.status 
    const id = req.params.id
    await Product.updateOne({_id:id},{status:status})

    res.redirect(req.get("Referrer") || "/")

}

//[PATCH] admin/products/change-multi
module.exports.changeMulti = async (req,res) =>{
    
    const type = req.body.type
    const ids = req.body.ids.split(",")
    switch (type) {
        case "active":
            await Product.updateMany(
                { _id: { $in: ids } },
                { status: "active" }
            )
            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: ids } },
                { status: "inactive" }
            )
            break;
        default:
            break;
    }
    res.redirect(req.get("Referrer") || "/")
}