const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];

// Renderizar la página de inicio con EJS
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html"); // 'name' nulo para cuando se carga la página por primera vez
});

app.get("/login", (req, res) =>{
  const name = req.query.name;
  res.render("login.ejs", { name }); 
})

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.render("login.ejs", { name }); // Enviar el nombre al renderizar la página
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
