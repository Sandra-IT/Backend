const validar = (req, res) => {
  try {
    if (req.session && req.session.usuario) {
      // Puedes incluir más detalles del usuario si lo deseas
      res.status(200).json({
        mensaje: "Sesión validada",
        usuario: req.session.usuario, // Opcional: enviar más información sobre el usuario
      });
    } else {
      res.status(401).send("No autorizado: No se ha iniciado sesión");
    }
  } catch (err) {
    console.error("Error en la validación de sesión:", err);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = validar;