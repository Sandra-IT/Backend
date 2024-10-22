const mysql = require("mysql2");

// Configura la conexión
//const connection = mysql.createConnection({
const pool = mysql.createPool({
  host: "localhost", // Cambia esto según tu configuración
  user: "root", // Cambia esto por tu usuario
  password: "Bd123+", // Cambia esto por tu contraseña
  database: "sistema_inventario_virtual", // Cambia esto por el nombre de tu base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Función para ejecutar consultas usando el pool
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve([results, fields]);
    });
  });
};

// Conectar al pool de conexiones y mostrar un mensaje
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectar al pool de conexiones:", err);
    return;
  }
  console.log("Conexión al pool de conexiones exitosa");
  connection.release(); // Libera la conexión para su uso posterior
});

// Conectar a la base de datos
//connection.connect((err) => {
//if (err) {
//console.error("Error al conectar a la base de datos:", err);
//return;
//}
//console.log("Conexión a la base de datos exitosa");
//connection.release(); // Cierra la conexión
//});

module.exports = { query };
