//const express = require('express');
//const app = express();
//const port = 3000;
//const cors = require('cors');

//const corsOptions = {
//origin: 'http://localhost:5173',
// credentials: true,
// methods: ['GET', 'POST', 'PUT', 'DELETE'],
//};

//app.use(cors(corsOptions));

// Get the client

//const session = require("express-session");
//app.use(session({
//secret: 'mi-secreto', // Cambia esto por una clave secreta segura
//resave: false,
//saveUninitialized: false,
//cookie: {
//httpOnly: true,
//secure: false, // Cambia a true si usas HTTPS
//sameSite: 'lax', // Asegura que las cookies se envíen adecuadamente
//}
//}));
//const md5 = require("md5");
//const bcrypt = require("bcrypt");
//const login = require("./login");
//const registro = require("./registro");
//const { obtenerUsuarios, eliminarUsuario } = require("./usuarios");
//const validar = require("./validar");
//const connection = require("./conexion");
//const saltRounds = 10;

//app.use(cors()); // Usar CORS para permitir solicitudes de diferentes dominios
//app.use(express.json());

//app.use(cors({
//origin: 'http://localhost:3000',
//credentials: true
//}));

// Iniciar el servidor
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
//console.log(`Servidor corriendo en el puerto ${PORT}`);
//});
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connection = require("./conexion");

const md5 = require("md5");
const bcrypt = require("bcrypt");
const login = require("./login");
const { obtenerUsuarios, eliminarUsuario } = require("./usuarios");
const validar = require("./validar");
const bodyParser = require("body-parser");
const registerUser = require("./registerUser");

const app = express();
const port = 4000;
const saltRounds = 10;

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:5173", // Cambia esto si tu frontend está en otro puerto
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "asdlfkfso3234o23lsdflasdfasdfoasdf",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    }, // Cambia a true si usas HTTPS
  })
);

//connection
//.getConnection()
//.then((conn) => {
// console.log("Conexión a la base de datos exitosa");
// conn.release(); // Libera la conexión después de usarla
//})
//.catch((err) => {
// console.error("Error al conectar a la base de datos:", err);
//});

//RUTAS
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//ruta de inicio de sesion
app.get("/login", login);

//ruta para validar si el usuario esta logueado
app.get(" /validar", validar);

//ruta para obtener usuarios
app.get("/usuarios", obtenerUsuarios);

//para borrar usuarios
app.delete("/usuarios", eliminarUsuario);

app.get("/conversor", (req, res) => {
  res.json({ info: "Resultado de la conversión" });
});

app.post("/login", login);

app.use(bodyParser.urlencoded({ extended: true })); // Para manejar datos del formulario

app.post("/register", registerUser); // Manejar la solicitud de registro

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
