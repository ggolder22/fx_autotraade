const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

let MetaApi = require("metaapi.cloud-sdk").default;

let token =
  "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlNjczNzg0NGMxZDcyNGE0NDg4YzM1ZGMyZDU0ODg0MSIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7Im1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7Im1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJtdC1tYW5hZ2VyLWFwaTpyZXN0OmRlYWxpbmc6KjoqIiwibXQtbWFuYWdlci1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sInRva2VuSWQiOiIyMDIxMDIxMyIsImltcGVyc29uYXRlZCI6ZmFsc2UsInJlYWxVc2VySWQiOiJlNjczNzg0NGMxZDcyNGE0NDg4YzM1ZGMyZDU0ODg0MSIsImlhdCI6MTY4NzIyMDkwMH0.GpQAGYeJst1fW-bjS0mt6ZEdWNkWtx-W0E36291PSh-c-ehoJiSApdKbm_qxvO8dvE8CC8AF70Hr9aH4tRG2AdObccLuqLjy-L6dxDuJnnvjQ-HtxMFZldZEcBfbjuhOwsEi69sNw7cp7bfTkXyxN1iaO1TuL5jGj30jy-kSEiVh8C_pIYVJHaU_XFrx8fWwxOvqLb79wThLhaH2aeVde65U7kXS11AHNwY5XHjV041mT8UxcK6orRZdokd-BtvlS7EbgAgizxLONxNwgoCxdomLZLfGy-jEFHAUVyfuF5YogOXHMetLFUTsPcnkR17_1F_XpUMwXKRyinSViJlNk9XUiaekXnG02XFtvQgPhJ1ReoG1QYku_qAzwZ0j4pr-nvEHA-qYe4Wn14Tob6t8Df-VjAZVS92XGKefeE97V4wDor5zKuAADk-bev-f02UnaV_hUwNdLobMXQWK17jUOGYPPgoUhyju8Rg6gv52sUW_TnQVQCUcf3v_IQYkcz_T-tnMs9CYuJcwBw8tfiLVZHE8MxEH2zs4IIWVdCMbzUwOpQYikLmw3XzdHf2myqeyYS4kgsz00fmIQLFq7MKMRlU0jO1Uj0MBjIiDTbQ1idmLBGNUWqwGh4LmtHpcL_0NV7S8ECiQi6ihGzqpQZIY0Ca9vlHdKoUC9Mg90H6mqG4";
let accountId = "c4cc7b70-593e-468f-b93f-19df817853b7";

//allowed FX symbols
SYMBOLS = [
  "AUDCAD",
  "AUDCHF",
  "AUDJPY",
  "AUDNZD",
  "AUDUSD",
  "CADCHF",
  "CADJPY",
  "CHFJPY",
  "EURAUD",
  "EURCAD",
  "EURCHF",
  "EURGBP",
  "EURJPY",
  "EURNZD",
  "EURUSD",
  "GBPAUD",
  "GBPCAD",
  "GBPCHF",
  "GBPJPY",
  "GBPNZD",
  "GBPUSD",
  "NOW",
  "NZDCAD",
  "NZDCHF",
  "NZDJPY",
  "NZDUSD",
  "USDCAD",
  "USDCHF",
  "USDJPY",
  "XAGUSD",
  "XAUUSD",
  "BTCUSD",
];

// Configurar body-parser para analizar los datos
app.use(bodyParser.json());

// Ruta para recibir las solicitudes del webhook

