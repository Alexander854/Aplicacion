import { connect } from "../databases";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const claveSecreta = process.env.DATA_SECRET_KEY;
const saltRounds = 10;

// Función para manejar el inicio de sesión
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cnn = await connect();

    // Buscar el usuario por email
    const [result] = await cnn.query("SELECT * FROM users WHERE email = ?", [email]);

    if (result.length > 0) {
      const user = result[0];

      // Verificar si la contraseña es correcta comparando el hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const payload = {
          user_id: user.id,
          email: user.email,
          username: user.username,
        };
        const token = getToken(payload);
        return res.status(200).header("auth", token).json({ success: true, message: "Inicio de sesión exitoso", token });
      } else {
        return res.status(400).json({ success: false, message: "Contraseña incorrecta" });
      }
    } else {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log("Error en logIn:", error.message);
    return res.status(500).json({ success: false, message: "Error interno del servidor", error: error.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const cnn = await connect();

    // Comprobar si el usuario ya existe
    const exist = await ifExist(email, "users", "email", cnn);
    if (exist) {
      return res.status(400).json({ success: false, message: "El usuario ya existe" });
    }

    // Generar el hash de la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar el nuevo usuario en la base de datos
    const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const valores = [username, email, hashedPassword];
    const [result] = await cnn.query(q, valores);

    if (result.affectedRows === 1) {
      return res.status(201).json({ success: true, message: "Usuario creado exitosamente" });
    } else {
      return res.status(400).json({ success: false, message: "No se pudo crear el usuario" });
    }
  } catch (error) {
    console.log("Error en createUsers:", error.message);
    return res.status(500).json({ success: false, message: "Error interno del servidor", error: error.message });
  }
};

// Función de autenticación para rutas protegidas
export const auth = (req, res, next) => {
  const token = req.headers[`auth`];
  if (!token) return res.status(400).json({ success: false, message: "Token no proporcionado" });

  jwt.verify(token, claveSecreta, (error, payload) => {
    if (error) {
      return res.status(400).json({ success: false, message: "Token no válido" });
    } else {
      req.user = payload;
      next();
    }
  });
};

// Listar recetas creadas por un usuario
export const listRecipesByUser = async (req, res) => {
  try {
    const user = req.user;
    const cnn = await connect();
    const q = "SELECT * FROM recipes WHERE user_id = ?";
    const [rows] = await cnn.query(q, [user.user_id]);
    return res.json({ Recipes: rows });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error interno del servidor", error: error.message });
  }
};

// Crear una nueva receta
export const addRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, cooking_time, difficulty } = req.body;
    const user = req.user;
    const cnn = await connect();

    const q = "INSERT INTO recipes (title, description, ingredients, instructions, cooking_time, difficulty, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const valores = [title, description, ingredients, instructions, cooking_time, difficulty, user.user_id];
    const [result] = await cnn.query(q, valores);

    if (result.affectedRows === 1) {
      return res.status(201).json({ success: true, message: "Receta creada exitosamente" });
    } else {
      return res.status(400).json({ success: false, message: "No se pudo crear la receta" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error interno del servidor", error: error.message });
  }
};

// Obtener una receta específica por su ID
export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const cnn = await connect();
    const q = "SELECT * FROM recipes WHERE id = ?";
    const [rows] = await cnn.query(q, [id]);

    if (rows.length > 0) {
      return res.json({ Recipe: rows[0] });
    } else {
      return res.status(404).json({ success: false, message: "Receta no encontrada" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error interno del servidor", error: error.message });
  }
};

// Función privada para verificar si un valor existe en una tabla específica
const ifExist = async (value, table, column, conexion) => {
  try {
    const q = `SELECT * FROM ${table} WHERE ${column} = ?`;
    const [rows] = await conexion.query(q, [value]);
    return rows.length > 0;
  } catch (error) {
    console.log("Error en ifExist:", error.message);
  }
};

// Función para generar un token
const getToken = (payload) => {
  try {
    const token = jwt.sign(payload, claveSecreta, { expiresIn: "1000000m" });
    return token;
  } catch (error) {
    console.log("Error en getToken:", error.message);
  }
};

// Controlador para cerrar sesión
export const logout = async (req, res) => {
  try {
    const { token } = req.body;

    // Aquí puedes realizar operaciones para invalidar el token, como agregarlo a una lista negra.
    // En este ejemplo, solo enviamos una respuesta exitosa.

    return res.status(200).json({ success: true, message: 'Cierre de sesión exitoso' });
  } catch (error) {
    console.error('Error en logout:', error.message);
    return res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
  }
};
