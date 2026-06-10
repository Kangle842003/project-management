const express = require("express")
const router = express.Router()

const controller = require("../../controllers/client/product.controller")

router.get("/",controller.index)

router.get("/view/:id",controller.view)

module.exports = router