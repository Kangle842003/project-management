const systemConfig = require("../../config/systemConfig")

const dashboardRoute = require("./dashboard.route")
const productRoute = require("./product.route")
const productCategory = require("./product-categoy.route")

module.exports = (app) =>{

    const PATH_ADMIN = systemConfig.prefixAdmin 
    
    app.use(`${PATH_ADMIN}/dashboard`,dashboardRoute)

    app.use(`${PATH_ADMIN}/products`,productRoute)

    app.use(`${PATH_ADMIN}/products-category`,productCategory)
}