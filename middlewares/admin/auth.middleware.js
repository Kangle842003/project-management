const systemConfig = require("../../config/systemConfig");
const account = require("../../models/account.model");

module.exports.requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.flash("error", "Vui lòng đăng nhập!");
            return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
        const infoUser = await account.findOne({
            token: token,
            deleted: false,
            status: "active"
        });
        if (!infoUser) {
            res.clearCookie("token");
            req.flash("error", "đăng nhập không hợp lệ!");
            return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
        next();

    } catch (error) {
        console.log(error);
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
};