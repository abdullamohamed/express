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
let entries = [
    {title:"Abdulla", body:"My name is Abdulla Mohamed", pub:"1985-02-01"},
    {title:"Mohamed", body:"My name is Mohamed", pub:"1985-02-02"}
];
app.locals.entries = entries;

//Routes
app.get("/", (req, res) => {
    res.render("index")
})

app.get("/new-entry", (req, res) => {
    res.render("new-entry")
})

app.post("/new-entry", (req, res) =>{
    if(!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and body");
        return;
    }
    entries.push({
        title: req.body.title,
        body: req.body.body,
        pub: new Date()
    });

    res.redirect("/");
})

//Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})