CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único para cada usuario
    username VARCHAR(50) NOT NULL,      -- Nombre de usuario
    password VARCHAR(255) NOT NULL,     -- Contraseña (encriptada)
    email VARCHAR(100) NOT NULL UNIQUE, -- Correo electrónico único
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha de la última actualización
);

CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Identificador único para cada cuenta
    user_id INT NOT NULL,                -- Relación con la tabla 'users'
    account_number VARCHAR(50) NOT NULL, -- Número de cuenta (o cualquier identificador de cuenta)
    account_type VARCHAR(50),            -- Tipo de cuenta (por ejemplo: 'usuario', 'admin', etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación de la cuenta
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de la última actualización
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Clave foránea que se relaciona con 'users'
);

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    cooking_time INT NOT NULL,
    difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único para cada comentario
    recipe_id INT NOT NULL,             -- Relación con la tabla 'recipes'
    user_id INT NOT NULL,               -- Relación con la tabla 'users'
    comment TEXT NOT NULL,              -- Contenido del comentario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del comentario
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE, -- Clave foránea que se relaciona con 'recipes'
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Clave foránea que se relaciona con 'users'
);

-- Tabla para permitir a los usuarios guardar recetas
CREATE TABLE saved_recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,             -- El usuario que guarda la receta
    recipe_id INT NOT NULL,           -- La receta que se guarda
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha en la que se guarda la receta
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- Relación con la tabla 'users'
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE -- Relación con la tabla 'recipes'
);

-- Tabla para que los usuarios puedan puntuar recetas
CREATE TABLE recipe_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,            -- Usuario que da la calificación
    recipe_id INT NOT NULL,          -- Receta que se califica
    rating INT CHECK (rating >= 1 AND rating <= 5),  -- Calificación de 1 a 5
    rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha en la que se califica
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);
