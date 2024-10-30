const express = require("express");
const app = express();

var name="";
var posts = []; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de EJS
app.engine("ejs",require("ejs").renderFile);
app.set("view engine", "ejs");

// Renderizar la página de inicio con EJS
app.get("/", (req, res) => {
  res.sendFile(__dirname+'/public/html/index.html'); 
});

app.get("/login", (req, res) =>{
  name = req.query.name;
  res.render("home.ejs", { name,posts }); 
})

app.post("/login", (req, res) => {
  name = req.body.name;
  res.render("home.ejs", { name,posts }); 
});


app.post("/newpost", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  res.render("home.ejs", { name,posts }); 
});

app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.render("post.ejs", { name,post });
  } else {
    res.status(404).send("Post not found");
  }
});


app.post("/editpost/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = posts.find(p => p.id === parseInt(id));
  if (post) {
    post.title = title;
    post.content = content;
    res.redirect(`/post/${id}`);
  } else {
    res.status(404).send("Post not found");
  }
});

// Ruta para eliminar una publicación (POST)
app.post("/deletepost/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter(p => p.id !== parseInt(id));
  res.render("home.ejs", { name,posts }); 
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
