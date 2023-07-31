
//Telegram
const TelegramBot = require('node-telegram-bot-api');
const {token} = process.env;
const bot = new TelegramBot(token, {polling: true});

//Meta API
let MetaApi = require("metaapi.cloud-sdk").default;
let MetaStats = require("metaapi.cloud-sdk").MetaStats; 

//Express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;


// Permisos para que podamos acceder a la informacion desde afuera
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


// con este codigo obtengo el chat id de telegram
bot.onText(/^\/chatid/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "El id de este chat es: " + chatId);  
});



const fornix = [
//Cuenta Ger DEMO Meta quotes
  {accountId:"06efc5c1-1ce3-424b-aff4-13af1cbd76b2",
  token:"3qB8zuMywP3ESk6gSj1EoAyoXZKb6C1EU2o1ySJSLWuo6voKbjiK1StCKudpcYru",
  nombre:"Ger Challenge",
  autoTrade:true,
  RF:0.05,
  botId:-1001565358230},

// Cuenta Ger DEMO FTMO TIPO Challenge
  {accountId:"dacc3da5-5dd5-490d-a73a-3ed687554c4b", 
  token:"3KMHwtECqT5xjUPkVNEUE5RacbajAKbKwzNgfFyB1xboGJEG9GchXHuDm6eR1HQJ",
  nombre:"German DEMO",
  autoTrade:true,
  RF:0.05,
  botId:-1001565358230},

// //Cuenta Tony Challenge
//   {accountId:"f76ea348-442e-4472-9dd8-3715fb4d21a4",
//   token:"sbDVoxLVidki7og4tRb2C14A7cb7qRRrd2Bg3EQE34v2gFQJ2ep9SvhgxAbF7p25",
//   nombre:"Tony Challenge",
//   autoTrade:false,
//   RF:0.016,
//   botId:-928777684},

// //Cuenta Real Tony
//   {accountId:"0c5961c1-c0ef-4eff-b3bc-c835701c5394",
//   token:"4k64PKMnEMHf3R5K5edSfEih7KShf58SXnYnjL8XK9zXusTA72Gyh7rmqegF1AoH",
//   nombre:"Tony Real",
//  autoTrade:false,
//   RF :0.005,
//   botId:-928777684}

]

console.log("fornix",fornix);

const ventas = [];

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



// Scheduling this code will let us stop trading by shcedule -- { 
  
  //#region
let scheduleTrading = true;
  
var schedule = require('node-schedule');

//Para utilizarlo en un método de programación basado en fechas, primero se determina la hora, por ejemplo 21 de noviembre de 2017, a las 5:30

// var date = new Date(2017, 11, 21, 5, 30, 0);
// var j = schedule.scheduleJob(date, function(){
//     console.log('The world is going to end today.');
// });
 //rsj.cancel (); // Cancelar el plan preestablecido

// Luego, los minutos fijos por hora

//  var schedule = require('node-schedule');
//  var rule = new schedule.RecurrenceRule();
//  rule.minute = 42; 
//  var j = schedule.scheduleJob(rule, function(){
//      console.log('The answer to life, the universe, and everything!');
//  });

// Stop bots Monday - Friday at 17:49. 
// Using data for timezone UTC 

stopHora = 20;
stopMinuto = 49;

 var rule = new schedule.RecurrenceRule();
 rule.dayOfWeek = [0, new schedule.Range(1, 5)];
 rule.hour = +stopHora;
 rule.minute = +stopMinuto;
 var j = schedule.scheduleJob(rule, function(){
    scheduleTrading = false; 
    console.log(" 🛑 " + (stopHora-3) + ":" + stopMinuto + ' Bot has sttoped its operation due to tricky time!');
    bot.sendMessage(-1001565358230, " 🛑 " + (stopHora-3) + ":" + stopMinuto + ' Bot has sttoped its operation due to tricky time!')
    bot.sendMessage(-928777684, " 🛑 " + (stopHora-3) + ":" + stopMinuto + ' Bot has sttoped its operation due to tricky time!')

 });

