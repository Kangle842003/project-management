const role = require("../../models/role.model")
const systemConfig = require("../../config/systemConfig")

//[GET] admin/roles
module.exports.index =  async (req,res) =>{
    const data = await role.find({
        deleted:false
    })
    res.render("admin/pages/role/index.pug",{
        pagetitle:"Trang nhom quyen",
        data:data
    })
}

//[GET] admin/roles/create
module.exports.create = async (req,res) =>{
    res.render("admin/pages/role/create.pug",{
        pagetitle:"Them nhom quyen"
    })
}

//[POST] admin/roles/create
module.exports.createPost = async(req,res) =>{
    const data = new role(req.body)
    await data.save()
    
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}