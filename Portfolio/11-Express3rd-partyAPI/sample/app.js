const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public")); // Serves static files from 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // Sends the home page HTML
});

// Route to handle weather search
app.post("/weather", (req, res) => {
  const city = req.body.cityName; // Get the city name from the form submission
  const apiKey = "b546bfe8f5d581506ee66a0362c6cb7f"; // Replace with your actual API key
  const unit = "metric"; // Celsius unit
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  // Making HTTPS GET request to OpenWeatherMap
  https.get(url, (response) => {
    let dataChunks = []; // Store incoming data in chunks
    response.on("data", (chunk) => {
      dataChunks.push(chunk); // Append each chunk of data to the array
    });

    response.on("end", () => {
      try {
        const weatherData = JSON.parse(Buffer.concat(dataChunks)); // Parse data
        if (weatherData.cod === 200) {
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          // Respond with a page displaying the weather details
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
