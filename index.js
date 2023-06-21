const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let MetaApi = require('metaapi.cloud-sdk').default;

let token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlNjczNzg0NGMxZDcyNGE0NDg4YzM1ZGMyZDU0ODg0MSIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7Im1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7Im1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJtdC1tYW5hZ2VyLWFwaTpyZXN0OmRlYWxpbmc6KjoqIiwibXQtbWFuYWdlci1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sInRva2VuSWQiOiIyMDIxMDIxMyIsImltcGVyc29uYXRlZCI6ZmFsc2UsInJlYWxVc2VySWQiOiJlNjczNzg0NGMxZDcyNGE0NDg4YzM1ZGMyZDU0ODg0MSIsImlhdCI6MTY4NzIyMDkwMH0.GpQAGYeJst1fW-bjS0mt6ZEdWNkWtx-W0E36291PSh-c-ehoJiSApdKbm_qxvO8dvE8CC8AF70Hr9aH4tRG2AdObccLuqLjy-L6dxDuJnnvjQ-HtxMFZldZEcBfbjuhOwsEi69sNw7cp7bfTkXyxN1iaO1TuL5jGj30jy-kSEiVh8C_pIYVJHaU_XFrx8fWwxOvqLb79wThLhaH2aeVde65U7kXS11AHNwY5XHjV041mT8UxcK6orRZdokd-BtvlS7EbgAgizxLONxNwgoCxdomLZLfGy-jEFHAUVyfuF5YogOXHMetLFUTsPcnkR17_1F_XpUMwXKRyinSViJlNk9XUiaekXnG02XFtvQgPhJ1ReoG1QYku_qAzwZ0j4pr-nvEHA-qYe4Wn14Tob6t8Df-VjAZVS92XGKefeE97V4wDor5zKuAADk-bev-f02UnaV_hUwNdLobMXQWK17jUOGYPPgoUhyju8Rg6gv52sUW_TnQVQCUcf3v_IQYkcz_T-tnMs9CYuJcwBw8tfiLVZHE8MxEH2zs4IIWVdCMbzUwOpQYikLmw3XzdHf2myqeyYS4kgsz00fmIQLFq7MKMRlU0jO1Uj0MBjIiDTbQ1idmLBGNUWqwGh4LmtHpcL_0NV7S8ECiQi6ihGzqpQZIY0Ca9vlHdKoUC9Mg90H6mqG4';
let accountId = 'c4cc7b70-593e-468f-b93f-19df817853b7';


//allowed FX symbols
SYMBOLS = ['AUDCAD', 'AUDCHF', 'AUDJPY', 'AUDNZD', 'AUDUSD', 'CADCHF', 'CADJPY', 'CHFJPY', 'EURAUD', 'EURCAD', 'EURCHF', 'EURGBP', 'EURJPY', 'EURNZD', 'EURUSD', 'GBPAUD', 'GBPCAD', 'GBPCHF', 'GBPJPY', 'GBPNZD', 'GBPUSD', 'NOW', 'NZDCAD', 'NZDCHF', 'NZDJPY', 'NZDUSD', 'USDCAD', 'USDCHF', 'USDJPY', 'XAGUSD', 'XAUUSD', "BTCUSD"]

// Configurar body-parser para analizar los datos
app.use(bodyParser.json());

