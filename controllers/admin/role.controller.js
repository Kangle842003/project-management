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

//[GET] admin/roles/detail/:id
module.exports.detail = async (req,res) =>{
    try {
        const id = req.params.id
        const data = await role.findOne({
            _id: id,
            deleted: false
        })
        if(!data){
            req.flash("error","Không tìm thấy nhóm quyền")
            return res.redirect(req.get("Referrer") || "/admin/roles")
        }
        res.render("admin/pages/role/detail",{
            pagetitle: data.title,
            data:data
        })

    } catch (error) {
        req.flash("error","Sai đường dẫn!")
        res.redirect(req.get("Referrer") || "/admin/roles")
    }
}

//[GET] admin/roles/permissions
module.exports.permission = async (req,res) =>{
    const data = await role.find({
        deleted:false
    })
    res.render("admin/pages/role/permission",{
        pagetitle:"Phan quyen",
        data:data
    })
}

//[PATCH] admin/roles/permissions
module.exports.permissionPatch = async (req,res) =>{
    try {
    const permissions = JSON.parse(req.body.permissions);

    for (const item of permissions) {
      await role.updateOne(
        { _id: item.id },
        {
          permissions: item.permissions
        }
      );
    }

    req.flash("success", "Cập nhật phân quyền thành công");
    res.redirect(req.get("Referrer") )
  } catch (error) {
    console.log(error);
    req.flash("error", "Cập nhật phân quyền thất bại");
    res.redirect(req.get("Referrer") )
  }
}
