require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch")

const app = express();

//set the view engine and views folder
app.set("views", "./views");
app.set("view engine", "ejs");

// Get weather data from openweathermap
// Leverage promises from node-fetch
let city = 'male';
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

app.get("/weather", (req, res, next) => {
    let city = req.query.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API}`;

    if (!city) res.send({error: "You must enter a city in the search box"});

    fetch(url) 
    .then(checkStatus)
    .then(raw_data => raw_data.json())
    .then(json_data => {
        app.locals.data = json_data;
        //console.log(json_data);
        // res.render("index")
        // if res.send is used then the fend fetch has to be modified with
        // options such as GET and header
        res.json(json_data);

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