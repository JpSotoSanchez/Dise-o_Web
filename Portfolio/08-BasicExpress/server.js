const express = require('express');
const path = require('path');
const app = express();

// Middleware para procesar datos del formulario (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Ruta para servir el archivo HTML estático
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Ruta correcta del archivo 'index.html'
});

// Ruta para procesar el formulario y calcular el BMI
app.post('/', (req, res) => {
  const weight = parseFloat(req.body.weight); 
  const height = parseFloat(req.body.height); 
  const bmi = (weight / (height * height)) * 10000;

  // Enviar la respuesta con el BMI calculado
  res.send("Your BMI is: "+bmi.toFixed(2));
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
