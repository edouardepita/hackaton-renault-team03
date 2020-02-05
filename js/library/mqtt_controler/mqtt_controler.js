var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

var broker = BROKER_MQTT_HOST;

var options = {
  keepalive: 10,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 3000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  username: BROKER_USER,
  password: BROKER_PASSWORD,
  rejectUnauthorized: false
};

var client = mqtt.connect(broker, options);


client.on('error', function (err) {
  console.log(err);
  client.end()
});

client.on('connect', function () {
  console.log('client connected:' + clientId)
});

client.subscribe('team03/myteam/test', { qos: 0 });

client.publish('team03/myteam/test', 'wss secure connection demo...!', { qos: 0, retain: false });

client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
});

client.on('close', function () {
  console.log(clientId + ' disconnected')
});
