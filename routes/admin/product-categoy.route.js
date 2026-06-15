const express = require("express")
const multer = require('multer')

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");
const validate = require("../../validates/admin/product-category.validate.js")
const router = express.Router()

const controller = require("../../controllers/admin/product-category.controller")

router.get("/",controller.index)

router.get("/create",controller.create)

router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.create,
    controller.createPost
);

router.get("/edit/:id",controller.edit)

router.patch("/edit/:id",
     upload.single('thumbnail'),
     uploadCloud.upload,
     validate.create,
     controller.editPatch)

module.exports = router 