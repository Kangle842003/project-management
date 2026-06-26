module.exports.login = async (req,res,next) =>{
    if(!req.body.email){
        req.flash("error","Vui long nhap email!")
        res.redirect(req.get("Referrer"))
        return
    }
    if(!req.body.passWord){
        req.flash("error","Vui long nhap mat khau!")
        res.redirect(req.get("Referrer"))
        return
    }
    next()
}