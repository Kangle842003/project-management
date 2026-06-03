const Product = require("../../models/product.model")

// [GET] admin/products
module.exports.index = async (req,res) =>{
    let find = {
        deleted : false
    }
    let filterStatus = [
        {
            name:"Tat ca",
            class:"",
            status :""
        },
        {
            name:"Hoat Dong",
            class:"",
            status :"active"
        },
        {
            name:"Dung hoat dong",
            class:"",
            status :"inactive"
        }
        
    ]
    if(req.query.status){
        const index = filterStatus.findIndex(item=>item.status == req.query.status)
        filterStatus[index].class = "active"
    }
    else{
        const index = filterStatus.findIndex(item=>item.status == "")
        filterStatus[index].class = "active"
    }
    // console.log(req.query.status)

    if(req.query.status){
        find.status = req.query.status
    }
    // console.log(find.status)
    

    const data = await Product.find(find)
    // console.log(data)

    res.render("admin/pages/product/index.pug",{
        data: data,
        filterStatus : filterStatus,
        pagetitle : "Trang san pham"
    })
}