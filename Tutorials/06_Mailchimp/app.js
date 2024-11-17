const { name } = require("ejs");
const express = require("express");
const app = express();
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.engine("ejs",require("ejs").renderFile);
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.sendFile(__dirname+'/signup.html'); 
});

app.post("/guardar", (req, res) =>{
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    var nombre=fName+" "+lName;
    console.log(nombre + "email:" + email);

    //toda la parte de la api va aquí

    
    res.render("success.ejs", {nombre:nombre}); 
})

app.get("/backhome", (req, res) =>{
    res.redirect("/"); 
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
