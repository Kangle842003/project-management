const express = require("express")
const multer = require('multer')

const upload = multer();
const validate = require("../../validates/admin/product.validate.js")
const router = express.Router()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

const controller = require("../../controllers/admin/product.controller")

router.get("/",controller.index)

router.patch("/change-status/:status/:id",controller.changeStatus)

router.patch("/change-multi",controller.changeMulti)

router.delete("/delete/:id",controller.delete)

router.get("/create",controller.create)


router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.create,
    controller.createPost
);

router.get("/edit/:id",controller.edit)

router.patch(
    "/edit/:id",
     upload.single('thumbnail'),
     validate.create,
     uploadCloud.upload,
     controller.editPatch)


router.get("/detail/:id",controller.detail)

module.exports = router