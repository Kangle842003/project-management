module.exports.index = (req,res)=>{
    res.render("client/pages/product/index.pug",
        {
            pagetitle : "Trang San pham"
        }
    )
}