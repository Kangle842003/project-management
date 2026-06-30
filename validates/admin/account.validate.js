const account = require("../../models/account.model")

module.exports.create=(req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error","Không được bỏ trống họ tên!")
        res.redirect(req.get("Referrer"))
        return
    }
    if(!req.body.email){
        req.flash("error","Không được bỏ trống email!")
        res.redirect(req.get("Referrer"))
        return
    }
    if(!req.body.passWord){
        req.flash("error","Không được bỏ trống mật khẩu!")
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
        _id: { $ne: req.params.id },
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
module.exports.edit = (req, res, next) => {

    if(!req.body.fullName){
        req.flash("error","Không được bỏ trống tên đăng nhập!");
        return res.redirect(req.get("Referer"));
    }

    if(!req.body.email){
        req.flash("error","Không được bỏ trống email!");
        return res.redirect(req.get("Referer"));
    }

    // Chỉ kiểm tra khi người dùng nhập mật khẩu mới
    if(req.body.passWord && req.body.passWord.length < 8){
        req.flash("error","Mật khẩu phải dài hơn 8 ký tự!");
        return res.redirect(req.get("Referer"));
    }

    next();
}

module.exports.checkExistAccountEdit = async (req,res,next)=>{

    const id = req.params.id;

    const existEmail = await account.findOne({
        email: req.body.email,
        deleted:false,
        _id: {$ne: id}
    });

    if(existEmail){
        req.flash("error","Email đã tồn tại!");
        return  res.redirect(req.get("Referrer"))
    }

    const existFullName = await account.findOne({
        fullName:req.body.fullName,
        deleted:false,
        _id: {$ne: id}
    });

    if(existFullName){
        req.flash("error","Tên tài khoản đã tồn tại!");
        return res.redirect(req.get("Referrer"))
    }

    next();
}
