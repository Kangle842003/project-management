const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id : {
        type:String,
        default : ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    featured: Boolean,
    createdBy: {
        account_id: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    updatedBy: [
        {   
             _id: false,
            account_id: {
                type: String,
                default: ""
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    deleted: {
        type:Boolean,
        default : false
    },
    deletedAt : Date,
    deletedBy: {
        account_id: {
            type: String,
            default: ""
        }
    },
    slug: { 
        type: String, 
        slug: "title", 
        unique: true }
},{
    timestamps:true
})

const Product = mongoose.model("Product" , productSchema , "products")

module.exports = Product