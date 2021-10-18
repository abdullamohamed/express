const express = require("express");


const app = express();

app.get("/", (req, res) => {
    res.send("Weather Homepage");
})

app.listen(3000, () => {
    console.log("Weather App hearing on http://localhost:3000")
})