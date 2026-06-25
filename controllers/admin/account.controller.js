const role = require("../../models/role.model")
const account = require("../../models/account.model")
const md5 = require("md5")
const systemConfig = require("../../config/systemConfig")

//[GET] admin/accounts
module.exports.index = async(req,res) =>{
    const data = await account.find({
        deleted:false
    })
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