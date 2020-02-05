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

function road(){

}

function weather(){

}

function air(){

}


function script_auto(){}

function script_rand(){}
