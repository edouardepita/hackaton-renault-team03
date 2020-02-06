//var client = mqtt.connect(broker, options);

//Externe function :
// reset / teleport_agent

function master_help(){
    console.log('Fonction disponible : \n' +
        'reset() => réinitialise la map \n' +
        'teleport_agent() => téléport l\'agent \n' +
        'circulation([{"road": "edge_67", "slowing_factor": 3}, ...]) => modifie les condition  de circulation\n' +
        'circulation_one(6(road), 1(slow fact)) => modifi la circulation d\'une route \n'+
        'subway([{"line": "edge_6", "state": "close"}, ...]) => ouvre / ferme des ligne de métro. \n' +
        'subway_one(5(line), close|open (state)) => ouvre/ferme une ligne de métro \n' +
        'road([ {"car|bike|walk": [{"road": "edge_54", "state": "close"}]},...]) => ouvre ferme des routes \n',
        'weather() => modifie la météo \n' +
        'air() => modifie la qualité de l\'aire');
}

function circulation(data){
    publish("/prod/city/morph/traffic_conditions", data);
}

function circulation_one(road, slowing_factor){
    console.log('ralentissement de ' + road);
    circulation([{'road': 'edge_' + road, 'slowing_factor': slowing_factor}]);
}

function subway(data){
    publish ("/prod/city/morph/lines_state", data);
}

function subway_one(line, state) {
    console.log(state + ' de ' + line);
    subway([{"line": "edge_" + line, "state": state}])
}

function road(payload){
    var json_payload = JSON.parse(payload)
    publish('/prod/city/morph/roads_status', json_payload);
}

function close_car_road(edge_nb){
    console.log('Fermeture route ', edge_nb)
    publish('/prod/city/morph/roads_status', [
      {
            car: [
                      {road: "edge_" + edge_nb, state: "close"}
                  ]
      }]);
}

function close_bike_road(edge_nb){
    console.log('Fermeture route vélo '+ edge_nb)
    publish('/prod/city/morph/roads_status', [
      {
            bike: [
                      {road: "edge_" + edge_nb, state: "close"}
                  ]
      }]);
}

function close_walk_road(edge_nb){
    console.log('Fermeture route marche ' + edge_nb)
    publish('/prod/city/morph/roads_status', [
      {
            walk: [
                      {road: "edge_" + edge_nb, state: "close"}
                  ]
      }]);
}

function open_car_road(edge_nb){
    console.log('ouverture route ', edge_nb)
    publish('/prod/city/morph/roads_status', [
      {
            car: [
                      {road: "edge_" + edge_nb, state: "open"}
                  ]
      }]);
}

function open_bike_road(edge_nb){
    console.log('ouverture route vélo '+ edge_nb)
    publish('/prod/city/morph/roads_status', [
      {
            bike: [
                      {road: "edge_" + edge_nb, state: "open"}
                  ]
      }]);
}

function open_walk_road(edge_nb){
    console.log('ouverture route marche ' + edge_nb)
    publish('/prod/city/morph/roads_status', [
      {
            walk: [
                      {road: "edge_" + edge_nb, state: "open"}
                  ]
      }]);
}

function weather(condition){
    publish('/prod/context/change/weather', {condition: condition});
}

function air(condition){
    publish('/prod/context/change/air', {condition: condition});
}


function start_mission(x, y){

    publish("/prod/user/mission", {
    "mission": "Votre mission, si vous l'acceptez, consiste à passer par l'ensemble des points ci dessous.",
    "positions": [
        {
            "x": x,
            "y": y,
        },
    ]
})
}

function clean_map(){
    weather('normal');
    console.log('météo normal');
    air('normal');
    console.log('météo normal');
    var i = 0;
    while (i < 250){
        open_bike_road(i);
        open_car_road(i);
        open_walk_road(i);
        subway_one(i, 'open');
        circulation_one(i, 1);
        i ++;
    }

}


function script_auto_lev_1(){
    reset();
    start_mission(0,0);
}

function script_auto_lev_2(){
    reset();
    console.log('Démarrage');
    start_mission(0,0);
    console.log('ralentissement circulation')
    circulation_one(4, 10);
    circulation_one(6, 5);
    circulation_one(2, 7);
    console.log('Fermeture métro')
    subway_one(1, 'close');
}

function sleep( millisecondsToWait )

{

var now = new Date().getTime();

while ( new Date().getTime() < now + millisecondsToWait )

{

/* do nothing; this will exit once it reaches the time limit */

/* if you want you could do something and exit */

}

}

function script_auto_lev_3(){
    reset();
    sleep(1000)
    console.log('Mission demarage')
    start_mission(0,0);
    weather('snow');
    sleep(3000)
    subway_one(1, 'close');
    sleep(1000)
    weather('rain');
    sleep(500)
    close_bike_road(4);
    sleep(5000)
    close_car_road(8);
    sleep(1000)
    close_walk_road(11);
    sleep(3000)
    subway_one(1, 'open');
}

function script_rand(){
    reset()
    clean_map()
    while(true){
        sleep((Math.floor(Math.random() * 10) + 1)*1000 );
        var change = Math.floor(Math.random() * 5)
        if (change == 0){
            if (Math.random()){
                open_walk_road(Math.floor(Math.random() * 100))
            } else {
                close_walk_road(Math.floor(Math.floor(Math.random() * 100)))
            }
        } else if (change == 1) {
            if (Math.random()){
                open_car_road(Math.floor(Math.random() * 100))
            } else {
                close_car_road(Math.floor(Math.floor(Math.random() * 100)))
            }
        } else if (change == 2) {
            if (Math.random()){
                open_bike_road(Math.floor(Math.random() * 100))
            } else {
                close_bike_road(Math.floor(Math.floor(Math.random() * 100)))
            }
        } else if (change== 3) {
            if (Math.random()){
                subway_one(Math.floor(Math.random() * 10), 'open')
            } else {
                subway_one(Math.floor(Math.floor(Math.random() * 10)), 'close')
            }
        } else if (change== 4){

        }
    }
}
