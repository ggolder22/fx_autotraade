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
  const { orderType, tikcer, RF, entry, sl, tp1, tp2 } = req.body;

  console.log(orderType, tikcer, RF, entry, sl, tp1, tp2 );

 //Codigo para ejecutar trades   {

 let MetaApi = require('metaapi.cloud-sdk').default;

 let token = process.env.TOKEN || '<put in your token here>';
 let accountId = process.env.ACCOUNT_ID || '<put in your account id here>';
 
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
     console.log('Testing MetaAPI RPC API');
     console.log('account information:', await connection.getAccountInformation());
     console.log('positions:', await connection.getPositions());
     //console.log(await connection.getPosition('1234567'));
     console.log('open orders:', await connection.getOrders());
     //console.log(await connection.getOrder('1234567'));
     console.log('history orders by ticket:', await connection.getHistoryOrdersByTicket('1234567'));
     console.log('history orders by position:', await connection.getHistoryOrdersByPosition('1234567'));
     console.log('history orders (~last 3 months):', 
       await connection.getHistoryOrdersByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()));
     console.log('history deals by ticket:', await connection.getDealsByTicket('1234567'));
     console.log('history deals by position:', await connection.getDealsByPosition('1234567'));
     console.log('history deals (~last 3 months):', 
       await connection.getDealsByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()));
     console.log('server time', await connection.getServerTime());
 
     // calculate margin required for trade
     console.log('margin required for trade', await connection.calculateMargin({
       symbol: 'GBPUSD',
       type: 'ORDER_TYPE_BUY',
       volume: 0.1,
       openPrice: 1.1
     }));
 
     // trade
     console.log('Submitting pending order');
     try {
       let result = await
       connection.createMarketBuyOrder(tikcer, 0.01, sl, tp1, {
         comment: 'comm',
         clientId: 'TE_GBPUSD_7hyINWqAlE'
       });
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
