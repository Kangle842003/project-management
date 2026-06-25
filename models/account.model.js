const mongoose = require("mongoose")
const randomString = require("../helpers/randomString")

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    passWord: String,
    token:{
        type:String,
        default:randomString.generateRandomString(30)
    },
    phone:Number,
    avatar:String,
    role_id:String,
    status:String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
})

const Account = mongoose.model("Account", accountSchema, "accounts")

module.exports = Account