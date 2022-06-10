import aedes from "aedes";
import { createServer } from "aedes-server-factory";
import https from "https";
import websocketStream from "websocket-stream";
import tls from "tls";

const PORT_HTTPS = 1883;
const PORT_WSS = 8808;
const PORT_TLS = 8883;
const OPTIONS = {
  key: process.env.PRODUCTION_KEY,
  cert: process.env.PRODUCTION_CERT
};

const aedesServer = aedes();
const server = createServer(aedesServer);
const httpsServer = https.createServer(OPTIONS, (req, res) => {
  res.writeHead(200);
  res.end("hello Happa\n");
});
websocketStream.createServer({ server: httpsServer }, aedesServer.handle);
const tlsServer = tls.createServer(options, aedesSrv.handle);

aedesServer.on("clientError", (client, error) => {
  console.error(`MQTT client error : ${client.id}`);
  console.error(error);
});

aedesSrv.on("connectionError", (client, error) => {
  console.error("connection error", client.id);
  console.error(error);
});

aedesServer.on("publish", (packet, client) => {
  console.log(
    "Client " +
      (client ? client.id : "BROKER_" + aedesServer.id) +
      " has published",
    packet.payload.toString(),
    "on",
    packet.topic,
    "to broker",
    aedesServer.id
  );
});

aedesServer.on("subscribe", (subscriptions, client) => {
  console.log(
    "MQTT client " +
      (client ? client.id : client) +
      " subscribed to topics: " +
      subscriptions.map((s) => s.topic).join("\n"),
    "from broker",
    aedesServer.id
  );
});

aedesServer.on("unsubscribe", (subscriptions, client) => {
  console.log(
    "MQTT client " +
      (client ? client.id : client) +
      "unsubscribed to topics: " +
      subscriptions.join("\n"),
    "from broker",
    aedesServer.id
  );
});

aedesServer.on("client", (client) => {
  console.log(
    "Client Connected:" + (client ? client.id : client) + "to broker",
    aedesServer.id
  );
});

aedesServer.on("clientDisconnect", (client) => {
  console.log(
    "Client Disconnected:" + (client ? client.id : client) + "to broker",
    aedesServer.id
  );
});

server.listen(PORT_HTTPS, () => {
  console.log(
    `MQTT Broker Aedes TCP started and is listening on port ${PORT_HTTPS} ....`
  );
});

httpsServer.listen(PORT_WSS, () => {
  console.log(
    `MQTT Broker Aedes over websocket secured started and is listening on port ${PORT_WSS} ....`
  );
});

tlsServer.listen(PORT_TLS, () => {
  console.log(
    `MQTT Broker Aedes over websocket started and is listening on port ${port3} ....`
  );
});
