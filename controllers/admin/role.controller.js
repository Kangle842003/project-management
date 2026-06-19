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

//[GET] admin/roles/edit/:id
module.exports.edit = async (req,res) =>{
    try {
        const id = req.params.id
    let find = {
        deleted :false,
        _id:id
    }
    const data = await role.findOne(find)
    
    res.render("admin/pages/role/edit.pug",{
        pagetitle:"Chinh sua quyen",
        data:data
    })
    } catch (error) {
       req.flash("error","Sai duong dan")
       res.redirect(req.get("Referrer") || "/admin/roles") 
    }
}

//[PATCH] admin/roles/edit/:id
module.exports.editPatch = async (req,res) =>{
    try {
        const id = req.params.id
        await role.updateOne(
                { _id: id },
                req.body
            )
        req.flash("success","Cap nhat thanh cong")
        res.redirect("/admin/roles")
            
    } catch (error) {
        req.flash("error","Sai duong dan")
        res.redirect( "/admin/roles")
    }
}

//[DELETE] admin/roles/delete/:id
module.exports.delete = async (req,res) =>{
    const id = req.params.id
        await role.updateOne({_id:id},{
            deleted:true,
            deletedAt : new Date()
        })
        req.flash("success","Da xoa thanh cong quyen !")
        res.redirect(req.get("Referrer") )
}