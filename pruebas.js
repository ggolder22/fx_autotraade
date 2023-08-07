//import {SynchronizationListener} from 'metaapi.cloud-sdk';
let MetaApi = require("metaapi.cloud-sdk").default;
let MetaStats = require("metaapi.cloud-sdk").MetaStats; 

const api = new MetaApi(token);
const account = await api.metatraderAccountApi.getAccount('accountId');
      

let SynchronizationListener = require("metaapi.cloud-sdk"); 
// receive synchronization event notifications
// first, implement your listener
class MySynchronizationListener extends SynchronizationListener {
  // override abstract methods you want to receive notifications for
  position;
}

// retrieving a connection
const connection = account.getStreamingConnection();

// now add the listener
const listener = new MySynchronizationListener();
connection.addSynchronizationListener(listener);

// open the connection after adding listeners
await connection.connect();

// remove the listener when no longer needed
connection.removeSynchronizationListener(listener);