// Start bots Monday - Friday at 18:51
startHora= 21;
startMinuto = 51;
 var rule = new schedule.RecurrenceRule();
 rule.dayOfWeek = [0, new schedule.Range(1, 5)];
 rule.hour = +startHora;
 rule.minute = +startMinuto;
 var j = schedule.scheduleJob(rule, function(){
    scheduleTrading = true; 
    console.log(" 🤪 " + (startHora-3) + ":" + startMinuto +' Bot has started its operation its time to make money!');
    bot.sendMessage(-1001565358230, " 🤪 " + (startHora-3) +":" + startMinuto +' Bot has started its operation its time to make money!')
    bot.sendMessage(-928777684, " 🤪 " + (startHora-3) +":" + startMinuto +' Bot has started its operation its time to make money!')
 });

//Time to sleep 
 sleepHora = 0;
 sleepMinuto = 43;
 
 var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = 6;
  rule.hour = +sleepHora;
  rule.minute = +sleepMinuto;
  var j = schedule.scheduleJob(rule, function(){
     scheduleTrading = false; 
     console.log(" 🛑 " + "21" + ":" + sleepMinuto + ' Bot: Im going to sleep know. Market is out of business!.\nSee you on sunday night, in a market opening');
     bot.sendMessage(-1001565358230, " 🛑 " + "21" + ":" + sleepMinuto + ' Bot: Im going to sleep know. Market is out of business!.\nSee you on sunday night, in a market opening!')
     bot.sendMessage(-928777684, " 🛑 " + "21" + ":" + sleepMinuto + ' Bot: Im going to sleep know. Market is out of business!.\nSee you on sunday night, in a market opening!')
 
  });
 
// Time to wake up 
wakeHora = 0;
wakeMinuto = 30;

var rule = new schedule.RecurrenceRule();
 rule.dayOfWeek = 1;
 rule.hour = +wakeHora;
 rule.minute = +wakeMinuto;
 var j = schedule.scheduleJob(rule, function(){
    scheduleTrading = true; 
    console.log(" 👋 " + (wakeHora-3) + ":" + wakeMinuto + ' Hi there bro. Market is opening in few minutes!.\nIts time to make some money');
    bot.sendMessage(-1001565358230, " 👋 " + (wakeHora-3) + ":" + wakeMinuto + ' Hi there bro. Market is opening in few minutes!.\nIts time to make some money');
    bot.sendMessage(-928777684, " 👋 " + (wakeHora-3) + ":" + wakeMinuto + ' Hi there bro. Market is opening in few minutes!.\nIts time to make some money')


 });




 //ejecutamos cada minuto

//  var rule = new schedule.RecurrenceRule();
//   var times = [];
//   for(var i=1; i<60; i++){
//   times.push(i);
//   }
//   rule.minute = times;
//   var c=0;
//   var j = schedule.scheduleJob(rule, function(){
//     c++;
//     console.log("Minutos:",c);
//     console.log(scheduleTrading);
//   });

//#endregion


// Configurar body-parser para analizar los datos
app.use(bodyParser.json());