// Ruta para recibir las solicitudes del webhook
app.post("/", async (req, res) => {
  // Aquí puedes realizar acciones con los datos recibidos en el webhook
  
  const { orderType, tikcer, RF, entry, sl, tp1} = req.body;

  console.log(orderType, tikcer, RF, entry, sl, tp1);

  //obtains account information from MetaTrader server
//  try {
//    const account_information = await connection.get_account_information("balance");
//    } catch (err) {
//      console.error(err);
//    }

//   //calculate multiplier
  
//   if(tikcer == 'XAUUSD')
//       multiplier = 0.1

//   else if(tikcer == 'XAGUSD')
//       multiplier = 0.001

//   //else if(str(trade['Entry']).index('.') >= 2):
//   //    multiplier = 0.01

//   else
//       multiplier = 0.0001
  
//   console.log("multiplier: ", multiplier)    
  
//   //calculates the stop loss in pips
//   let stopLossPips = Math.abs(Math.round((sl - entry / multiplier)))
//   console.log("slpips", stopLossPips); 
 

//   //  calculates the position size using stop loss and RISK FACTO
 
//   let positionSize = Math.floor((((balance * RF) / stopLossPips) / 10 * 100) / 100);
//  console.log("position size", positionSize);
 
 
 //Codigo para ejecutar trades   {


 
 const api = new MetaApi(token);
 
 async function testMetaApiSynchronization() {
   try {
     const account = await api.metatraderAccountApi.getAccount(accountId);
     const initialState = account.state;
     const deployedStates = ['DEPLOYING', 'DEPLOYED'];
 
     if(!deployedStates.includes(initialState)) {
       // wait until account is deployed and connected to broker
       console.log('Deploying account');
       await account.deploy();
     }
   
     console.log('Waiting for API server to connect to broker (may take couple of minutes)');
     await account.waitConnected();
 
     // connect to MetaApi API
     let connection = account.getRPCConnection();
     await connection.connect();
 
     // wait until terminal state synchronized to the local state
     console.log('Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)');
     await connection.waitSynchronized();
 
    // invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)
    //  console.log('Testing MetaAPI RPC API');
    
    
    //console.log('account information:', await connection.getAccountInformation() );
    const { broker, currency, server, balance, equity, margin, freeMargin, leverage, marginLevel, type, name, login, credit, platform, marginMode, tradeAllowed, investorMode} = await connection.getAccountInformation()
    console.log('positions:', await connection.getPositions());
    //console.log("balance: ", balance)
    //  //console.log(await connection.getPosition('1234567'));
    //console.log('open orders:', await connection.getOrders());
    //  //console.log(await connection.getOrder('1234567'));
    //  console.log('history orders by ticket:', await connection.getHistoryOrdersByTicket('1234567'));
    //  console.log('history orders by position:', await connection.getHistoryOrdersByPosition('1234567'));
    //  console.log('history orders (~last 3 months):', 
    //    await connection.getHistoryOrdersByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()));
    //  console.log('history deals by ticket:', await connection.getDealsByTicket('1234567'));
    //  console.log('history deals by position:', await connection.getDealsByPosition('1234567'));
    //  console.log('history deals (~last 3 months):', 
    //    await connection.getDealsByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()));
    //  console.log('server time', await connection.getServerTime());

    //calculate multiplier
  
  if(tikcer == 'XAUUSD')
    multiplier = 0.1

  else if(tikcer == 'XAGUSD')
    multiplier = 0.001

//else if(str(trade['Entry']).index('.') >= 2):
//    multiplier = 0.01

  else
    multiplier = 0.0001

  console.log("multiplier: ", multiplier)    

 //get entry price
 price = await connection.get_symbol_price(symbol=tikcer)
 console.log("entry price:", price);
  //calculates the stop loss in pips
  let stopLossPips = Math.abs(Math.round(((sl - price) / multiplier)))

  console.log("slpips", stopLossPips); 


  //  calculates the position size using stop loss and RISK FACTO
  console.log("Risk Factor:", RF)
  console.log("balance:", balance)
  let positionSize = Math.floor((((balance * RF) / stopLossPips) / 10 * 100) / 100);
  console.log("LoteSize:", positionSize);

 
     // calculate margin required for trade
    //  console.log('margin required for trade', await connection.calculateMargin({
    //    symbol: 'GBPUSD',
    //    type: 'ORDER_TYPE_BUY',
    //    volume: 0.1,
    //    openPrice: 1.1
    //  }));
 
    //  // trade
    //  console.log('Submitting pending order');
    //  try {
    //    let result = await
    //    connection.createMarketBuyOrder(tikcer, 0.01, sl, tp1, {
    //      comment: 'comm',
    //      clientId: 'TE_GBPUSD_7hyINWqAlE'
    //    });
    //    console.log('Trade successful, result code is ' + result.stringCode);
    //  } catch (err) {
    //    console.log('Trade failed with result code ' + err.stringCode);
    //  }

     // trade
     console.log('Submitting pending order');
     try {
       let result = await
       connection.createMarketBuyOrder(tikcer, +positionSize, +sl, +tp1);
       console.log("sl:",sl);
       console.log(typeof(+sl));
       console.log("tp1:", tp1);

       console.log('Trade successful, result code is ' + result.stringCode);
     } catch (err) {
       console.log('Trade failed with result code ' + err.stringCode);
     }
 
     if(!deployedStates.includes(initialState)) {
       // undeploy account if it was undeployed
       console.log('Undeploying account');
       await connection.close();
       await account.undeploy();
     }
   
   } catch (err) {
     console.error(err);
   }
   process.exit();
 }
 
 testMetaApiSynchronization();



 //}


});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
