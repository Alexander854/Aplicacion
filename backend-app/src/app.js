//configuración de express
//env profe DB_HOST=junction.proxy.rlwy.net
//DB_USER=root 
//DB_PASSWOR=hlkhBIStWraTNIWjBOKqImkGPBkmZSRF
//DB_DATABASE=railway
//DATA_SECRET_KEY= "lab"
//DB_PORT=19897

import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";
const spec = swaggerJSDoc(options);

import rutas from "./router/users";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Rutas
app.use(rutas);

//documentacion
app.use("/docs", swaggerUI.serve, swaggerUI.setup(spec));

export default app;