// Ruta para recibir las solicitudes del webhook

  app.post("/", async (req, res) => {
   
  //Lectura de trades
  
    const { trade } = req.body;
    
    console.log("trade",trade);

  //Lectura de fundamentales
    const  fundamentals  = req.body;

    console.log("Fundamentales: ", fundamentals);
    console.log(fundamentals.length);

  // Script para fundamentales 
  
    if (trade == undefined && fundamentals.length>0) {
        // Fundamentals 
    
        async function noticias (impact, country, date, title){
      
          if (impact == "High"){ 
          try {
          //mando mensaje a canal de german
          bot.sendMessage(-1001565358230, " 🗞️  German´s NEWS: " +"\n" + title + "\nImpact: " + impact + "\nMonetary Base: " + country + "\nDate: " + date)
          //mando mensaje a canal de tony
          bot.sendMessage(-928777684, " 🗞️  Tony´s NEWS: "  + "\n" + title + "\nImpact: " + impact + "\nMonetary Base: " + country + "\nDate: " + date)

          bot.sendMessage(1295846107, " 🗞️  Fornix´s NEWS: "  + "\n" + title + "\nImpact: " + impact + "\nMonetary Base: " + country + "\nDate: " + date)

          bot.sendMessage(1650845575, " 🗞️  Fornix´s NEWS: "  + "\n" + title + "\nImpact: " + impact + "\nMonetary Base: " + country + "\nDate: " + date)

          console.log("impact: ", impact);
          } catch (err) {
            console.log("Noticias not working ");
          }
        }
        }
        
        fundamentals?.forEach(e=>noticias(e.impact, e.country, e.date, e.title))
   }
  
    
  //Script trades

    if (trade != undefined) {
    let tradeSplit = trade?.split(" ");
    ;

    let tradeMapeado = tradeSplit?.map((e, i) => {
      if (i == 0) return { orderType: e };
      if (i == 1) return { tikcer: e };
      if (e == "RF") return { RF: tradeSplit[i + 1] };
      if (e == "Entry") return { Entry: tradeSplit[i + 1] };
      if (e == "SL") return { SL: tradeSplit[i + 1] };
      if (e == "TP1") return { TP1: tradeSplit[i + 1] };
      if (e == "TP2") return { TP2: tradeSplit[i + 1] };
      if (e == "TP3") return { TP3: tradeSplit[i + 1] };
      if (e == "TP4") return { TP4: tradeSplit[i + 1] };
      //if (e == "TP5") return { TP5: tradeSplit[i + 1] };
      //if (e == "TP6") return { TP6: tradeSplit[i + 1] };
      if (e == "PS1") return { PS1: tradeSplit[i + 1] };
      if (e == "PS2") return { PS2: tradeSplit[i + 1] };
      if (e == "PS3") return { PS3: tradeSplit[i + 1] };
      if (e == "PS4") return { PS4: tradeSplit[i + 1] };
      //if (e == "PS5") return { PS5: tradeSplit[i + 1] };
      //if (e == "PS6") return { PS6: tradeSplit[i + 1] };
      if (e == "TSL") return { TSL: tradeSplit[i + 1] };
    });

    const tradeFilter = tradeMapeado?.filter((e) => e !== undefined);

    let tradeFinal = {};
    for (let e of tradeFilter) {
      tradeFinal[Object.keys(e)[0]] = Object.values(e)[0];
    }

    console.log("tradeFinal",tradeFinal);

    const {
      orderType,
      tikcer,
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
      //TP5,
      //PS5,
      //TP6,
      //PS6,
      TSL
    } = tradeFinal;

    //const RF = 0.005
   
    //Conectamos a la cuenta de Meta Trader,  Calculamos valores y Trade, Envio de mensaje a bot de telegram y parseo de operaciones en MT
    
    async function cuentas (accountId, token, autoTrade, nombre, RF, botId) {
    try {
      const api = new MetaApi(token);
      const account = await api.metatraderAccountApi.getAccount(accountId);
      let connection = account.getRPCConnection();
      await connection.connect();
      
      // Destructuring de Account Information 

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

      
      //calculate multiplier

      if (tikcer == "XAUUSD") {
        multiplier = 0.1;
      
      }else if (tikcer == "XAGUSD") {
        multiplier = 0.001;
      //else if(str(trade['Entry']).index('.') >= 2):
      //    multiplier = 0.01
      }else if (tikcer == "USDJPY") {
        multiplier = 0.01;

      }else {
        multiplier = 0.0001;
      }

    

      //calculates the stop loss in pips
      let stopLossPips = Math.abs(Math.round((+SL - Entry) / multiplier));

      console.log("Multiplier: ", multiplier);
      console.log("SL PIPS: ", stopLossPips);

      //Calculate de takes profits pips
      let tp1InPips = Math.abs(Math.round((+TP1 - Entry) / multiplier));
      let tp2InPips = Math.abs(Math.round((+TP2 - Entry) / multiplier));
      let tp3InPips = Math.abs(Math.round((+TP3 - Entry) / multiplier));
      let tp4InPips = Math.abs(Math.round((+TP4 - Entry) / multiplier));
      //let tp5InPips = Math.abs(Math.round((+TP5 - Entry) / multiplier));
      //let tp6InPips = Math.abs(Math.round((+TP6 - Entry) / multiplier));



      //  calculates the position size using stop loss and RISK FACTOR

      let positionSize = Math.floor(((balance * RF) / stopLossPips) / 10 * 100) / 100;
      
      console.log("Lote size: ", positionSize);

               
      // Calculate tp´s size
      size1 = (+positionSize * +PS1).toFixed(2);
      size2 = (+positionSize * +PS2).toFixed(2);
      size3 = (+positionSize * +PS3).toFixed(2);
      size4 = (+positionSize * +PS4).toFixed(2);
      //size5 = (+positionSize * +PS5).toFixed(2);
      //size6 = (+positionSize * +PS6).toFixed(2);
     
      const posize = [+size1, +size2, +size3, +size4 
        //+size5, 
        //+size6
      ];
      const tptp = [+TP1, +TP2, +TP3, +TP4, 
        //+TP5, 
        //+TP6
      ];
      
   
    
      
    if (autoTrade == true && scheduleTrading == true) {  
      
      // Telegram message a canal de german
      bot.sendMessage(botId, "🤴 TF PRO SIGNALS 🤴" + "\n\n           Trade Information    " + "\n\nAccount Number: " + login + "\nCuenta de: " + nombre +"\n\nDirection: " + orderType + "\nTicker: " + tikcer + "\n\nSL Pips: " + stopLossPips +
        "\nTP1 Pips: " + tp1InPips + "\nTP2 Pips: " + tp2InPips + "\nTP3 Pips: " + tp3InPips + "\nTP4 Pips: " + tp4InPips + 
        //"\nTP5 Pips: " + tp5InPips + "\nTP6 Pips: " + tp6InPips +
         "\n\nRisk Factor: " + (RF*100)+" %" + "\nLot Size: " + positionSize + "\n\nCurrent Balance:  " + balance + "\nPotencial Loss:  " + (balance * RF) + "\n\nPotential Profits: " +
         "\nTP1: " + (tp1InPips * size1 )*10 +
         "\nTP2: " + (tp2InPips * size2 )*10 +
         "\nTP3: " + (tp3InPips * size3 )*10 +
         "\nTP4: " + (tp4InPips * size4 )*10 +
        //  "\nTP5: " + (tp5InPips * size5 )*10 +
        //  "\nTP6: " + (tp6InPips * size6 )*10 + 
         "\n\nTotal Profit: " + ((tp1InPips * size1) + (tp2InPips * size2 ) + (tp3InPips * size3 ) + (tp4InPips * size4 ) 
         //(tp5InPips * size5 ) + (tp6InPips * size6 )
         )*10 +
         "\n\nwww.trivialfunction.com"
         ) 
      
      console.log("Submitting pending order");

      
      if (orderType == "BUY"){
          
        
        for (let i = 0; i < 4; i++) {
          result = await connection.createMarketBuyOrder(
            tikcer,
            +posize[i],
            +SL,
            +tptp[i], {trailingStopLoss:{"threshold": {
              "thresholds": [
                {
                  "threshold": +TSL,
                  "stopLoss": +Entry
                }
              ],
              "units": "ABSOLUTE_PRICE",
              "stopPriceBase": "CURRENT_PRICE"
            }}}, 
            
          );
          
        
        }

      } else if (orderType == "SELL") { 
        for (let i = 0; i < 4; i++) {
          result = await connection.createMarketSellOrder(
            tikcer,
            +posize[i],
            +SL,
            +tptp[i], {trailingStopLoss:{"threshold": {
              "thresholds": [
                {
                  "threshold": +TSL,
                  "stopLoss": +Entry
                }
              ],
              "units": "ABSOLUTE_PRICE",
              "stopPriceBase": "CURRENT_PRICE"
            }}}
          );
          
          ventas.push(result.orderId);
          
        }

      } else if (orderType == "LIMITBUY"){
        
        for (let i = 0; i < 4; i++) {
          result = await connection.createLimitBuyOrder(
            tikcer,
            +posize[i],
            +Entry,
            +SL,
            +tptp[i], {trailingStopLoss:{"threshold": {
              "thresholds": [
                {
                  "threshold": +TSL,
                  "stopLoss": +Entry
                }
              ],
              "units": "ABSOLUTE_PRICE",
              "stopPriceBase": "CURRENT_PRICE"
            }}}, 
            
          );
          
        
        }
      
      } else if (orderType == "LIMITSELL"){
        for (let i = 0; i < 4; i++) {
          result = await connection.createLimitSellOrder(
            tikcer,
            +posize[i],
            +Entry,
            +SL,
            +tptp[i], {trailingStopLoss:{"threshold": {
              "thresholds": [
                {
                  "threshold": +TSL,
                  "stopLoss": +Entry
                }
              ],
              "units": "ABSOLUTE_PRICE",
              "stopPriceBase": "CURRENT_PRICE"
            }}}, 
            
          );
          
        
        }
        
      }else if (orderType == "CLOSE") { 
        result = await connection.closePositionsBySymbol(tikcer)
      
      } else if (orderType == "CLOSEID") {
        result = await connection.closePosition(orderId)
      } else if (orderType == "MODIFYID") {
      result = await connection.modifyPosition(
        +tikcer,
        +SL
        
      )
      result = await connection.closePositionPartially(
        orderId,
        quantityToClose,{}
      )
      
    }
    }
      console.log("Trade successful, result code is " + result.stringCode);
      console.log("Order ID: ", ventas); 

      
    } catch (err) {
      console.log("Trade failed with result code " + err.stringCode);
    }
    }
    fornix.forEach(e=>cuentas(e.accountId, e.token, e.autoTrade, e.nombre, e.RF, e.botId))
  } 
  });

