//import all required modules
const path = require("path");
const express = require("express");
const logger = require("morgan");

//initialise
const app = express();

//app parameters
const port = 3000;
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.urlencoded({extended: false}));


//data
let entries = [];

//Routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})