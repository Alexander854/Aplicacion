// api.js (en tu backend)

const express = require('express');
const app = express();

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Ruta para obtener datos (por ejemplo, recetas)
app.get('/api/recipes', (req, res) => {
    // Aquí puedes consultar tu base de datos SQL y devolver los datos
    // como respuesta (por ejemplo, desde una tabla "recipes")
    const recipes = [
        { id: 1, title: 'Pancakes' },
        { id: 2, title: 'Pizza' },
        // ... más recetas
    ];
    res.json(recipes);
});

// Ruta para agregar una nueva receta
app.post('/api/recipes', (req, res) => {
    // Aquí puedes guardar la nueva receta en tu base de datos
    // utilizando los datos proporcionados en req.body
    // (por ejemplo, título, ingredientes, etc.)
    // Luego, devuelve una respuesta adecuada (éxito o error).
    // ...
});

// Más rutas según tus necesidades

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor API iniciado en el puerto 3000');
});
