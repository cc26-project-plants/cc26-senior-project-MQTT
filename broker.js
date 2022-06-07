import aedes from "aedes";
import { createServer } from "aedes-server-factory";
const port = 8888;
const aedesSrv = aedes();
const httpServer = createServer(aedesSrv, { ws: true });

const port1 = 1883;
const server = createServer(aedesSrv);

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

httpServer.listen(port, () => {
  console.log(
    `MQTT Broker Aedes over websocket started and is listening on port ${port} ....`
  );
});

server.listen(port1, () => {
  console.log(
    `MQTT Broker Aedes TCP started and is listening on port ${port1} ....`
  );
});
