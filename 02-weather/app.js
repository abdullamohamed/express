const express = require("express");
const fetch = require("node-fetch")

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

//function to get weather from an external API
const getWeather = async () => {
    try {
        //use Github API for dummy data to see JSON operation
        const response = await fetch('https://api.github.com/users/github');
        const data = await response.json();
        return data;

    } catch (err) {
        console.log(err)
    }
}

//extract some dummy data
getWeather().then(data => {
    console.log(data.name);
})