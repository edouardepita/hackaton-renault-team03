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

function move_agent(vehicle_type, target){
  client.publish(ENVIRONEMENT + '/prod/user/path', {vehicle_type: vehicle_type, target: target});
}

function stop_agent(){
  client.publish(ENVIRONEMENT +  '/prod/user/stop');
}



client.on('error', function (err) {
  console.log(err);
  client.end()
});

client.on('connect', function () {
  console.log('client connected:' + clientId)
});


function subscribe(channel)
{
    client.subscribe(ENVIRONMENT + channel, { qos: 0 })
}

subscribe('/prod/user/situation​')
subscribe('/prod/user/mission​')
subscribe('/prod/user/objective-reached')
subscribe('/prod/user/status')
subscribe('/prod/context/change/weather​')
subscribe('/prod/context/change/air​')
subscribe('/prod/environment/change/roads_status​​')
subscribe('/prod/environment/change/lines_state​​')
subscribe('/prod/environment/change/traffic_conditions​')
subscribe('/prod/environment/change/breakdown​')

//client.publish('team03/myteam/test', 'wss secure connection demo...!', { qos: 0, retain: false })

client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
});

client.on('close', function () {
  console.log(clientId + ' disconnected')
});
