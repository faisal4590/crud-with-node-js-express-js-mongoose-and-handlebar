require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser"); ///kono form submit korle url e form er data pass na kore node js er req er moddhe diye pass korar jonno body parser use kora hoy.

const employeeController = require("./controllers/employeeController");

var app = express();

//use of body parser to send form data with the req object starts
app.use(
  bodyParser.urlencoded({
    extended: true
    //
  })
);

app.use(bodyParser.json());

//use of body parser to send form data with the req object ends

//configuring views with express handlebars starts
app.set("views", path.join(__dirname, "/views/"));

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);

app.set("view engine", "hbs");
//configuring views with express handlebars ends

const portAddress = process.env.PORT || 3000;

app.listen(portAddress, () => {
  console.log(`Express server started at port ${portAddress}`);
});

//defining middleware for employeeController
app.use("/employee", employeeController);
