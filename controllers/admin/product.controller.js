const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const sytemconfig = require("../../config/systemConfig")
const systemConfig = require("../../config/systemConfig")

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

    let sort = {};
        if(req.query.sortKey && req.query.sortValue){
            sort[req.query.sortKey] = req.query.sortValue;
        }
        else{
            sort.position = "desc";
        }
    
// End Pagination

    const data = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skipItem)
    

    res.render("admin/pages/product/index.pug",{
        data: data,
        filterStatus : filterStatus,
        objectPagination: objectPagination,
        keyword : search.keyword,
        pages:pages,
        sortKey: req.query.sortKey,
        sortValue: req.query.sortValue,
        pagetitle : "Trang san pham"
    })
}

// [PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) =>{
    const status = req.params.status 
    const id = req.params.id
    await Product.updateOne({_id:id},{status:status})
    req.flash('success', 'Thay doi trang thai san pham thanh cong !');
    res.redirect(req.get("Referrer") || "/")

}

//[PATCH] admin/products/change-multi
module.exports.changeMulti = async (req,res) =>{
    // console.log(req.body)
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
        case "deleteAll":
            await Product.updateMany(
                { _id: { $in: ids } },
                { deleted: true,
                  deletedAt : new Date()
                }
            )
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")
                position = parseInt(position)
                await Product.updateOne(
                    { _id: id },
                    { position: position }
                )
            }
            break;
        default:
            break;
    }
    res.redirect(req.get("Referrer") || "/")
}

//[DELETE] admin/products/delete/:id
module.exports.delete = async (req,res) =>{
    const id = req.params.id
    await Product.updateOne({_id:id},{
        deleted:true,
        deletedAt : new Date()
    })
    req.flash("success","Da xoa thanh cong san pham !")
    res.redirect(req.get("Referrer") )
}

//[GET] admin/products/create
module.exports.create =  (req,res) =>{
    res.render("admin/pages/product/create.pug",{
        pagetitle:"Trang them moi san pham"
    })
}

//[POST] admin/products/create
module.exports.createPost= async(req,res)=>{
    // console.log(req.file)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }
    else{
        const count = await Product.countDocuments()
        // console.log(count)
        req.body.position = count + 1
    }
   
    const product = new Product(req.body)
    await product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`)

}

//[GET] admin/products/edit/:id
module.exports.edit = async (req,res) =>{
    try {
        const id = req.params.id
    // console.log(id)
    let find = {
        deleted:false,
    }
    if(id){
        find._id = id
    }
    const data = await Product.findOne(find)
    // console.log(data)
    res.render("admin/pages/product/edit.pug",{
            data:data,
            pagetitle:"Trang chinh sua san pham"
        })
    } catch (error) {
        req.flash("error","Duong dan khong hop le")
       res.redirect(req.get("Referrer") || "/admin/products")
    }
    
}

// [PATCH] admin/products/edit/:id
module.exports.editPatch = async (req,res) =>{
    // console.log(req.params)
    // console.log(req.body)
    try {
    const id = req.params.id
    if(req.file){
    req.body.thumbnail = `/uploads/${req.file.filename}`
        }
    await Product.updateOne(
        { _id: id },
        req.body
    )
    req.flash("success","Cap nhap san pham thanh cong !")
    res.redirect(`${systemConfig.prefixAdmin}/products`)
    } catch (error) {
       req.flash("error","Cập nhật thất bại")
        res.redirect(req.get("Referrer") || "/admin/products")
    }
}

//[GET] admin/products/detail/:id
module.exports.detail = async (req,res) =>{
    try {
        const id = req.params.id
    let find = {
        deleted : false,
        _id : id
    }
    const data = await Product.findOne(find)
    // console.log(data)
    res.render("admin/pages/product/detail.pug",{
        data :data,
        pagetitle : data.title
    }
    )
    } catch (error) {
        req.flash("error","Duong dan khong hop le")
        res.redirect(req.get("Referrer") || "/admin/products")
    }
    
}