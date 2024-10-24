const express = require('express');
const path = require('path');
const app = express();
var lista = []; // Cambiado a let para usar el scope adecuado
var toDO=[];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// Middleware personalizado para manejar errores y mostrar un mensaje de error al cliente
app.use((err, req, res, next) => {
    console.error(err.stack);  // Imprime el error en la consola
    res.status(500).send("Something went wrong");  // Devuelve un error 500 al cliente
  });

app.get('/', (req, res) => {    
    res.render("index.ejs", { lista, toDO }); // Renderizamos la vista inicial
});

app.get('/greet', (req, res) => {
    const name = req.query.name; 
    if (name && !lista.includes(name)) { 
        lista.push(name); 
        console.log(lista); 
    }
    res.render("wazzup.ejs", { name, lista }); 
});


app.post('/add', (req, res) => {
    const newItemName = req.body.task; 
    if (newItemName) {
        toDO.push(newItemName); 
        console.log(toDO);
    }
    res.redirect("/"); // Redirige al usuario a la página principal
});

app.get('/remove/:idx', (req, res) => {
    const index = req.params.idx; // Obtiene el índice del ítem a eliminar
    if (index >= 0 && index < toDO.length) { // Verifica si el índice es válido
        toDO.splice(index, 1); // Elimina el ítem de la lista de tareas
        console.log(`Removed item at index ${index}: ${toDO}`); // Imprime la lista actualizada
    }
    res.redirect("/"); // Redirige al usuario a la página principal
});

// Mover tarea hacia arriba
app.get('/move-up/:idx', (req, res) => {
    const index = parseInt(req.params.idx);
    if (index > 0 && index < toDO.length) {
        [toDO[index], toDO[index - 1]] = [toDO[index - 1], toDO[index]]; // Intercambia posiciones
    }
    res.redirect('/');
});

// Devuelve las tareas como JSON (accesible solo desde Postman u otra herramienta)
app.get('/task', (req, res) => {
    res.json(toDO); // Envía la lista como JSON
});

// Mover tarea hacia abajo
app.get('/move-down/:idx', (req, res) => {
    const index = parseInt(req.params.idx);
    if (index >= 0 && index < toDO.length - 1) {
        [toDO[index], toDO[index + 1]] = [toDO[index + 1], toDO[index]]; // Intercambia posiciones
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
