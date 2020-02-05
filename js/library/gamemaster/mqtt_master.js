//var client = mqtt.connect(broker, options);

//Externe function :
// reset / teleport_agent

function master_help(){
    console.log('Fonction disponible : \n' +
        'reset() => réinitialise la map \n' +
        'teleport_agent() => téléport l\'agent \n' +
        'circulation([{"road": "edge_67", "slowing_factor": 3}, ...]) => modifie les condition  de circulation\n' +
        'subway([{"line": "edge_6", "state": "close"}, ...]) => ouvre / ferme des ligne de métro. \n' +
        'road([ {"car|bike|walk": [{"road": "edge_54", "state": "close"}]},...]) => ouvre ferme des routes \n',
        'weather() => modifie la météo \n' +
        'air() => Modifie la qualité de l\'aire');
}

function circulation(){

}

function subway(){

}

function road(payload){
    var json_payload = JSON.parse(payload)
    publish(ENVIRONMENT + '/prod/city/morph/roads_status', json_payload);
}

function close_car_road(edge_nb){

    publish(ENVIRONMENT + '/prod/city/morph/roads_status', [
      {
            "car": [
                      {"road": "edge_" + edge_nb, "state": "close"}
                  ]
      }]);
}

function close_bike_road(edge_nb){

    publish(ENVIRONMENT + '/prod/city/morph/roads_status', [
      {
            "bike": [
                      {"road": "edge_" + edge_nb, "state": "close"}
                  ]
      }]);
}

function close_walk_road(edge_nb){

    publish(ENVIRONMENT + '/prod/city/morph/roads_status', [
      {
            "walk": [
                      {"road": "edge_" + edge_nb, "state": "close"}
                  ]
      }]);
}

function weather(condition){
    console.log(condition)
    console.log(ENVIRONMENT)
    publish(ENVIRONMENT + '/prod/context/change/weather', {condition: condition});
}

function air(condition){
    publish(ENVIRONMENT + '/prod/context/change/air', {condition: condition});
}

function script_auto(){}

function script_rand(){}
