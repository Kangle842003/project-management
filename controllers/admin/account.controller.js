module.exports.index = async(req,res) =>{
    res.render("admin/pages/account/index.pug",{
        pagetitle:"Quan ly tai khoan"
    })
}