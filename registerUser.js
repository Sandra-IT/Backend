
const { pool} = require('./conexion');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async (req, res) => {
  const {
    nombre,
    apellido,
    fechaNacimiento,
    tipoUsuario,
    correo,
    confirmCorreo,
    clave,
  } = req.body; // Obtener datos del formulario

  // Comprobamos que los datos necesarios estén presentes
  if (
    !nombre ||
    !apellido ||
    !fechaNacimiento ||
    !tipoUsuario ||
    !correo ||
    !confirmCorreo ||
    !clave
  ) {
    return res.status(400).send('Faltan datos en el formulario.');
  }

  // Verificar que los correos coincidan
  if (correo !== confirmCorreo) {
    return res.status(400).send('Los correos electrónicos no coinciden.');
  }

  console.log('Pase por aquí');
  console.log(correo, correo);
  console.log('Clave:', clave);
  const sql = 'INSERT INTO usuarios (nombre, apellido, fecha_nacimiento, tipo_usuario, correo, clave) VALUES (?, ?, ?, ?, ?, ?)'
    

// Ejecutar la consulta
pool.query(sql, [nombre,
  apellido,
  fechaNacimiento,
  tipoUsuario,
  correo,
  clave], (error, resultado) => {
  if (error) {
    console.error('Error al insertar el usuario:', error);
    return res.status(500).send("Error al registrar el usuario.");
  }
  console.log('Usuario insertado con éxito:', resultado);
  return res.status(201).send({ mensaje: 'Usuario registrado correctamente' });

});
}
module.exports = registerUser;
