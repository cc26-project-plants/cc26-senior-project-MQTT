import aedes from "aedes";
const aedesSrv = aedes();
import { createServer } from "aedes-server-factory";
import websocketStream from "websocket-stream";
import https from "https";
import tls from "tls";

// 'aedes-server-factory' tcp mqtt
// const port1 = 1883;
// const server = createServer(aedesSrv);

//'aedes-server-factory' ws
// const port = 8888;
// const httpServer = createServer(aedesSrv, { ws: true });

const options = {
  key: process.env.PRODUCTION_KEY,
  cert: process.env.PRODUCTION_CERT,
};

// WSS
const httpsServer = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("hello Happa\n");
});

const port2 = 8808;
websocketStream.createServer({ server: httpsServer }, aedesSrv.handle);

//TLS
const port3 = 8883;
const tlsServ = tls.createServer(options, aedesSrv.handle);

aedesSrv.on("clientError", (client, error) => {
  console.error(`MQTT client error `, client.id);
  console.error(error);
});

aedesSrv.on("connectionError", (client, error) => {
  console.error("connection error", client.id);
  console.error(error);
});

aedesSrv.on("publish", (packet, client) => {
  console.log(
    "Client " +
      (client ? client.id : "BROKER_" + aedesSrv.id) +
      " has published",
    packet.payload.toString(),
    "on",
    packet.topic,
    "to broker",
    aedesSrv.id
  );
});

aedesSrv.on("subscribe", (subscriptions, client) => {
  console.log(
    "MQTT client " +
      (client ? client.id : client) +
      " subscribed to topics: " +
      subscriptions.map((s) => s.topic).join("\n"),
    "from broker",
    aedesSrv.id
  );
});

aedesSrv.on("unsubscribe", (subscriptions, client) => {
  console.log(
    "MQTT client " +
      (client ? client.id : client) +
      "unsubscribed to topics: " +
      subscriptions.join("\n"),
    "from broker",
    aedesSrv.id
  );
});

aedesSrv.on("client", (client) => {
  console.log(
    "Client Connected:" + (client ? client.id : client) + "to broker",
    aedesSrv.id
  );
});

aedesSrv.on("clientDisconnect", (client) => {
  console.log(
    "Client Disconnected:" + (client ? client.id : client) + "to broker",
    aedesSrv.id
  );
});

// httpServer.listen(port, () => {
//   console.log(
//     `MQTT Broker Aedes over websocket started and is listening on port ${port} ....`
//   );
// });

// server.listen(port1, () => {
//   console.log(
//     `MQTT Broker Aedes TCP started and is listening on port ${port1} ....`
//   );
// });

httpsServer.listen(port2, () => {
  console.log(
    `MQTT Broker Aedes over websocket secured started and is listening on port ${port2} ....`
  );
});

tlsServ.listen(port3, () => {
  console.log(
    `MQTT Broker Aedes over websocket started and is listening on port ${port3} ....`
  );
});
