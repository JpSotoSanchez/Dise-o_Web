// app.js

// Importamos los módulos necesarios
const express = require('express'); // Express para manejar las rutas y peticiones
const mongoose = require('mongoose'); // Mongoose para conectarse a MongoDB y definir esquemas de datos
const { body, validationResult } = require('express-validator'); // express-validator para validar datos de entrada
const jwt = require('jsonwebtoken'); // JWT para la autenticación basada en tokens
const swaggerUi = require('swagger-ui-express'); // swagger-ui-express para mostrar la documentación Swagger
const swaggerDocument = require('./swagger.json'); // Archivo de Swagger para la documentación de la API

// Inicializamos la aplicación de Express
const app = express();

// Definimos el puerto en el que la aplicación va a correr. Si hay una variable de entorno PORT, la usamos, si no, usamos 3000.
const PORT = process.env.PORT || 3000;

// Middleware para permitir que Express interprete JSON en el cuerpo de las peticiones (req.body)
app.use(express.json());

// Conectamos a la base de datos MongoDB usando Mongoose
mongoose.connect('mongodb://localhost/mi-api-db', {
  useNewUrlParser: true, // Evita errores de conexión de MongoDB relacionados con el formato de URL
  useUnifiedTopology: true, // Usa el nuevo motor de MongoDB para el manejo de conexiones
})
.then(() => console.log('Conectado a MongoDB')) // Mensaje de éxito al conectarse a la base de datos
.catch(err => console.error('Error conectando a MongoDB', err)); // Capturamos y mostramos cualquier error en la conexión

// Definimos un esquema de datos (estructura de cómo se almacenan los datos) con Mongoose
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // El nombre es obligatorio
  description: String, // La descripción es opcional
  price: { type: Number, required: true } // El precio es obligatorio y debe ser un número
});

// Creamos un modelo llamado "Item" basado en el esquema definido. Esto representa una colección en MongoDB.
const Item = mongoose.model('Item', itemSchema);

// Middleware que se ejecuta en cada petición, para mostrar en la consola qué ruta y método se están usando (útil para debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`); // Ejemplo: "GET /api/items"
  next(); // Continuar con el siguiente middleware o ruta
});

// Documentación de la API con Swagger. Cualquier petición a '/api-docs' mostrará la documentación interactiva de Swagger.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta POST para autenticación básica con JWT. Este ejemplo genera un token para un usuario ficticio.
// En un entorno real, se verificaría usuario/contraseña antes de generar el token.
app.post('/api/login', (req, res) => {
  const user = { id: 1, name: 'usuario' }; // Este es el objeto de usuario que se "autentica"
  
  // Generamos un token JWT con el objeto user. Usamos 'mi-secreto-jwt' como la clave secreta para firmar el token.
  const token = jwt.sign({ user }, 'mi-secreto-jwt', { expiresIn: '1h' }); // El token expirará en 1 hora.
  
  // Enviamos el token como respuesta en formato JSON
  res.json({ token });
});

// Middleware para proteger rutas mediante autenticación con JWT.
// Verifica que la petición tenga un token válido antes de permitir el acceso a las rutas protegidas.
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Los tokens se pasan en la cabecera "Authorization"
  const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: "Bearer TOKEN"

  if (token == null) return res.sendStatus(401); // Si no hay token, respondemos con "401 Unauthorized"
  
  // Verificamos el token. Si es válido, adjuntamos el usuario a la petición; si no, respondemos con "403 Forbidden".
  jwt.verify(token, 'mi-secreto-jwt', (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido o expirado
    req.user = user; // Guardamos la información del usuario en la solicitud (req)
    next(); // Continuar con la siguiente función en la cadena
  });
}

// Rutas CRUD para "items". Cada ruta está protegida por JWT usando el middleware `authenticateToken`.
// Estos son los puntos básicos de una API REST: Crear, Leer, Actualizar y Eliminar datos.

/**
 * Ruta GET /api/items
 * - Obtener todos los items desde la base de datos.
 * - Requiere autenticación (JWT).
 */
app.get('/api/items', authenticateToken, async (req, res) => {
  const items = await Item.find(); // Usamos Mongoose para obtener todos los items almacenados
  res.json(items); // Enviamos los items como respuesta en formato JSON
});

/**
 * Ruta POST /api/items
 * - Crear un nuevo item en la base de datos.
 * - Requiere autenticación (JWT).
 * - Validamos los datos enviados usando `express-validator`.
 */
app.post('/api/items', authenticateToken, 
  // Validación de datos de entrada usando express-validator.
  body('name').isLength({ min: 1 }).withMessage('El nombre es obligatorio'), // El nombre debe tener al menos un carácter
  body('price').isNumeric().withMessage('El precio debe ser un número'), // El precio debe ser numérico
  async (req, res) => {
    // Verificamos si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, respondemos con un estado 400 y enviamos los errores.
      return res.status(400).json({ errors: errors.array() });
    }

    // Si no hay errores, creamos un nuevo item con los datos del cuerpo de la petición (req.body)
    const newItem = new Item(req.body);
    await newItem.save(); // Guardamos el nuevo item en la base de datos
    res.status(201).json(newItem); // Respondemos con el item creado y el estado 201 (Created)
  }
);

/**
 * Ruta PUT /api/items/:id
 * - Actualizar un item existente en la base de datos.
 * - Requiere autenticación (JWT).
 * - Validamos los datos enviados.
 */
app.put('/api/items/:id', authenticateToken, 
  // Validaciones opcionales: Si se envía 'name' o 'price', deben cumplir con las reglas especificadas
  body('name').optional().isLength({ min: 1 }).withMessage('El nombre es obligatorio'),
  body('price').optional().isNumeric().withMessage('El precio debe ser un número'),
  async (req, res) => {
    const { id } = req.params; // Extraemos el ID del item de los parámetros de la ruta

    // Verificamos si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, respondemos con un estado 400 y los errores.
      return res.status(400).json({ errors: errors.array() });
    }

    // Actualizamos el item por su ID, reemplazando solo los campos enviados
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item no encontrado' }); // Si el item no existe, respondemos con 404
    
    res.json(updatedItem); // Respondemos con el item actualizado
  }
);

/**
 * Ruta DELETE /api/items/:id
 * - Eliminar un item existente en la base de datos.
 * - Requiere autenticación (JWT).
 */
app.delete('/api/items/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // Extraemos el ID del item de los parámetros de la ruta

  // Eliminamos el item por su ID
  const deletedItem = await Item.findByIdAndDelete(id);
  if (!deletedItem) return res.status(404).json({ message: 'Item no encontrado' }); // Si el item no existe, respondemos con 404

  res.status(204).send(); // Respondemos con un estado 204 (No Content), sin contenido en el cuerpo de la respuesta
});

// Middleware para manejo de errores. Si ocurre algún error en el servidor, se captura aquí.
app.use((err, req, res, next) => {
  console.error(err.stack); // Mostramos el error en la consola del servidor
  res.status(500).send('Algo salió mal.'); // Respondemos con un estado 500 (Internal Server Error)
});

// Iniciamos el servidor en el puerto especificado y mostramos un mensaje en la consola
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de confirmación en la consola
});
