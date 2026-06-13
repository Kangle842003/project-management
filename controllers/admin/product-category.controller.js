const productCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/systemConfig")

//[GET] /admin/products-category
module.exports.index = async (req,res) =>{
    let find = {
        deleted : false
    }
    function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach((item) => {
        if (item.parent_id === parentId) {
            const newItem = item;
            const children = createTree(arr, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
    }
    const data = await productCategory.find(find)
    const newData = createTree(data)
    res.render("admin/pages/product-category/index",{
        data:newData,
        pagetitle:"DANH MUC SAN PHAM"
    })
}

//[GET] /admin/products-category/create
module.exports.create = async (req,res) =>{
    let find = {
        deleted:false
    }
    function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach((item) => {
        if (item.parent_id === parentId) {
            const newItem = item;
            const children = createTree(arr, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
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