require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch")

const app = express();

//set the view engine and views folder
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    getWeather().then(data => {
        //put the data in the locals variable so ejs can pick it up
        app.locals.data = data;
        res.render("index")
    })
})

app.listen(3000, () => {
    console.log("Weather App hearing on http://localhost:3000")
})

//function to get weather from an external API
const getWeather = async () => {
    try {
        //use Github API for dummy data to see JSON operation
        //const response = await fetch('https://api.github.com/users/github');
        //const response = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en');
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=male&units=metric&appid=${process.env.API}`);
        const data = await response.json();
        return data;

    } catch (err) {
        console.log(err)
    }
}