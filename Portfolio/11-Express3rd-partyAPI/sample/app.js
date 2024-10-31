const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); 
});


app.post("/weather", (req, res) => {
  const city = req.body.cityName; 
  const apiKey = process.env.KEY;
  const unit = "metric"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    let dataChunks = []; 
    response.on("data", (chunk) => {
      dataChunks.push(chunk); 
    });

    response.on("end", () => {
      try {
        const weatherData = JSON.parse(Buffer.concat(dataChunks)); 
        if (weatherData.cod === 200) {
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          res.send(`
            <h1>Weather in ${city}</h1>
            <p>Temperature: ${temp}°C</p>
            <p>Description: ${description}</p>
            <img src="${iconUrl}" alt="Weather icon">
            <br><br>
            <a href="/">Back to home</a>
          `);
        } else {
          res.send(`
            <h1>Error</h1>
            <p>Could not find weather for "${city}". Please try again.</p>
            <a href="/">Back to home</a>
          `);
        }
      } catch (error) {
        res.send(`
          <h1>Error</h1>
          <p>Could not retrieve weather data. Please try again later.</p>
          <a href="/">Back to home</a>
        `);
      }
    });
  }).on("error", (e) => {
    console.error(e.message);
    res.send(`
      <h1>Error</h1>
      <p>Unable to fetch data due to network issues. Please try again later.</p>
      <a href="/">Back to home</a>
    `);
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
