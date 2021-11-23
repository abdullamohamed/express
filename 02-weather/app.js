require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch")

const app = express();

//set the view engine and views folder
app.set("views", "./views");
app.set("view engine", "ejs");

// Get weather data from openweathermap
// Leverage promises from node-fetch
let city = 'london';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API}`;
app.get("/", (req, res, next) => {
    fetch(url)
    .then(fetched => {
        console.log(fetched.status);
        return fetched;
    })
    .then(checkStatus)
    .then(raw_data => raw_data.json())
    .then(json_data => {
        app.locals.data = json_data;
        //console.log(json_data);
        res.render("index")
    })
    .catch(err => {
        //console.log(err);
        next(err);
    });
})

app.use((err, req, res, next) => {
    console.log(err);
    res.send("The requested city is incorrect");
})

app.listen(3000, () => {
    console.log("Weather App hearing on http://localhost:3000")
})

function checkStatus (res) {
    if (res.ok) {
        return res;
    } else {
        throw new Error(`There was an error : ${res.status} (${res.statusText})`); 
    }
}