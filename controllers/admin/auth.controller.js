const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/systemConfig")

// [GET] admin/auth/login
module.exports.login = async (req,res) =>{
    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
        return
    }
    else{
        res.render("admin/pages/auth/login.pug",{
        pagetitle:"Trang dang nhap"
        })
    }
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    try {
        const { email, passWord } = req.body;

        // Kiểm tra email
        const existAccount = await Account.findOne({
            email: email,
            deleted: false
        });

        if (!existAccount) {
            req.flash("error", "Email không tồn tại!");
            return res.redirect(req.get("Referer") || "/admin/auth/login");
        }

        // Kiểm tra trạng thái
        if (existAccount.status !== "active") {
            req.flash("error", "Tài khoản đã bị khóa!");
            return res.redirect(req.get("Referer") || "/admin/auth/login");
        }

        // Kiểm tra mật khẩu
        if (existAccount.passWord !== md5(passWord)) {
            req.flash("error", "Sai mật khẩu!");
            return res.redirect(req.get("Referer") || "/admin/auth/login");
        }

        // Đăng nhập thành công
        res.cookie("token", existAccount.token);
        req.flash("success", "Đăng nhập thành công!");
        return res.redirect("/admin/dashboard");

    } catch (error) {
        req.flash("error", "Đăng nhập thất bại!");
        return res.redirect(req.get("Referer") || "/admin/auth/login");
    }
};

//[GET] /admin/auth/logout
module.exports.logout = async (req,res) =>{
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}