const { query } = require("./conexion");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//ruta de inicio de sesion
const login = async (req, res) => {
  const datos = req.body;
  //const datos = req.query;
  // const { username, password } = req.body;
  // A simple SELECT query
  try {
    const [results, fields] = await query(
      "SELECT * FROM usuarios WHERE correo = ? and clave = ?",
      [datos.correo, datos.clave]
    );
    console.log(datos.correo, datos.clave, results);
    if (results.length > 0) {
      res.status(200).send("Inicio de Sesión correcto");
    } else {
      res.status(401).send("Datos Incorrectos");
    }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    //console.log(err);
    console.error("Error en la consulta:", error);
    return res.status(500).send("Error en el servidor");
  }
};

module.exports = login;
