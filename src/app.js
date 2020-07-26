const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const { forecast } = require("./utils/forecast");
const { geocode } = require("./utils/geocode");

// Defining the paths for express configs
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebar engine and views engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Majid Qureshi"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Majid Qureshi"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Majid Qureshi"
    });
})

app.get("/weather",(req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.send({
            error: "Address Must be provided"
        });
    }

    geocode(address,(error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
0
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            
            return res.send({
                forecast: forecastData,
                location,
                address: address
            });
        });
    } )
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "Error 404",
        name: "Majid Qureshi",
        message: "Help Page not found"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "Error 404",
        name: "Majid Qureshi",
        message: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Express listening on port " + port);
})
