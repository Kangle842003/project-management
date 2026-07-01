const homeRoute = require("./home.route")
const productRoute = require("./product.route")
const categoryMenu = require("../../helpers/category-menu")

module.exports=(app)=>{
    app.use(categoryMenu.categoryMenu)
    app.use("/",homeRoute)
    app.use("/products",productRoute)
}