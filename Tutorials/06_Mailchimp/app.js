const express = require('express');
const path = require('path');
const app = express();

// Middleware para procesar datos del formulario (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Ruta para servir el archivo HTML estático
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html')); // Ruta correcta del archivo 'index.html'
});

app.post('/guardar', (req, res) => {
    var fName= req.body.fName;
    var lName= req.body.lName;
    var email= req.body.email;
    console.log(`Received: ${fName}, ${lName}, ${email}`);
    res.sendFile(path.join(__dirname, 'success.html'));
  });
// Iniciar el servidor
app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  