const express = require("express")
require("dotenv").config() // Khai bao thu vien dotenv
const app = express(); 

const route = require("./routes/client/index.route") 

const port = process.env.PORT

app.set("views", "views");
app.set("view engine", "pug"); 

route(app)

app.listen(port,()=>{ 
  console.log(`server is running on http://localhost:${port}`) 
})