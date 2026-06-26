const role = require("../../models/role.model")
const account = require("../../models/account.model")
const md5 = require("md5")
const systemConfig = require("../../config/systemConfig")
const moment = require("moment");

//[GET] admin/accounts
module.exports.index = async(req,res) =>{
    const data = await account.find({
        deleted:false
    })
    const roles = await role.find({
        deleted:false
    })

    for(const item of data){
        const roleInfo = roles.find(roleItem =>
            roleItem.id === item.role_id
        )

        item.roleTitle = roleInfo ? roleInfo.title : ""
    }
    res.render("admin/pages/account/index.pug",{
        pagetitle:"Quan ly tai khoan",
        data:data
    })
}

//[GET] admin/accounts/create
module.exports.create = async (req,res) =>{
    const roles = await role.find({
        deleted:false
    })
    // console.log(roles)
    res.render("admin/pages/account/create.pug",{
        pagetitle:"Tao moi tai khoan",
        roles : roles
    })
}

//[POST] admin/accounts/create
module.exports.createPost = async (req,res) =>{
    if(req.body.phone){
        req.body.phone = parseInt(req.body.phone)
    }
    req.body.passWord = md5(req.body.passWord)
    
    const Account = new account(req.body)
        await Account.save()
        req.flash("sucess","Tao tai khoan moi thanh cong")
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
}

//[GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await account.findOne({
            _id: id,
            deleted: false
        });
        const roles = await role.find({
            deleted: false
        });
        res.render("admin/pages/account/edit", {
            pagetitle: "Chỉnh sửa tài khoản",
            data:data,
            roles:roles
        });
    } catch (error) {
        req.flash("error", "Sai đường dẫn!");
        return res.redirect(req.get("Referer") || "/admin/accounts");
    }
};

//[PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req,res) =>{
   try {
    if(req.body.phone){
    req.body.phone= parseInt(req.body.phone)
   }
   
    // Không đổi mật khẩu
    if(!req.body.passWord){
        delete req.body.passWord;
    }
    // Có đổi mật khẩu
    else{
        req.body.passWord = md5(req.body.passWord);
    }

    await account.updateOne(
        { _id: req.params.id },
        req.body
    );

    req.flash("success", "Cập nhật thành công!");
    res.redirect(req.get("Referrer"))
   } catch (error) {
     req.flash("error", "Cập nhật loi");
    res.redirect(req.get("Referrer"))
   }
}

//[GET] admin/accounts/detail/:id
module.exports.detail = async (req,res) =>{
    const id = req.params.id
    const data = await account.findOne({
        deleted:false,
        _id:id
    }).select("-_id -token -passWord");

     data.role = await role.findOne({
        _id: data.role_id,
        deleted: false
    });
    // Xu ly thoi gian
    data.createdAtFormat = moment(data.createdAt).format("DD/MM/YYYY HH:mm:ss");
    data.updatedAtFormat = moment(data.updatedAt).format("DD/MM/YYYY HH:mm:ss");

    // console.log(data)
    res.render("admin/pages/account/detail.pug",{
        pagetitle:"Chi tiet tai khoan",
        data:data
    })
}