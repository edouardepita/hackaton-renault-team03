

function FweatherUpdate(weather)
{
    if (weather === "snow")
    {
        $("#weatherElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-info" id="weatherElement">',
                '<i class="fa fa-snowflake"></i>',
            '</h4>'
        ].join("\n");
        
        $("#weather").append(html);
    }

    if (weather === "rain")
    {
        $("#weatherElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-primary" id="weatherElement">',
                '<i class="fa fa-cloud-rain"></i>',
            '</h4>'
        ].join("\n");
        
        $("#weather").append(html);
    }

    if (weather === "normal")
    {
        $("#weatherElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-warning" id="weatherElement">',
                '<i class="fa fa-sun"></i>',
            '</h4>'
        ].join("\n");
        
        $("#weather").append(html);
    }

    if (weather === "heat wave")
    {
        $("#weatherElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-danger" id="weatherElement">',
                '<i class="fa fa-burn"></i>',
            '</h4>'
        ].join("\n");
        
        $("#weather").append(html);
    }
}

function FpollutionUpdate(condition)
{
    if (condition === "normal")
    {
        $("#pollutionElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-success" id="pollutionElement">',
                '<i class="fa fa-check-circle fa-lg"></i>',
            '</h4>'
        ].join("\n");
        
        $("#pollution").append(html);   
    }
    if (condition === "pollution peak")
    {
        $("#pollutionElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-warning" id="pollutionElement">',
                '<i class="fas fa-exclamation-triangle fa-lg"></i>',
            '</h4>'
        ].join("\n");
        
        $("#pollution").append(html); 
    }
}

function FmissionUpdate(mission)
{
    $("#mission").html(mission);
}



function FpathUpdate(pathList)
{
    const vehiclesMapping = {
        "walk": '<i class="fas fa-walking"></i>',
        "subway": '<i class="fas fa-train"></i>',
        "car": '<i class="fas fa-car-side"></i>',
        "bike": '<i class="fas fa-bicycle"></i>'
    }

    for (let index = 0; index < pathList.length; index++) {

        var route = pathList[index];

        var card = [
            '<div class="card cardover animated fadeInLeft">',
                '<div class="card-body" data-toggle="collapse" data-target="#demo' + index + '">',
            'Proposition ' + (index + 1),
            '</div>',
            '<div class="collapse" id="demo' + index + '" style="margin-left: 20px; margin-right: 20px;">',
                '<ul>'
        ].join("\n");

        for (let j = 0; j < route["vehicles"].length; j++) {

            var cardDetails = [
                        '<li>',
                            vehiclesMapping[route["vehicles"][j]],
                            route["length"][j] + ' Meaoo Time',
                        '</li>',
            ].join("\n");

            card += cardDetails;       
        }

        cardEnd = [
            '</ul>',
            '<button class="btn btn-outline-primary btn-block" style="margin-bottom: 5px;">',
            'Go!',
            '</button>',
            '</div>',
            '</div>'
        ].join("\n");

        card += cardEnd

        $("#pathContainer").append(card);
    }
}


function FaddPath(listOfPath)
{
    var pathList = [];

    
    for (let i = 0; i < listOfPath.length; i++) {
        const stepList = JSON.parse(listOfPath[i])["cars"];
        
        console.log("stepList -----");
        console.log(stepList);
        
        var vehicleType = [];
        var lengthList = [];    

        for (let j = 0; j < stepList.length;j++) {
            
            const step = stepList[j];

            console.log("step ----")
            console.log(step);

            
            vehicleType.push(step["id"]);
            lengthList.push(step["path_length"]);
        }

        var route = {
            "vehicles": vehicleType,
            "length": lengthList
        }
        pathList.push(route);
    }

    FpathUpdate(pathList);
}