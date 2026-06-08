const express = require("express")
const multer = require('multer')
const storage = require("../../helpers/storageMulter.js")
const upload = multer({ storage: storage() });

const router = express.Router()


const controller = require("../../controllers/admin/product.controller")

router.get("/",controller.index)

router.patch("/change-status/:status/:id",controller.changeStatus)

router.patch("/change-multi",controller.changeMulti)

router.delete("/delete/:id",controller.delete)

router.get("/create",controller.create)

router.post("/create",upload.single('thumbnail'),controller.createPost)

module.exports = router