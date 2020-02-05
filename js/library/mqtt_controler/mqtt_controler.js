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
  publish(ENVIRONMENT + '/prod/user/path', {vehicle_type: vehicle_type, target: target});
}

function stop_agent(){
  publish(ENVIRONMENT +  '/prod/user/stop');
}

function reset(){
  publish(ENVIRONMENT +  '/prod/city/reset');
}

function teleport_agent(vehicle_type, path, costs){
  publish(ENVIRONMENT + '/prod/user/path-to-target', {vehicle_type: vehicle_type, path: path, costs: costs})
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

function publish(channel, payload)
{
    client.publish(ENVIRONMENT + channel, JSON.stringify(payload), { qos: 0, retain: false })
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
subscribe('/prod/city/reset')
subscribe('/prod/user/path-to-target')

client.publish('team03/prod/city/reset', '', { qos: 0, retain: false })
publish('/prod/user/path-to-target', {
    "vehicle_type": "walk",
    "path": [
        [21, 5.6],
        [20.9, 5.6]
    ],
    "costs": [0.0, 0.0]
})

//client.publish('team03/myteam/test', 'wss secure connection demo...!', { qos: 0, retain: false })

client.on('message', function (topic, message, packet) {
    console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
    var short_topic = topic.replace(ENVIRONMENT, "")
    switch (short_topic)
    {
      case '/prod/user/mission':
      case '/prod/user/situation':
      case '/user/objective-reached':
      case '/user/status':
      case '/context/change/weather':
      case '/context/change/air':
      case '/environment/change/roads_status':
      case '/environment/change/lines_state':
      case '/environment/change/traffic_conditions':
      case '/prod/environment/change/breakdown':
      case '/prod/city/reset':
      case '/prod/user/path-to-target':
    }
});


client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
});

client.on('close', function () {
  console.log(clientId + ' disconnected')
});