console.log("que: ", ventas);


// Information for DASHBOARD

//#region

app.get("/information", async (req, res) => {
  try {
    const metaStats = new MetaStats("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlNjczNzg0NGMxZDcyNGE0NDg4YzM1ZGMyZDU0ODg0MSIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6MDZlZmM1YzEtMWNlMy00MjRiLWFmZjQtMTNhZjFjYmQ3NmIyIl19LHsiaWQiOiJtZXRhYXBpLXJlc3QtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDowNmVmYzVjMS0xY2UzLTQyNGItYWZmNC0xM2FmMWNiZDc2YjIiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjA2ZWZjNWMxLTFjZTMtNDI0Yi1hZmY0LTEzYWYxY2JkNzZiMiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjA2ZWZjNWMxLTFjZTMtNDI0Yi1hZmY0LTEzYWYxY2JkNzZiMiJdfSx7ImlkIjoibWV0YXN0YXRzLWFwaSIsIm1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDowNmVmYzVjMS0xY2UzLTQyNGItYWZmNC0xM2FmMWNiZDc2YjIiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6MDZlZmM1YzEtMWNlMy00MjRiLWFmZjQtMTNhZjFjYmQ3NmIyIl19XSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaW1wZXJzb25hdGVkIjpmYWxzZSwicmVhbFVzZXJJZCI6ImU2NzM3ODQ0YzFkNzI0YTQ0ODhjMzVkYzJkNTQ4ODQxIiwiaWF0IjoxNjkwNzE4OTE1fQ.b1DX-kAF9TwRJH5d9jj6yhcvXW_yMCs1WcEWz6gNgzv5SBXTW6a9oXEaLD6dAfOUjL2tN7B0qP1J5uEy2ehDpwfFhSwRcjh_dnssy3kyPnOGs4XTHHUaDdrx0la_vMngkGjQX0sJNvEPpu3un6WSLDbaYaZgX66JZbc-pyhjUHDgOz1hYprdbIpgGlmUYuxogAHjFe2JI42ymnb5UfdG79-45TTgxeJ30Ye8gfdCPno65HOAjV4iHzxToT1o7BQvTbfJy5hHxMzJc1rxNnHYrClT9cbIYoV9NFlrZST5HuO69wXRfng8H6CiyKFL1VReJbDSX8e0tsDCwWiy6_8MezUyALE97hJKOefk57uEf1gYQB0wKopLSAtNZHncr5t9pbBSv_B2fWqL0GdmnyTQbkvf0xKD8STMmCBnoG8bA8A0UVYdwb1tlWSZkeoqL6Zmcwsv7bG1p7wr_-0eP2FC-1c9-n_zguDk4XQBywVSVtEWoCKAegPvHK-H_-t7NoWcMOiOGMDLbrjcbvgfOg2KbsvqUC9s92x9WxVtbgh0ZowrGoBizfUfVLMHcxftu5BMWWiCyyzUjO-E0go1-PKiupuUe5gW3DGRO7Ub7rZfqFfJP640Z2CjxBbivH-7U59HbhSiTiGasCYgDA2abvRWsWvXH91tOsTLYn7MmmEj8yg");
    const api = new MetaApi("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlNjczNzg0NGMxZDcyNGE0NDg4YzM1ZGMyZDU0ODg0MSIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6MDZlZmM1YzEtMWNlMy00MjRiLWFmZjQtMTNhZjFjYmQ3NmIyIl19LHsiaWQiOiJtZXRhYXBpLXJlc3QtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDowNmVmYzVjMS0xY2UzLTQyNGItYWZmNC0xM2FmMWNiZDc2YjIiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjA2ZWZjNWMxLTFjZTMtNDI0Yi1hZmY0LTEzYWYxY2JkNzZiMiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjA2ZWZjNWMxLTFjZTMtNDI0Yi1hZmY0LTEzYWYxY2JkNzZiMiJdfSx7ImlkIjoibWV0YXN0YXRzLWFwaSIsIm1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDowNmVmYzVjMS0xY2UzLTQyNGItYWZmNC0xM2FmMWNiZDc2YjIiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6MDZlZmM1YzEtMWNlMy00MjRiLWFmZjQtMTNhZjFjYmQ3NmIyIl19XSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaW1wZXJzb25hdGVkIjpmYWxzZSwicmVhbFVzZXJJZCI6ImU2NzM3ODQ0YzFkNzI0YTQ0ODhjMzVkYzJkNTQ4ODQxIiwiaWF0IjoxNjkwNzE4OTE1fQ.b1DX-kAF9TwRJH5d9jj6yhcvXW_yMCs1WcEWz6gNgzv5SBXTW6a9oXEaLD6dAfOUjL2tN7B0qP1J5uEy2ehDpwfFhSwRcjh_dnssy3kyPnOGs4XTHHUaDdrx0la_vMngkGjQX0sJNvEPpu3un6WSLDbaYaZgX66JZbc-pyhjUHDgOz1hYprdbIpgGlmUYuxogAHjFe2JI42ymnb5UfdG79-45TTgxeJ30Ye8gfdCPno65HOAjV4iHzxToT1o7BQvTbfJy5hHxMzJc1rxNnHYrClT9cbIYoV9NFlrZST5HuO69wXRfng8H6CiyKFL1VReJbDSX8e0tsDCwWiy6_8MezUyALE97hJKOefk57uEf1gYQB0wKopLSAtNZHncr5t9pbBSv_B2fWqL0GdmnyTQbkvf0xKD8STMmCBnoG8bA8A0UVYdwb1tlWSZkeoqL6Zmcwsv7bG1p7wr_-0eP2FC-1c9-n_zguDk4XQBywVSVtEWoCKAegPvHK-H_-t7NoWcMOiOGMDLbrjcbvgfOg2KbsvqUC9s92x9WxVtbgh0ZowrGoBizfUfVLMHcxftu5BMWWiCyyzUjO-E0go1-PKiupuUe5gW3DGRO7Ub7rZfqFfJP640Z2CjxBbivH-7U59HbhSiTiGasCYgDA2abvRWsWvXH91tOsTLYn7MmmEj8yg");
    const account = await api.metatraderAccountApi.getAccount("06efc5c1-1ce3-424b-aff4-13af1cbd76b2");
    let connection = account.getRPCConnection();
    await connection.connect();
    const { broker, balance, equity, login } =
      await connection.getAccountInformation("06efc5c1-1ce3-424b-aff4-13af1cbd76b2");
    pos = await connection.getPositions();
    historyOrders = await connection.getDealsByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date());
    stadisticas= await metaStats.getMetrics("06efc5c1-1ce3-424b-aff4-13af1cbd76b2", true);
    
    console.log("Estadistica: ", stadisticas);
  
    
    //console.log("pos",pos);
    console.log("History Orders", historyOrders);

    res.status(200).json({
      broker: broker,
      balance: balance,
      equity: equity,
      login: login,
      pos: { pos },
      historyOrders : {historyOrders},
      stadistica: {stadisticas}
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error: ", error.message);
  }
  
});

// app.get("/streaming", async (req, res) => {
//   try {
//     const api = new MetaApi("3qB8zuMywP3ESk6gSj1EoAyoXZKb6C1EU2o1ySJSLWuo6voKbjiK1StCKudpcYru");
//     const account = await api.metatraderAccountApi.getAccount("06efc5c1-1ce3-424b-aff4-13af1cbd76b2");
//     const connection = account.getStreamingConnection();
//     await connection.connect();

//     // access local copy of terminal state
//     const terminalState = connection.terminalState;
//     //console.log(terminalState);

//     // wait until synchronization completed
//     await connection.waitSynchronized();

//     console.log(terminalState.connected);
//     console.log(terminalState.connectedToBroker);
//     console.log(terminalState.accountInformation);
    
//     //pos = terminalState.orders
//     const historyStorage = connection.historyStorage;

//     console.log(historyStorage.orderSynchronizationFinished);
//     console.log(historyStorage.dealSynchronizationFinished);

//     historyOrderss = historyStorage.historyOrders;

//     //console.log("pos",pos);
//     console.log("History Orders", historyOrderss);

//     res.status(200).json({
//       // broker: broker,
//       // balance: balance,
//       // equity: equity,
//       // login: login,
//       pos: { historyOrderss },
//       //historyOrders : {historyOrders},
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
//#endregion

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
