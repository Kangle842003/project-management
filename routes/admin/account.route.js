const express = require("express")
const router = express.Router()
const multer = require('multer')

const upload = multer();
const validate = require("../../validates/admin/account.validate.js")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

const controller = require("../../controllers/admin/account.controller")

router.get("/",controller.index)

router.get("/create",controller.create)

router.post(
    "/create",
    upload.single('avatar'),
    uploadCloud.upload,
    validate.create,
    validate.checkExistAccount,
    controller.createPost
);

module.exports = router 