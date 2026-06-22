const productCategory = require("../../models/product-category.model")
const createTree = require("../../helpers/createTree.js");
const systemConfig = require("../../config/systemConfig")

//[GET] /admin/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const data = await productCategory.find(find);

    const newData = createTree(data);

    res.render("admin/pages/product-category/index", {
        data: newData,
        pagetitle: "DANH MUC SAN PHAM"
    });
};

//[GET] /admin/products-category/create
module.exports.create = async (req,res) =>{
    let find = {
        deleted:false
    }
    const data = await productCategory.find(find)
    const newData = createTree(data)

    // console.log(data)
    res.render("admin/pages/product-category/create",{
        data : newData,
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
    // console.log(req.body)
    const data = new productCategory(req.body)
    await data.save()

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}

//[GET] /admin/products-category/edit/:id
module.exports.edit =  async (req,res) =>{
    try {
        let find = {
        deleted : false,
        _id : req.params.id
    }
    const data = await productCategory.findOne(find)
    // console.log(data)
    const records = await productCategory.find({ 
        deleted:false
    })
    const newData = createTree(records)

    res.render("admin/pages/product-category/edit.pug",{
        pagetitle:"Trang chinh sua san pham",
        data:data,
        newData:newData
    })
    } catch (error) {
        req.flash("error","Sai duong dan")
        res.redirect(req.get("Referrer") || "/admin/products-category")
    }
}

//[PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req,res) =>{
    // console.log(req.params)
    // console.log(req.body)
    try {
    const id = req.params.id
    await productCategory.updateOne(
        { _id: id },
        req.body
    )
    req.flash("success","Cap nhap danh muc san pham thanh cong !")
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    } catch (error) {
       req.flash("error","Cập nhật thất bại")
        res.redirect(req.get("Referrer") || "/admin/products")
    }
}

//[GET]  /admin/products-category/detail/:id
module.exports.detail = async (req,res) =>{
    try {
        const id = req.params.id
        let find = {
            deleted:false,
            _id:id
        }
        let dataParent = ""
        const data = await productCategory.findOne(find)
        if(data.parent_id){
            dataParent = await productCategory.findOne({
                deleted:false,
                _id : data.parent_id
            })
        }
        
        res.render("admin/pages/product-category/detail.pug",{
            pagetitle: data.title,
            data:data,
            dataParent:dataParent
        })
    } catch (error) {
        req.flash("error","Sai duong dan !")
        res.redirect(req.get("Referrer") || "/admin/products-category")
    }
}

//[DELETE]  /admin/products-category/delete/:id
module.exports.delete = async (req,res) =>{
    const id = req.params.id
    res.send("OK")
}