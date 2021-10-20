const express = require("express");
const app = express();

//set the view engine and views folder
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    //res.send("Weather Homepage");
    res.render("index")
})

app.listen(3000, () => {
    console.log("Weather App hearing on http://localhost:3000")
})