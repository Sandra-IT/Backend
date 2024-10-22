const connection = require("./conexion");

const obtenerUsuarios = async (req, res) => {
  //A simple SELECT query
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios`"
    );

    // console.log("Resultados de la consulta:", results);
    res.status(200).json(results);

    console.log(results);
    console.log(fields);
  } catch (err) {
    console.log(err);
    //console.error("Error al obtener usuarios:", err);
    res.status(500).send("Error en el servidor");
  }
};

const eliminarUsuario = async (req, res) => {
  if (!req.session.usuario) {
    res.status(401).send("No autorizado");
    return;
  }
  const datos = req.query;
  //A simple SELECT query
  try {
    const [results, fields] = await connection.query(
      "DELETE FROM usuarios WHERE `usuarios`.`id` = ?",
      [datos.id]
    );

    // console.log("Resultados de la consulta:", results);
    if (results.affectedRows > 0) {
      //req.session.usuario = datos.usuario;
      res.status(200).send("Usuario Eliminado");
    } else {
      res.status(401).send("No se pudo Eliminar");
    }

    console.log(results);
    console.log(fields);
  } catch (err) {
    console.log(err);
    //console.error("Error al obtener usuarios:", err);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = { obtenerUsuarios, eliminarUsuario };
