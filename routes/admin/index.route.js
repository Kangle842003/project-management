const systemConfig = require("../../config/systemConfig")

const authMiddleWare = require("../../middlewares/admin/auth.middleware")
const dashboardRoute = require("./dashboard.route")
const productRoute = require("./product.route")
const productCategory = require("./product-categoy.route")
const role = require("./role.route")
const account = require("./account.route")
const auth = require("./auth.route")
const myAccount = require("./my-account.route")


module.exports = (app) => {

    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(`${PATH_ADMIN}/dashboard`, authMiddleWare.requireAuth, dashboardRoute)

    app.use(`${PATH_ADMIN}/products`, authMiddleWare.requireAuth, productRoute)

    app.use(`${PATH_ADMIN}/products-category`, authMiddleWare.requireAuth, productCategory)

    app.use(`${PATH_ADMIN}/roles`, authMiddleWare.requireAuth, role)

    app.use(`${PATH_ADMIN}/accounts`, authMiddleWare.requireAuth, account)

    app.use(`${PATH_ADMIN}/auth`, auth)

    app.use(`${PATH_ADMIN}/my-account`,authMiddleWare.requireAuth, myAccount)
}