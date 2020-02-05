
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

function getAgentSituation()
{
    return callApi("agent/api/user/situation/last", "GET");
}
function getCurrentWeather()
{
    return callApi("context/api/context/weather/current", "GET");
}
function getCurrentAirQuality()
{
    return callApi("context/api/context/air/current", "GET");
}
function getSubwayStationsList()
{
    return callApi("graph/subway/stations", "GET");
}
function getTrafficConditions()
{
    return callApi("graph/road_graph/traffic_conditions", "GET");
}
function getRoadsStatus(transport)
{
    return callApi("graph/road_graph/roads_status/" + transport, "GET");
}
function getLineState()
{
    return callApi("graph/road_graph/line_state", "GET");
}
function getVehiculesInfo()
{
    return callApi("vehicle/api/v1/vehicles", "GET");
}
function getVehiculeInfo(id)
{
    //the id must be a string to avoid that 00000 becomes 0
    return callApi("vehicle/api/v1/vehicles/" + id, "GET");
}