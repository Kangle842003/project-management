const account = require("../../models/account.model")

module.exports.create=(req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error","Khong duoc bo trong ten dang nhap !")
        res.redirect(req.get("Referrer"))
        return
    }
    if(!req.body.email){
        req.flash("error","Khong duoc bo trong ten dang nhap !")
        res.redirect(req.get("Referrer"))
        return
    }
    if(!req.body.passWord){
        req.flash("error","Khong duoc bo trong ten dang nhap !")
        res.redirect(req.get("Referrer"))
        return
    }
    if(req.body.passWord.length < 8){
        req.flash("error","Mat khau phai dai hon 8 ki tu !")
        res.redirect(req.get("Referrer"))
        return
    }
    next()
}
module.exports.checkExistAccount = async (req,res,next)=>{
    const existEmail = await account.findOne({
        email: req.body.email,
        deleted: false
    })

    if(existEmail){
        req.flash("error","Email đã tồn tại!")
        return res.redirect(req.get("Referrer"))
    }

    if(req.body.phone){
    const regexPhone = /^[0-9]{10,11}$/;

    if(!regexPhone.test(req.body.phone)){
        req.flash("error","Số điện thoại không hợp lệ!");
        return res.redirect("back");
    }
    }
    
    const existFullName = await account.findOne({
        fullName: req.body.fullName,
        deleted: false
    })

    if(existFullName){
        req.flash("error","Tên tài khoản đã tồn tại!")
        return res.redirect(req.get("Referrer"))
    }

    next()
}