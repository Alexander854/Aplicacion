const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Ruta de inicio de sesión
app.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    

});

// Ruta para obtener recetas (ejemplo)
app.get('/api/recipes', (req, res) => {
    // Simulación de recetas desde una base de datos
    const recipes = [
        { id: 1, title: 'Pancakes' },
        { id: 2, title: 'Pizza' },
    ];
    res.json(recipes);
});

// Ruta para agregar una nueva receta
app.post('/api/recipes', (req, res) => {
    const newRecipe = req.body;  // Se espera que envíes los detalles de la receta
    // Aquí puedes guardar la receta en tu base de datos
    res.status(201).json({ success: true, recipe: newRecipe });
});

// Ruta de registro (signup)
app.post('/user/signup', (req, res) => {
    const { email, password } = req.body;
    
    // Lógica básica para registrar un usuario
    res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
});

// Inicia el servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