app.post("/", async (req, res) => {
  // We get data from webhook

  //const { orderType, tikcer, RF, entry, sl, tp1, ps1, tp2, ps2, tp3, ps3 } =
  //  req.body;

  //console.log(orderType, tikcer, RF, entry, sl, tp1, tp2, tp3, ps1, ps2, ps3);

  const { trade } = req.body;
  console.log(trade);

  let tradeSplit = trade?.split(" ");
  console.log(tradeSplit);

  let tradeMapeado = tradeSplit.map((e, i) => {
    if (i == 0) return { orderType: e };
    if (i == 1) return { tikcer: e };
    if (e == "RF") return { RF: tradeSplit[i + 1] };
    if (e == "Entry") return { Entry: tradeSplit[i + 1] };
    if (e == "SL") return { SL: tradeSplit[i + 1] };
    if (e == "TP1") return { TP1: tradeSplit[i + 1] };
    if (e == "TP2") return { TP2: tradeSplit[i + 1] };
    if (e == "TP3") return { TP3: tradeSplit[i + 1] };
    if (e == "TP4") return { TP4: tradeSplit[i + 1] };
    if (e == "TP5") return { TP5: tradeSplit[i + 1] };
    if (e == "TP6") return { TP6: tradeSplit[i + 1] };
    if (e == "PS1") return { PS1: tradeSplit[i + 1] };
    if (e == "PS2") return { PS2: tradeSplit[i + 1] };
    if (e == "PS3") return { PS3: tradeSplit[i + 1] };
    if (e == "PS4") return { PS4: tradeSplit[i + 1] };
    if (e == "PS5") return { PS5: tradeSplit[i + 1] };
    if (e == "PS6") return { PS6: tradeSplit[i + 1] };
  });

  const tradeFilter = tradeMapeado.filter((e) => e !== undefined);

  let tradeFinal = {};
  for (let e of tradeFilter) {
    tradeFinal[Object.keys(e)[0]] = Object.values(e)[0];
  }

  console.log(tradeFinal);

  const {
    orderType,
    tikcer,
    RF,
    Entry,
    SL,
    TP1,
    PS1,
    TP2,
    PS2,
    TP3,
    PS3,
    TP4,
    PS4,
    TP5,
    PS5,
    TP6,
  } = tradeFinal;

  console.log(+Entry, +SL);

  //Codigo para ejecutar trades   {

  const api = new MetaApi(token);

  try {
    const api = new MetaApi(token);
    const account = await api.metatraderAccountApi.getAccount(accountId);
    let connection = account.getRPCConnection();
    await connection.connect();

    // invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)

    //console.log('account information:', await connection.getAccountInformation() );
    const {
      broker,
      currency,
      server,
      balance,
      equity,
      margin,
      freeMargin,
      leverage,
      marginLevel,
      type,
      name,
      login,
      credit,
      platform,
      marginMode,
      tradeAllowed,
      investorMode,
    } = await connection.getAccountInformation();

    //console.log("positions:", await connection.getPositions());

    //calculate multiplier

    if (tikcer == "XAUUSD") multiplier = 0.1;
    else if (tikcer == "XAGUSD") multiplier = 0.001;
    //else if(str(trade['Entry']).index('.') >= 2):
    //    multiplier = 0.01
    else multiplier = 0.0001;

    console.log("multiplier: ", multiplier);

    //calculates the stop loss in pips
    let stopLossPips = Math.abs(Math.round((+SL - Entry) / multiplier));

    console.log("slpips", stopLossPips);

    //  calculates the position size using stop loss and RISK FACTOR
    console.log("Risk Factor:", RF);
    console.log("balance:", balance);

    let positionSize =
      Math.floor(((balance * RF) / stopLossPips / 10) * 100) / 100;
    console.log("LoteSize:", positionSize);

    // trade
    console.log("Submitting pending order");

    size1 = (+positionSize * +PS1).toFixed(2);
    size2 = (+positionSize * +PS2).toFixed(2);
    size3 = (+positionSize * +PS3).toFixed(2);
    size4 = (+positionSize * +PS4).toFixed(2);
    size5 = (+positionSize * +PS5).toFixed(2);
    size6 = (+positionSize * +PS6).toFixed(2);
    console.log("size1:", size1);
    console.log("size2:", size2);
    console.log("size3:", size3);
    console.log("size4:", size4);
    console.log("size5:", size5);
    console.log("size6:", size6);
    const posize = [size1, size2, size3, size4, size5, size6];
    const tptp = [TP1, TP2, TP3, TP4, TP5, TP6];
    console.log(posize);
    console.log(tptp);

    if (orderType == "BUY")
      for (let i = 0; i < 6; i++) {
        result = await connection.createMarketBuyOrder(
          tikcer,
          +posize[i],
          +sl,
          +tptp[i]
        );
      }
    else if (orderType == "SELL") {
      for (let i = 0; i < 3; i++) {
        result = await connection.createMarketSellOrder(
          tikcer,
          +posize[i],
          +SL,
          +tptp[i]
        );
      }
    } else if (orderType == "BUY LIMIT") {
    }

    console.log("sl:", SL);
    console.log("tp1:", TP1);
    console.log("tp2:", TP2);
    console.log("tp3:", TP3);
    console.log("tp4:", TP4);
    console.log("tp5:", TP5);
    console.log("tp6:", TP6);

    console.log("ps1:", PS1);
    console.log("ps2:", PS2);
    console.log("ps3:", PS3);
    console.log("ps4:", PS4);
    console.log("ps5:", PS5);
    console.log("ps6:", PS6);

    console.log("Trade successful, result code is " + result.stringCode);
  } catch (err) {
    console.log("Trade failed with result code " + err.stringCode);
  }
});

app.get("/information", async (req, res) => {
  try {
    const api = new MetaApi(token);
    const account = await api.metatraderAccountApi.getAccount(accountId);
    let connection = account.getRPCConnection();
    await connection.connect();
    const { broker, balance, equity, login } =
      await connection.getAccountInformation();
    pos = await connection.getPositions();
    console.log("GET", broker);
    console.log("Pos", pos);

    res.status(200).json({
      broker: broker,
      balance: balance,
      equity: equity,
      login: login,
      pos: { pos },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
