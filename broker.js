import aedes from "aedes";
import { createServer } from "aedes-server-factory";
const port = 8888;
const mqtt = aedes();
const httpServer = createServer(mqtt, { ws: true });

// config for TCP MQTT broker
// import net from "net";
// const port = 1883;
// const server = net.createServer(aedes.handle);
// const mqtt = aedes();
// changes:
// comment out line 3,5
// change httpServer.listen -> server.listen on line 81

mqtt.on("clientError", (client, error) => {
  console.error(`MQTT client error `, client.id);
  console.error(error);
});

mqtt.on("connectionError", (client, error) => {
  console.error("connection error", client.id);
  console.error(error);
});

//for publish
mqtt.on("publish", (packet, client) => {
  console.log(
    "Client " + (client ? client.id : "BROKER_" + mqtt.id) + " has published",
    packet.payload.toString(),
    "on",
    packet.topic,
    "to broker",
    mqtt.id
  );
});

//for subscribe
mqtt.on("subscribe", (subscriptions, client) => {
  //   console.log("subscribe", client.id);
  console.log(
    "MQTT client \x1b[32m" +
      (client ? client.id : client) +
      "\x1b[0m subscribed to topics: " +
      subscriptions.map((s) => s.topic).join("\n"),
    "from broker",
    mqtt.id
  );
});

//for unsubscribing
mqtt.on("unsubscribe", (subscriptions, client) => {
  console.log(
    "MQTT client " +
      (client ? client.id : client) +
      "unsubscribed to topics: " +
      subscriptions.join("\n"),
    "from broker",
    mqtt.id
  );
});

//registering new clients
mqtt.on("client", (client) => {
  //   console.log("client", client.id);
  console.log(
    "Client Connected:" + (client ? client.id : client) + "to broker",
    mqtt.id
  );
});

//disconnection of a client
mqtt.on("clientDisconnect", (client) => {
  console.log(
    "Client Disconnected:" + (client ? client.id : client) + "to broker",
    mqtt.id
  );
});

//starting a MQTT broker
httpServer.listen(port, () => {
  console.log(
    `MQTT Broker Aedes over websocket started and is listening on port ${port} ....`
  );
});
