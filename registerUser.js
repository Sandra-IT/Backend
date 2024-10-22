const { query } = require("./conexion");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = async (req, res) => {
  const { correo, clave } = req.body; // Obtener datos del formulario
  console.log("pase por aqui");
  console.log(correo, clave);

  // Hashear la contraseña
  //const hashedPassword = bcrypt.hashSync(clave, saltRounds);

  try {
    // Insertar el nuevo usuario en la base de datos
    const [results] = await query(
      "INSERT INTO usuarios (correo, clave) VALUES (?, ?)",
      [correo, clave]
    );
    res.status(201).send("Usuario registrado correctamente");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = registerUser; // Exportar la función
