var client  = mqtt.connect(BROKER_TCP_MQTTHOST, {'user' : BROKER_USER,  'password' : BROKER_PASSWORD,});

var topic_test = ENVIRONEMENT + '/myteam/test';

client.on('connect', function () {
  client.subscribe( topic_test, function (err) {
    if (!err) {
      client.publish(topic_test, 'Hello mqtt');
    } else {
      alert('Erreur connexion à ' + topic_test);
    }
  })
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});