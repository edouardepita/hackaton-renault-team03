
var env = "team03";

var baseURL = "http://" + env + ".xp65.renault-digital.com/api/"

function Request(url, method, body = null)
{
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader('Content-type', 'application/json');

    if (body != null)
    {
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
    return Request(url, method);
}

console.log("TEST CALL API AGENT SITUATION : " + callApi("agent/api/user/situation/last", "GET"))

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
function getVehiculeInfo(id)
{
    //the id must be a string to avoid that 00000 becomes 0
    return callApi("vehicle/api/v1/vehicles/" + id, "GET");
}