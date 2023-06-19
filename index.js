const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configurar body-parser para analizar los datos
app.use(bodyParser.json());

// Ruta para recibir las solicitudes del webhook
app.post("/", (req, res) => {
  // Aquí puedes realizar acciones con los datos recibidos en el webhook
  // console.log(req.body);
  const { orderType, tikcer, sl, tp1 } = req.body;

  console.log(orderType, tikcer, sl, tp1);
  // try {
  //   let result = await;
  //   connection.createLimitBuyOrder(tikcer, sl, tp1, 0.9, 2.0, {
  //     comment: "comm",
  //     clientId: "TE_GBPUSD_7hyINWqAlE",
  //   });
  //   console.log("Trade successful, result code is " + result.stringCode);
  // } catch (err) {
  //   console.log("Trade failed with result code " + err.stringCode);
  // }
  // Enviar una respuesta al servidor que envió el webhook
  // res.send("Webhook recibido correctamente");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
