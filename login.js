const { query } = require("./conexion");
const bcrypt = require("bcrypt");


// Ruta de inicio de sesión
const login = async (req, res) => {
  const datos = req.body;

  try {
    const [results, fields] = await query(
      'SELECT * FROM usuarios WHERE correo =? AND clave = ?',
      [datos.correo, datos.clave] // Solo estamos buscando por correo
    );
    console.log(datos.correo, datos.clave, results);
    
    if (results.length > 0) {
      return res.status(200).send("Bienvenido");
    } else {
      return res.status(401).send("Datos Incorrectos");
    }

  } catch (err) {
    console.error("Error en la consulta:", err);
    return res.status(500).send("Error en el servidor");
  }
};

module.exports = login;

