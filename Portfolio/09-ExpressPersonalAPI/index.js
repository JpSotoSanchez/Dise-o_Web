const express = require('express');
const path = require('path');
const app = express();
var name="";

app.get('/', (req, res) => {
    name=req.body.name;
    res.sendFile(path.join(__dirname, '/html/index.html')); // Ruta correcta del archivo 'index.html'
});
app.get('/greet', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/wazzup.html')); // Ruta correcta del archivo 'index.html'
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
