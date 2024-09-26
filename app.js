const express  =  require("express");
const exphbs = require("express-handlebars") // express template engine handlebars
const bodyParser = require("body-parser")  // it gets data in JSON format
const mysql =  require("mysql2");
const path = require('path');

require('dotenv').config();

const app = new express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// template engine => rendering html and css files
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs")

// //Mysql
// const con = mysql.createPool({
//     connectionLimit:10,
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.DB_NAME
// });

// //check database connection
// con.getConnection((err,connection) => {
//     if(err) throw err
//     console.log("connection success")
// });

// //router
/* app.get('/',((req,res) => {
     res.render("home")
    res.sendFile(path.join(__dirname,'/views/home.hbs'));
 }))

 app.get('/index2.html',((req,res) => {
     res.sendFile(path.join(__dirname,'index2.html'));
}))  */

const routes = require('./server/routes/student')
app.use('/',routes)


//static files
app.use(express.static('public'));

//Listen Port
app.listen(port,() => {
    console.log("Listening Port : "+port);
});
