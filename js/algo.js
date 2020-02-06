
var baseURL = "http://" + ENVIRONMENT + ".xp65.renault-digital.com/api/"

function Request(url, method, body = null)
{
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader('Content-type', 'application/json');

    if (body != null)
    {
        console.log(body);
        xhr.send(body);
    }
    else
    {
        xhr.send();
    }

    return xhr.responseText;
}

function callApi(endpoint, method, body = null)
{
    var url = baseURL.concat(endpoint);
    return Request(url, method, body);
}


//récupère la dernière situation connue de l'agent.
function getAgentSituation()
{
    return callApi("agent/api/user/situation/last", "GET");
}

//récupère la météo actuelle.
function getCurrentWeather()
{
    return callApi("context/api/context/weather/current", "GET");
}

//récupère la qualité de l'air actuelle.
function getCurrentAirQuality()
{
    return callApi("context/api/context/air/current", "GET");
}

//retourne une liste de positions correspondant aux stations de métro
function getSubwayStationsList()
{
    return callApi("graph/subway/stations", "GET");
}

//permet de récupérer les conditions de traffic actuelles
// (une route qui ne serait pas listée dans cette réponse est considérée comme ayant un traffic normal).
function getTrafficConditions()
{
    return callApi("graph/road_graph/traffic_conditions", "GET");
}

//permet de récupérer les voies de circulation actuellement fermées.
function getRoadsStatus(transport)
{
    return callApi("graph/road_graph/roads_status/" + transport, "GET");
}

//permet de récupérer les ligne de métro actuellement fermées.
function getLineState()
{
    return callApi("graph/road_graph/line_state", "GET");
}

//permet de récupérer tous les véhicules présents dans la ville.
function getVehiculesInfo()
{
    return callApi("vehicle/api/v1/vehicles", "GET");
}

//permet de récupérer les informations d'un vehicule d'id
function getVehiculeInfo(id) {
    //the id must be a string to avoid that 00000 becomes 0
    return callApi("vehicle/api/v1/vehicles/" + id, "GET");
}

//bike walk and subway
function shortest_path(method, departure_x, departure_y, arrival_x, arrival_y) {
    var endpoint= "graph/road_graph/shortest_path/".concat(method);
    var body = {
        "departure": {"x": departure_x, "y": departure_y},
        "arrival": {"x": arrival_x, "y": arrival_y}
    };
    return callApi(endpoint, 'POST', JSON.stringify(body));

}

function shortest_path_car(departure_x, departure_y, arrival_x, arrival_y) {
    var endpoint= "graph/road_graph/shortest_path/car";
    var body = {
 "departure": {"x": departure_x, "y": departure_y},
"arrival": {"x": arrival_x, "y": arrival_y},
"vehicles": JSON.parse(getVehiculesInfo())
};
return callApi(endpoint, 'POST', JSON.stringify(body));
}

function reset(method) {
    var endpoint = "graph/api/road_graph/reset_graph/".concat(method);
    return callApi(endpoint, 'POST');
}


function get_all_paths(positions) {
    var agentPosition = JSON.parse(getAgentSituation())['position'];
    var x = agentPosition['x'];
    var y = agentPosition['y'];
    var paths = new Array();
    for (let i= 0; i < positions.length; i++)
    {
        var xi = positions[i]["x"];
        var yi = positions[i]["y"];
        var list = new Array();
        //list = list.concat(list, shortest_path_car(x,y,xi, yi))
        //list =  verify_position(list, shortest_path('subway', x,y, xi,yi), xi,yi)
        list = list.concat(shortest_path('subway', x,y, xi,yi))
        if (JSON.parse(getCurrentWeather())['condition'] === 'normal') {
            list =list.concat(shortest_path('walk',x,y,xi, yi));
            if (JSON.parse(getCurrentAirQuality())['condition'] === 'normal') {
                list = list.concat(shortest_path('bike', x, y, xi, yi));
            }
        }
        x = xi;
        y = yi;
        paths = paths.concat(list)
    }
    return paths;
}

function verify_position(list, json, x, y){
    //console.log(JSON.parse(json)['cars']['paths'])
    var length = JSON.parse(json)['cars'][0]['paths'].length;
    var postion = JSON.parse(json)['cars'][0]['paths'][length - 1];

    if ((Math.abs(postion[0]- x) < 1.5) && (Math.abs(postion[1] - y) < 1.5)) {
        list = list.concat(json);
        console.log(list)
    }
    return list;
}

function allPossibleCases(list){
    if (list.length === 0){
        return [];
    }
    else if (list.length === 1) {
        return list[0];
    }
    else {
        var result = [];
        var rest = allPossibleCases(list.slice(1));
        for (var c in rest) {
            for(var i = 0; i < list[0].length; i++){
                result.push(rest[c].unshift(list[0][i]));
            }
        }
        return list;
    }
}

function DrawPath(start, end)
{
    var c = document.getElementById("Map"); 
    var wf = c.width / 22;
    var hf = c.height / 6;
    var ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.moveTo(9.2 * wf, (5.8 - 2.1) * hf);
    ctx.lineTo(8.6 * wf, (5.8 - 3.8) * hf);
    ctx.lineTo(11.9 * wf, (5.8 - 5.6) * hf);
    ctx.lineTo(15.8 * wf, (5.8 - 3.8) * hf);
    ctx.lineTo(20.9 * wf, (5.8 - 5.6) * hf);

    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
}