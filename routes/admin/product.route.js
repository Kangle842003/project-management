const express = require("express")
const multer = require('multer')
const storage = require("../../helpers/storageMulter.js")
const upload = multer({ storage: storage() });
const validate = require("../../validates/admin/product.validate.js")
const router = express.Router()


const controller = require("../../controllers/admin/product.controller")

router.get("/",controller.index)

router.patch("/change-status/:status/:id",controller.changeStatus)

router.patch("/change-multi",controller.changeMulti)

router.delete("/delete/:id",controller.delete)

router.get("/create",controller.create)

router.post(
    "/create",
    upload.single('thumbnail'),
    validate.create,
    controller.createPost)

router.get("/edit/:id",controller.edit)

router.patch("/edit/:id",
     upload.single('thumbnail'),
     validate.create,
     controller.editPatch)


router.get("/detail/:id",controller.detail)

module.exports = router