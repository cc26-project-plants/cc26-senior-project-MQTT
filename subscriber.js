import * as mqtt from "mqtt";
const client = mqtt.connect("ws://localhost:8808");
const topic = "mqtt/test";

client.on("connect", function () {
  console.log("subscriber connected.");
});

client.subscribe(topic, function (err, granted) {
  console.log("subscriber subscribed.");
});

client.on("message", function (topic_, message) {
  console.log(
    "subscriber received topic:",
    topic_,
    "message:",
    message.toString()
  );
});
