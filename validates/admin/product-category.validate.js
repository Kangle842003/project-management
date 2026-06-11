module.exports.create=(req,res,next)=>{
    if(!req.body.title){
        req.flash("error","Khong duoc bo trong tieu de san pham !")
        res.redirect(req.get("Referrer"))
        return
    }
    next()
}