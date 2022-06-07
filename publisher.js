import * as mqtt from "mqtt";
const client = mqtt.connect("mqtt://localhost:1883");

const message = "SAY HELLO TO MQTT";
const topic = "thom/happa/test";

client.on("connect", function () {
  console.log("publisher connected.");
  client.publish(topic, message);
  console.log("send topic:", topic, ", message:", message);
});
