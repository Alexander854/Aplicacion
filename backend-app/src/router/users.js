import { Router } from "express";
import { logIn, createUsers, auth, listRecipesByUser, addRecipe, getRecipeById,logout } from "../controller/users";

// Crear el router para manejar las rutas de usuarios
const routerUsers = Router();

// Endpoint para loguear usuario
/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: Loguear usuario
 */
routerUsers.post("/user/login", logIn);

// Endpoint para crear un nuevo usuario
/**
 * @swagger
 * /user/signup:
 *  post:
 *      summary: Crear un nuevo usuario
 */
routerUsers.post("/user/signup", createUsers);

// Endpoint para listar recetas de un usuario (requiere autenticación)
/**
 * @swagger
 * /user/recipes:
 *  get:
 *      summary: Listar recetas del usuario autenticado
 *      security:
 *        - bearerAuth: []
 */
routerUsers.get("/user/recipes", auth, listRecipesByUser);

// Endpoint para agregar una nueva receta (requiere autenticación)
/**
 * @swagger
 * /user/recipes:
 *  post:
 *      summary: Agregar una nueva receta
 *      security:
 *        - bearerAuth: []
 */
routerUsers.post("/user/recipes", auth, addRecipe);

// Endpoint para obtener una receta específica por su ID
/**
 * @swagger
 * /recipes/{id}:
 *  get:
 *      summary: Obtener una receta por ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID de la receta
 *          schema:
 *            type: integer
 */
routerUsers.get("/recipes/:id", getRecipeById);

// Endpoint para cerrar sesión
/**
 * @swagger
 * /user/logout:
 *  post:
 *    summary: Cerrar sesión del usuario
 *    requestBody:
 *      description: Token del usuario para cerrar sesión
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                description: Token del usuario
 *    responses:
 *      200:
 *        description: Cierre de sesión exitoso
 *      500:
 *        description: Error interno del servidor
 */
routerUsers.post("/user/logout", logout);


export default routerUsers;
