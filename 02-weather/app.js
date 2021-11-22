require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch")

const app = express();

//set the view engine and views folder
app.set("views", "./views");
app.set("view engine", "ejs");

// Leverage promises from node-fetch
let city = 'male';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API}`;
app.get("/", (req, res) => {
    fetch(url)
    .then(raw_data => raw_data.json())
    .then(json_data => {
        app.locals.data = json_data;
        console.log(json_data);
        res.render("index")
    })
    .catch(err => console.log(err));
})

app.listen(3000, () => {
    console.log("Weather App hearing on http://localhost:3000")
})
