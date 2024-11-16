const { query } = require("./conexion");

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const [results] = await query('SELECT * FROM usuarios');

    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).send("Error al obtener usuarios desde la base de datos");
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).send("El ID del usuario es obligatorio");
  }

  try {
    const [userCheck] = await query('SELECT * FROM usuarios WHERE id = ?', [
      id,
    ]);

    if (userCheck.length === 0) {
      return res.status(404).send("Usuario no encontrado");
    }

    const [results] = await query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (results.affectedRows > 0) {
      res.status(200).send("Usuario eliminado correctamente");
    } else {
      res.status(500).send("No se pudo eliminar el usuario");
    }
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).send("Error al eliminar usuario en la base de datos");
  }
};

const modificarUsuario = async (req, res) => {
  const id = req.params.id

  const {
    nombre,
    apellido,
    fechaNacimiento,
    tipoUsuario,
    correo,
    
  } = req.body; // Obtener datos del formulario

  // Comprobamos que los datos necesarios estén presentes
  if (
    !nombre ||
    !apellido ||
    !fechaNacimiento ||
    !tipoUsuario ||
    !correo 
  
    
  ) {
    return res.status(400).send('Faltan datos en el formulario.');
  }

  if (!id) {
    return res.status(400).send("El ID del usuario es obligatorio");
  }

  try {
    const [userCheck] = await query('SELECT * FROM usuarios WHERE id = ?', [
      id,
    ]);

    if (userCheck.length === 0) {
      return res.status(404).send("Usuario no encontrado");
    }

    const [results] = await query('UPDATE usuarios SET nombre = ?, apellido = ?, fecha_nacimiento = ?, tipo_usuario = ?, correo = ? WHERE id = ?', [nombre, apellido, fechaNacimiento, tipoUsuario, correo, id]);

    if (results.affectedRows > 0) {
      res.status(200).send("Usuario modificado correctamente");
    } else {
      res.status(500).send("No se pudo modificar el usuario");
    }
  } catch (err) {
    console.error("Error al modificar usuario:", err);
    res.status(500).send("Error al modificar usuario en la base de datos");
  }
}

module.exports = { obtenerUsuarios, eliminarUsuario, modificarUsuario};
