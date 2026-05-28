const express = require("express")
require("dotenv").config() // Khai bao thu vien dotenv
const mongoose = require("mongoose")// khai bao thu vien mongoose

const app = express(); 

const route = require("./routes/client/index.route") 

mongoose.connect("mongodb://localhost:27017/product-management");

const port = process.env.PORT


app.set("views", "views");
app.set("view engine", "pug"); 
app.use(express.static("public")); 

route(app)

app.listen(port,()=>{ 
  console.log(`server is running on http://localhost:${port}`) 
})