const express = require("express")
require("dotenv").config() // Khai bao thu vien dotenv

const database = require("./config/database")
database.connect()

const app = express(); 

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route") 


const port = process.env.PORT


app.set("views", "views");
app.set("view engine", "pug"); 
app.use(express.static("public")); 

routeAdmin(app)
route(app)

app.listen(port,()=>{ 
  console.log(`server is running on http://localhost:${port}`) 
})