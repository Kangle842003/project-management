const express = require("express")
const path = require('path');
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
require("dotenv").config() // Khai bao thu vien dotenv

const database = require("./config/database")

// dung de them cac phuong thuc PATCH,PUT,DELETE trong action
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

database.connect()

const app = express(); 
// dung de doc name va value trong form
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded())

// tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Dung de su dung thu vien express-flash de hien thi ra thong bao
app.use(cookieParser('8484Khang'));
app.use(session({
  secret: "8484Khang",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}))
app.use(flash());

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route"); 
const systemConfig = require("./config/systemConfig");

app.locals.prefixAdmin = systemConfig.prefixAdmin

const port = process.env.PORT


app.set("views", `${__dirname}/views`);
app.set("view engine", "pug"); 
app.use(express.static(`${__dirname}/public`)); 

routeAdmin(app)
route(app)

app.listen(port,()=>{ 
  console.log(`server is running on http://localhost:${port}`) 
})