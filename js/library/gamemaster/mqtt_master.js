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
    circulation([{'road': 'edge_' + road, 'slowing_factor': slowing_factor}]);
}

function subway(data){
    publish ("/prod/city/morph/lines_state", data);
}

function subway_one(line, state) {
    subway([{"line": "edge_" + line, "state": state}])
}

function road(){

}

function weather(){

}

function air(){

}


function start_mission(x, y){
    reset();
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


function script_auto_lev_1(){
    start_mission(0,0);
}

function script_auto_lev_2(){
    start_mission(0,0);
    circulation_one(4, 10);
    circulation_one(6, 5);
    circulation_one(2, 7);
    subway_one(1, 'close');
}

function script_auto_lev_3(){

}

function script_rand(){}
