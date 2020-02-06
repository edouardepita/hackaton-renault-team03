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
  publish('/prod/user/path', {vehicle_type: vehicle_type, target: target});
}

function stop_agent(){
  publish('/prod/user/stop');
}

function reset(){
  publish('/prod/city/reset');
}

function teleport_agent(vehicle_type, path, costs){
  publish('/prod/user/path-to-target', {vehicle_type: vehicle_type, path: path, costs: costs})
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

var robotaxi_id;

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "http://" + ENVIRONMENT + ".xp65.renault-digital.com/api/vehicle/api/v1/vehicles", false ); // false for synchronous request
xmlHttp.send( null );
robotaxi_id = JSON.parse(xmlHttp.responseText)[0].id;
// console.log(robotaxi_id);

subscribe('/prod/user/situation')
subscribe('/prod/user/mission')
subscribe('/prod/user/objective-reached')
subscribe('/prod/user/status')
subscribe('/prod/context/change/weather')
subscribe('/prod/context/change/air')
subscribe('/prod/environment/change/roads_status')
subscribe('/prod/environment/change/lines_state')
subscribe('/prod/environment/change/traffic_conditions')
subscribe('/prod/environment/change/breakdown')
subscribe('/prod/city/reset')
subscribe('/prod/user/path-to-target')

//client.publish('team03/myteam/test', 'wss secure connection demo...!', { qos: 0, retain: false })

var checkpoints;
var warning;

client.on('message', function (topic, message, packet) {
    console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic);
    var short_topic = topic.replace(ENVIRONMENT, "");
    var payload = null;
    const message_str = message.toString();
    if (message_str != "") {
      payload = JSON.parse(message.toString());
    }
    switch (short_topic)
    {
        case '/prod/user/mission':
        const mission = payload.mission;
        checkpoints = payload.positions;
  //      console.log(mission, checkpoints);
        get_all_paths(checkpoints);
        break;
      case '/prod/user/situation':
        const vehicle_type = payload.vehicle_type;
        const position = payload.position;
        var total_cost = payload.total_cost;
        if (total_cost == undefined) {
          total_cost = 0;
        }
//        console.log(vehicle_type, position, total_cost);
        break;
      case '/prod/user/objective-reached':
        checkpoints.shift();
//        console.log(checkpoints);
        break;
      case '/prod/user/status':
        const status = payload.status;
        const vehicle_type2 = payload.situation.vehicle_type;
        const position2 = payload.situation.position;
        var total_cost2 = payload.situation.total_cost;
        if (total_cost2 == undefined) {
          total_cost2 = 0;
        }
//        console.log(status, vehicle_type2, position2, total_cost2);
        break;
      case '/prod/context/change/weather':
        const condition = payload.condition;
        warning = "La météo a été mise à jour, changement d'itinéraire."
//        console.log(condition, warning);
        $("#coucou").addClass("animated fadeOut");
        break;
      case '/prod/context/change/air':
        const condition2 = payload.condition;
        warning = "La qualité de l'air a été mise à jour, changement d'itinéraire."
//        console.log(condition2, warning);
        break;
      case '/prod/environment/change/roads_status':
        warning = "Un ou plusieurs incident(s) de la ville ont été détecté(s), changement d'itinéraire. (fermeture/ouverture de voies de circulation)";
        const roads_changes = payload;
//        console.log(warning, payload);
        break;
      case '/prod/environment/change/lines_state':
        warning = "Un ou plusieurs incident(s) de la ville ont été détecté(s), changement d'itinéraire. (fermeture/ouverture de ligne de métro)";
        const subway_changes = payload;
//        console.log(warning, subway_changes);
        break;
      case '/prod/environment/change/traffic_conditions':
        warning = "Un ou plusieurs incident(s) de la ville ont été détecté(s), changement d'itinéraire. (ralentissements sur les voies de ciculation)";
        const traffic_changes = payload;
//        console.log(warning, traffic_changes);
        break;
      case '/prod/environment/change/breakdown':
        warning = "Un ou plusieurs incident(s) de la ville ont été détecté(s), changement d'itinéraire. (panne de robotaxi)";
        const vehicle = payload.vehicle;
//        console.log(warning, vehicle);
        break;
      case '/prod/' + robotaxi_id + '/status/attitude':
        break;
      case '/prod/city/reset':
        break;
      case '/prod/user/path-to-target':
    }
});

client.on('close', function () {
  console.log(clientId + ' disconnected')
});
