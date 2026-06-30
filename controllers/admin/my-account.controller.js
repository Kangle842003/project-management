const account = require("../../models/account.model")
const systemConfig = require("../../config/systemConfig")
//[GET] admin/my-account
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index.pug", {
        pagetitle: res.locals.roleAccount.title
    })
}
//[GET] admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit.pug", {
        pagetitle: "chinh sua thong tin"
    })
}

//[PATCH] admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    // console.log(req.file)
    // console.log(req.body)
    const id = res.locals.infoAccount._id;
    // console.log(id)

    const existEmail = await account.findOne({
        _id: {
            $ne: id
        },
        email: req.body.email,
        deleted: false
    });

    if (existEmail) {
        req.flash("error", "Email đã tồn tại!");
        return res.redirect(req.get("Referrer"));
    }

    if (req.body.phone) {
        req.body.phone = Number(req.body.phone);
    }

    await account.updateOne({
            _id: id
        },
        req.body
    );
    req.flash("success", "Cập nhật thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/my-account`);
}